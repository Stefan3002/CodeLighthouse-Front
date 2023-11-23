const baseDelay = 500; // Adjust this value to control the initial delay in milliseconds
const factor = .1; // Adjust this value to control the rate of increase

export const exponentialDelay = (index) => parseInt(baseDelay * Math.exp(index * factor))
