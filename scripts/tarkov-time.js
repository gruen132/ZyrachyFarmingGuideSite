// Constants for tarkov time calculations
const tarkovRatio = 7; // 1 second real time = 7 seconds tarkov time

// Convert hours to milliseconds
function hrs(num) {
    return 1000 * 60 * 60 * num;
}

// Convert real time to Tarkov time
function realTimeToTarkovTime(time, left) {
    // tarkov time moves at 7 seconds per second.
    // surprisingly, 00:00:00 does not equal unix 0... but it equals unix 10,800,000.
    // Which is 3 hours. What's also +3? Yep, St. Petersburg - MSK: UTC+3.
    // therefore, to convert real time to tarkov time,
    // tarkov time = (real time * 7 % 24 hr) + 3 hour

    const oneDay = hrs(24);
    const russia = hrs(3);

    const offset = russia + (left ? 0 : hrs(12));
    const tarkovTime = new Date((offset + (time.getTime() * tarkovRatio)) % oneDay);
    return tarkovTime;
}

// Format time as HH:MM:SS
function formatTime(date) {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Get both tarkov raid times (day and night cycles)
function getTarkovTimes() {
    const now = new Date();
    const leftTime = realTimeToTarkovTime(now, true);  // Day cycle
    const rightTime = realTimeToTarkovTime(now, false); // Night cycle
    
    return {
        dayTime: formatTime(leftTime),
        nightTime: formatTime(rightTime)
    };
}

// Determine if it's day or night in Tarkov
function isDayTime() {
    const now = new Date();
    const tarkovTime = realTimeToTarkovTime(now, true);
    const hours = tarkovTime.getUTCHours();
    
    // Generally day time is considered between 5:00 and 21:00
    return hours >= 5 && hours < 21;
}