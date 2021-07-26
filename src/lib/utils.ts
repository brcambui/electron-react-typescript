/**
 * ES6 implementation of sleep for async/await use.
 * @param {number} ms Sleep time in milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}