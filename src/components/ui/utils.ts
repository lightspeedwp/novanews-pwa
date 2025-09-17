import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging and combining CSS class names intelligently.
 * Combines clsx for conditional classes with tailwind-merge for conflict resolution.
 *
 * @param {...ClassValue[]} inputs - Class values to merge (strings, objects, arrays)
 * @returns {string} Merged and deduplicated class string
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn("px-4 py-2", "bg-blue-500", "text-white")
 * // Returns: "px-4 py-2 bg-blue-500 text-white"
 *
 * // Conditional classes
 * cn("base-class", {
 *   "active-class": isActive,
 *   "disabled-class": isDisabled
 * })
 *
 * // Tailwind conflict resolution
 * cn("px-4 py-2", "px-6") // Returns: "py-2 px-6" (px-4 removed)
 *
 * // Array and mixed inputs
 * cn(["base", "classes"], condition && "conditional", {
 *   variant: isVariant
 * })
 * ```
 *
 * @see {@link https://github.com/lukeed/clsx|clsx documentation}
 * @see {@link https://github.com/dcastil/tailwind-merge|tailwind-merge documentation}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}