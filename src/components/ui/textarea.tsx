import * as React from "react";

import { cn } from "./utils";

/**
 * Textarea component for multi-line text input and longer form content.
 * Provides consistent styling and accessibility features for text areas.
 *
 * @param {React.ComponentProps<"textarea">} props - Standard HTML textarea props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.placeholder] - Placeholder text for the textarea
 * @param {number} [props.rows] - Number of visible text lines
 * @param {number} [props.cols] - Visible width in average character widths
 * @returns {JSX.Element} The rendered textarea component
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <Textarea
 *   placeholder="Write your message here..."
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 * />
 *
 * // Comment textarea with validation
 * <div className="space-y-2">
 *   <Label htmlFor="comment">Your Comment</Label>
 *   <Textarea
 *     id="comment"
 *     placeholder="Share your thoughts..."
 *     aria-invalid={hasError ? "true" : "false"}
 *     aria-describedby="comment-error"
 *   />
 *   {hasError && (
 *     <p id="comment-error" className="text-destructive text-sm">
 *       Comment is required
 *     </p>
 *   )}
 * </div>
 *
 * // Article content textarea
 * <Textarea
 *   placeholder="Write your article content..."
 *   rows={10}
 *   className="font-mono"
 * />
 *
 * // Disabled textarea
 * <Textarea
 *   value="This content cannot be edited"
 *   disabled
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic textarea element
 * - Supports ARIA attributes for validation states
 * - Provides clear focus indicators meeting WCAG 2.2 AA
 * - Placeholder text maintains sufficient color contrast
 * - Should be labeled via Label component or aria-label
 * - Supports field-sizing for automatic height adjustment
 * - Disabled state properly communicated to assistive technology
 *
 * @see {@link https://ui.shadcn.com/docs/components/textarea|Textarea Documentation}
 */
function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };