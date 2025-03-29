
/**
 * Get a random item from an array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Delay execution for a specified amount of time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Shuffle an array randomly
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Create a simulated typing effect
 * Uses more consistent timing to prevent glitches
 */
export async function simulateTyping(
  text: string,
  callback: (text: string) => void,
  minDelay = 20,
  maxDelay = 60
): Promise<void> {
  let currentText = '';
  let isCancelled = false;
  
  // Create a cancellation token
  const cancel = () => {
    isCancelled = true;
  };
  
  // More consistent timing with less variance
  const baseDelay = (minDelay + maxDelay) / 2;
  const variance = (maxDelay - minDelay) / 4;
  
  for (let i = 0; i < text.length; i++) {
    if (isCancelled) break;
    
    currentText += text[i];
    callback(currentText);
    
    // More consistent timing with smaller random variation
    const typingDelay = Math.floor(Math.random() * variance * 2) + (baseDelay - variance);
    await delay(typingDelay);
  }
  
  return Promise.resolve();
}
