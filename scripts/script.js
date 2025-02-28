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

    // Create a reference to the tarkov time indicator
    let tarkovTimeIndicator = null;
    let isNightSectionActive = false;
    
    // Get reference to the night time button (if it exists)
    const nighttimeBtn = document.getElementById('nighttime-btn');

    // Function to check if a given hour is within night time range (22:00-05:00)
    function isNightTimeHour(hour) {
        return hour >= 22 || hour <= 5;
    }

    // Update time display
    function updateTime() {
        const timeElement = document.querySelector('.status-time');
        const dateElement = document.querySelector('.status-date');
        const tarkovTimeElement = document.querySelector('.status-user'); // Replacing username with Tarkov time
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
        
        // Calculate and display both Tarkov times (day and night)
        const dayTarkovTime = realTimeToTarkovTime(now, true); // left raid time (day)
        const nightTarkovTime = realTimeToTarkovTime(now, false); // right raid time (night)
        
        const dayHours = String(dayTarkovTime.getHours()).padStart(2, '0');
        const dayMinutes = String(dayTarkovTime.getMinutes()).padStart(2, '0');
        
        const nightHours = String(nightTarkovTime.getHours()).padStart(2, '0');
        const nightMinutes = String(nightTarkovTime.getMinutes()).padStart(2, '0');
        
        tarkovTimeElement.textContent = `Tarkov: ${dayHours}:${dayMinutes} ${nightHours}:${nightMinutes}`;

        // Check if EITHER time is night time (between 22:00-05:00)
        const dayHour = parseInt(dayHours);
        const nightHour = parseInt(nightHours);
        
        // Check if either day or night time is within night hours
        const isDayNightTime = isNightTimeHour(dayHour);
        const isNightNightTime = isNightTimeHour(nightHour);
        const isGoodNightTime = isDayNightTime || isNightNightTime;
        
        // Update the night time indicator if it exists and is visible
        if (tarkovTimeIndicator && isNightSectionActive) {
            // Show both day and night Tarkov times
            tarkovTimeIndicator.textContent = `Current Tarkov Time: ${dayHours}:${dayMinutes} ${nightHours}:${nightMinutes}`;
            
            // Check if either time is within night hours (22:00-05:00)
            if (isDayNightTime || isNightNightTime) {
                tarkovTimeIndicator.classList.add('good-time');
                tarkovTimeIndicator.textContent += ' - Good time for night raid!';
            } else {
                tarkovTimeIndicator.classList.remove('good-time');
            }
        }
        
        // Add/remove pulsing green frame to night button based on night time
        if (nighttimeBtn) {
            // Apply the glowing effect if either time is within night hours
            if (isGoodNightTime) {
                nighttimeBtn.classList.add('good-night-time');
            } else {
                nighttimeBtn.classList.remove('good-night-time');
            }
            
            // Debug indicator to verify night hours (remove in production)
            console.log(`Day hours: ${dayHours} (is night: ${isDayNightTime}), Night hours: ${nightHours} (is night: ${isNightNightTime}), Glowing: ${isGoodNightTime}`);
        }

        // Return the times for external use
        return {
            day: { hours: dayHours, minutes: dayMinutes, isNightTime: isDayNightTime },
            night: { hours: nightHours, minutes: nightMinutes, isNightTime: isNightNightTime },
            isGoodNightTime: isGoodNightTime
        };
    }
    
    // Initialize the time on page load
    updateTime();
    // Update every second
    setInterval(updateTime, 1000);

    // If we're on the tactics page, set up the night/day highlighting
    const nighttimeContent = document.getElementById('nighttime-content');
    const nighttimeScenariosHeader = nighttimeContent ? nighttimeContent.querySelector('h2') : null;
    
    if (nighttimeScenariosHeader && nighttimeBtn) {
        // Create the Tarkov time indicator
        tarkovTimeIndicator = document.createElement('div');
        tarkovTimeIndicator.className = 'tarkov-time-indicator';
        tarkovTimeIndicator.style.display = 'none';
        
        // Insert the indicator before the h2 heading
        nighttimeScenariosHeader.parentNode.insertBefore(tarkovTimeIndicator, nighttimeScenariosHeader);
        
        nighttimeBtn.addEventListener('click', function() {
            isNightSectionActive = true;
            // Show the current Tarkov night time when night button is clicked
            updateTime(); // This will update the indicator text
            tarkovTimeIndicator.style.display = 'block';
        });

        // Hide indicator when day button is clicked
        const daytimeBtn = document.getElementById('daytime-btn');
        if (daytimeBtn) {
            daytimeBtn.addEventListener('click', function() {
                isNightSectionActive = false;
                tarkovTimeIndicator.style.display = 'none';
            });
        }
    }

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
    
    if (navTrigger && scopeReticle) {
        navTrigger.addEventListener('mouseenter', () => {
            scopeReticle.style.transform = 'rotate(45deg)';
        });
        
        navTrigger.addEventListener('mouseleave', () => {
            scopeReticle.style.transform = 'rotate(0deg)';
        });
    }
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

// Tarkov time calculation functions
// 1 second real time = 7 seconds tarkov time


// Tarkov time calculation functions - with 1 hour correction
// 1 second real time = 7 seconds tarkov time
const tarkovRatio = 7;

function hrs(num) {
    return 1000 * 60 * 60 * num;
}

function realTimeToTarkovTime(time, left) {
    // tarkov time moves at 7 seconds per second.
    // surprisingly, 00:00:00 does not equal unix 0... but it equals unix 10,800,000.
    // Which is 3 hours. What's also +3? Yep, St. Petersburg - MSK: UTC+3.
    // therefore, to convert real time to tarkov time,
    // tarkov time = (real time * 7 % 24 hr) + 3 hour
    
    // CORRECTED: Adjusting offset by -1 hour to match in-game time
    const oneDay = hrs(24);
    const russia = hrs(2);  // Changed from 3 to 2 hours to correct the offset
    
    const offset = russia + (left ? 0 : hrs(12));
    const tarkovTime = new Date((offset + (time.getTime() * tarkovRatio)) % oneDay);
    return tarkovTime;
}