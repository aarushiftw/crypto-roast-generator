
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
 */
export async function simulateTyping(
  text: string,
  callback: (text: string) => void,
  minDelay = 20,
  maxDelay = 60
): Promise<void> {
  let currentText = '';
  
  for (let i = 0; i < text.length; i++) {
    currentText += text[i];
    callback(currentText);
    const typingDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    await delay(typingDelay);
  }
}
