// Smooth scaling for floating elements
const floatingElements = document.querySelectorAll('.floating-element');
let lastScrollPosition = window.scrollY;

function updateFloatingElements() {
    const scrollDelta = window.scrollY - lastScrollPosition;
    lastScrollPosition = window.scrollY;

    floatingElements.forEach((element, index) => {
        const speed = 0.05 * (index + 1);
        const yOffset = scrollDelta * speed;
        
        // Get current transform values
        const style = window.getComputedStyle(element);
        const transform = new DOMMatrix(style.transform);
        
        // Apply parallax effect while maintaining current animation position
        element.style.transform = `
            translate(
                ${transform.m41}px,
                ${transform.m42 + yOffset}px
            ) 
            rotate(${transform.m11}deg)
            scale(${transform.m11})
        `;
    });
}

// Throttle scroll handler
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateFloatingElements();
            ticking = false;
        });
        ticking = true;
    }
});

// Handle resize events for responsive adjustments
const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        if (entry.target === document.documentElement) {
            updateFloatingElements();
        }
    });
});

resizeObserver.observe(document.documentElement);