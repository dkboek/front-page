// This file contains some useful generic functions, such as a random
//  integer generator, a clamp function, etc.


function randomInt(max, min = 0) {
    // Generates a random integer between min (inclusive) and max (exclusive)
    if (min != 0) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(min) + Math.floor(Math.random() * (max - min))
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}