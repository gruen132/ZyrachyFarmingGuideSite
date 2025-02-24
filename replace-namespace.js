const fs = require('fs');
const path = require('path');

// Function to preserve the case pattern when replacing text
function replacePreservingCase(original, replacement) {
    if (original === original.toUpperCase()) {
        return replacement.toUpperCase();
    }
    if (original === original.toLowerCase()) {
        return replacement.toLowerCase();
    }
    if (original[0] === original[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement.toLowerCase();
}

// Function to check if the line contains an asset reference
function isAssetReference(line) {
    return line.includes('assets/') && line.toLowerCase().includes('zyrachiy');
}

// Function to process a single line
function processLine(line) {
    if (isAssetReference(line)) {
        return line; // Skip asset references
    }

    // Array of possible variations to look for
    const variations = [
        'Zryachiy',
        'ZRYACHIY',
        'zryachiy'
    ];

    let processedLine = line;
    variations.forEach(variant => {
        const regex = new RegExp(variant, 'g');
        processedLine = processedLine.replace(regex, (match) => {
            return replacePreservingCase(match, 'Zryachiy');
        });
    });

    return processedLine;
}

// Function to process a file
async function processFile(filePath) {
    try {
        const content = await fs.promises.readFile(filePath, 'utf8');
        const lines = content.split('\n');
        const processedLines = lines.map(line => processLine(line));
        const processedContent = processedLines.join('\n');

        if (content !== processedContent) {
            await fs.promises.writeFile(filePath, processedContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Function to walk through directory recursively
async function walkDirectory(dir) {
    const files = await fs.promises.readdir(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            await walkDirectory(filePath);
        } else if (
            stat.isFile() && 
            (file.endsWith('.html') || 
             file.endsWith('.js') || 
             file.endsWith('.css') || 
             file.endsWith('.md'))
        ) {
            await processFile(filePath);
        }
    }
}

// Main execution
async function main() {
    const rootDir = process.cwd(); // Use current directory as root
    console.log('Starting replacement process...');
    try {
        await walkDirectory(rootDir);
        console.log('Replacement process completed successfully!');
    } catch (error) {
        console.error('Error during replacement process:', error);
    }
}

main();