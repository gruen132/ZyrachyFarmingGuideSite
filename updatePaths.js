const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            // Include all relevant file types
            if (['.html', '.css', '.js'].some(ext => file.endsWith(ext))) {
                arrayOfFiles.push(filePath);
            }
        }
    });
    return arrayOfFiles;
}

function determineCorrectPath(filepath) {
    const ext = path.extname(filepath).toLowerCase();
    const basename = path.basename(filepath);

    // Map files special case
    if (filepath.includes('components/map/map-styles.css') || filepath.includes('components/map/map.js')) {
        return `components/map/${basename}`;
    }

    // Determine directory based on extension and content
    switch (ext) {
        case '.html':
            return basename === 'index.html' ? basename : `pages/${basename}`;
        case '.css':
            return `styles/${basename}`;
        case '.js':
            return `scripts/${basename}`;
        case '.png':
        case '.jpg':
        case '.jpeg':
        case '.gif':
        case '.svg':
            return filepath.includes('placeholder/') ? 
                   `assets/placeholder/${basename}` : 
                   `assets/${basename}`;
        default:
            return filepath;
    }
}

function updateFile(filePath) {
    console.log(`Processing: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    const isInPagesDir = filePath.includes('pages/') || filePath.includes('pages\\');
    const ext = path.extname(filePath).toLowerCase();

    // Function to process a single path
    function processPath(originalPath) {
        if (originalPath.startsWith('http') || 
            originalPath.startsWith('#') || 
            originalPath.startsWith('mailto:') ||
            originalPath.startsWith('tel:') ||
            originalPath.startsWith('data:') ||
            originalPath === '/' ||
            !originalPath) {
            return originalPath;
        }

        // Remove ./ prefix if exists
        const cleanPath = originalPath.replace(/^\.\//, '');
        const correctPath = determineCorrectPath(cleanPath);

        // If in pages directory, we need to go up one level except for HTML files
        if (isInPagesDir) {
            if (cleanPath.endsWith('.html') && cleanPath !== 'index.html') {
                return path.basename(cleanPath);
            }
            return `../${correctPath}`;
        }

        return correctPath;
    }

    // HTML files
    if (ext === '.html') {
        // Process href attributes
        content = content.replace(
            /(href=["'])((?!http|mailto|tel|#|\/)[^"']+)(["'])/g,
            (match, p1, p2, p3) => `${p1}${processPath(p2)}${p3}`
        );

        // Process src attributes
        content = content.replace(
            /(src=["'])((?!http|data:|\/\/|#|\/)[^"']+)(["'])/g,
            (match, p1, p2, p3) => `${p1}${processPath(p2)}${p3}`
        );

        // Process any url() in inline styles
        content = content.replace(
            /(url\(["']?)((?!http|data:|\/\/|#|\/)[^"')]+)(["']?\))/g,
            (match, p1, p2, p3) => `${p1}${processPath(p2)}${p3}`
        );
    }

    // CSS files
    if (ext === '.css') {
        // Process url() references
        content = content.replace(
            /(url\(["']?)((?!http|data:|\/\/|#|\/)[^"')]+)(["']?\))/g,
            (match, p1, p2, p3) => `${p1}${processPath(p2)}${p3}`
        );
    }

    // JavaScript files
    if (ext === '.js') {
        // Process string literals containing paths
        content = content.replace(
            /(["'])((?!http|data:|\/\/|#|\/)[^"']+\.(png|jpg|jpeg|gif|svg|css|js|html))(["'])/g,
            (match, p1, p2, ext, p3) => `${p1}${processPath(p2)}${p3}`
        );

        // Process template literals
        content = content.replace(
            /(`[^`]*`)/g,
            (match) => {
                return match.replace(
                    /((?!http|data:|\/\/|#|\/)[^`]+\.(png|jpg|jpeg|gif|svg|css|js|html))/g,
                    (path) => processPath(path)
                );
            }
        );
    }

    fs.writeFileSync(filePath, content);
}

function fixPaths() {
    console.log('Starting comprehensive path update process...');

    // Ensure all required directories exist
    ['pages', 'assets', 'styles', 'scripts', 'components/map', 'assets/placeholder'].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    // Get and process all files
    const files = getAllFiles('.');
    let processed = 0;
    let errors = 0;

    files.forEach(file => {
        try {
            updateFile(file);
            processed++;
        } catch (e) {
            console.error(`Error processing ${file}:`, e);
            errors++;
        }
    });

    console.log(`\nProcessed ${processed} files with ${errors} errors`);
    console.log('Path update completed!');
}

// Run the script
fixPaths();