document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D parallax effect
    const layers = document.querySelectorAll('.layer');
    const viewButtons = document.querySelectorAll('.view-button');
    const viewContents = document.querySelectorAll('.view-content');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            viewButtons.forEach(btn => btn.classList.remove('active'));
            viewContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const viewToShow = this.getAttribute('data-view');
            document.querySelector(`.${viewToShow}-view`).classList.add('active');
        });
    });
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        layers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const moveX = (mouseX * 100 * depth);
            const moveY = (mouseY * 100 * depth);
            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });

    // Update time display
    function updateTime() {
        const timeElement = document.querySelector('.status-time');
        const dateElement = document.querySelector('.status-date');
        const now = new Date();
        
        // Format time as HH:MM:SS UTC
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds} UTC`;
        
        // Format date as YYYY-MM-DD
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        dateElement.textContent = `${year}-${month}-${day}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);

    // Set user information
    const userElement = document.querySelector('.status-user');
    userElement.textContent = 'gruen132';

    // Hex grid interaction
    const hexItems = document.querySelectorAll('.hex-item');
    
    hexItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const nearby = findNearbyHex(item);
            nearby.forEach(hex => {
                hex.classList.add('hex-highlight');
            });
        });
        
        item.addEventListener('mouseout', () => {
            hexItems.forEach(hex => {
                hex.classList.remove('hex-highlight');
            });
        });
    });

    // Navigation trigger animation
    const navTrigger = document.querySelector('.nav-trigger');
    const scopeReticle = document.querySelector('.scope-reticle');
    
    navTrigger.addEventListener('mouseenter', () => {
        scopeReticle.style.transform = 'rotate(45deg)';
    });
    
    navTrigger.addEventListener('mouseleave', () => {
        scopeReticle.style.transform = 'rotate(0deg)';
    });
});

// Utility function to find nearby hexagonal items
function findNearbyHex(centerHex) {
    const hexArray = Array.from(document.querySelectorAll('.hex-item'));
    const centerRect = centerHex.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;
    
    return hexArray.filter(hex => {
        if (hex === centerHex) return false;
        
        const rect = hex.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(centerX - x, 2) + 
            Math.pow(centerY - y, 2)
        );
        
        return distance < 300;
    });
}