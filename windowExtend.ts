/**
 * let's say we have a variable on window, likeL
 * window.apiAddress = "..."
 */

// Then, for the sake of TS support, we can do this:

declare global {
  interface Window { apiAddress: string }
}