"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

/**
 * Progress component built on Radix UI Progress primitive.
 * Displays completion progress for tasks, uploads, or multi-step processes.
 *
 * @param {React.ComponentProps<typeof ProgressPrimitive.Root>} props - Radix Progress Root props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {number} [props.value] - Current progress value (0-100)
 * @param {number} [props.max] - Maximum value (defaults to 100)
 * @returns {JSX.Element} The rendered progress component
 *
 * @example
 * ```tsx
 * // Basic progress bar
 * <Progress value={60} className="w-full" />
 *
 * // Upload progress with label
 * <div className="space-y-2">
 *   <div className="flex justify-between text-sm">
 *     <span>Uploading article...</span>
 *     <span>{uploadProgress}%</span>
 *   </div>
 *   <Progress value={uploadProgress} />
 * </div>
 *
 * // Reading progress indicator
 * <Progress
 *   value={readingProgress}
 *   className="fixed top-0 left-0 h-1 z-50"
 *   aria-label={`Reading progress: ${readingProgress}%`}
 * />
 *
 * // Indeterminate progress (no value)
 * <Progress className="animate-pulse" />
 * ```
 *
 * @accessibility
 * - Uses semantic progressbar role for assistive technologies
 * - Automatically announces value changes to screen readers
 * - Should include aria-label for context when not obvious
 * - Provides visual progress indication with smooth transitions
 * - Supports both determinate and indeterminate states
 *
 * @see {@link https://ui.shadcn.com/docs/components/progress|Progress Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/progress|Radix Progress}
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };