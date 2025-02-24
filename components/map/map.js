// Map layer states
const mapLayers = {
    extracts: true,
    mines: true,
    routes: true,
    spawns: true
};

// Map initialization
function initializeMap() {
    const mapContainer = document.querySelector('.map-container');
    
    // Create base map container
    const mapWrapper = document.createElement('div');
    mapWrapper.className = 'map-wrapper';
    
    // Create layers
    const layers = {
        base: createLayer('base-map', 'https://github.com/gruen132/ZyrachyFarmingGuideSite/releases/download/v1.0/lighthouse-map.png'),
        extracts: createLayer('extracts-layer', 'assets/extracts.png'),
        mines: createLayer('mines-layer', 'assets/mines.png'),
        
        spawns: createLayer('spawns-layer', 'assets/spawns.png')
    };
    
    // Add layers to wrapper
    Object.values(layers).forEach(layer => mapWrapper.appendChild(layer));
    mapContainer.appendChild(mapWrapper);
    
    // Initialize controls
    initializeMapControls();
}

function createLayer(id, src) {
    const layer = document.createElement('div');
    layer.className = 'map-layer';
    layer.id = id;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = id;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = '100%';
    
    layer.appendChild(img);
    return layer;
}

// Initialize map controls
function initializeMapControls() {
    const controls = document.querySelectorAll('.map-btn');
    
    controls.forEach(button => {
        button.addEventListener('click', () => {
            const layerType = button.textContent.toLowerCase();
            toggleLayer(layerType, button);
        });
    });
}

// Toggle layer visibility
function toggleLayer(layerType, button) {
    mapLayers[layerType] = !mapLayers[layerType];
    const layer = document.getElementById(`${layerType}-layer`);
    
    if (layer) {
        layer.style.opacity = mapLayers[layerType] ? '1' : '0';
        layer.style.pointerEvents = mapLayers[layerType] ? 'auto' : 'none';
    }
    
    button.classList.toggle('active');
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMap);