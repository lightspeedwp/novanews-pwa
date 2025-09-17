import * as React from "react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority@0.7.1";

import { cn } from "./utils";

/**
 * Alert component system for displaying important messages and notifications.
 * Provides consistent styling and accessibility for user feedback.
 *
 * @see {@link https://ui.shadcn.com/docs/components/alert|Alert Documentation}
 */

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Alert container component for displaying important messages to users.
 * Uses semantic alert role for immediate screen reader announcement.
 *
 * @param {React.ComponentProps<"div"> & VariantProps<typeof alertVariants>} props - Alert props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {"default" | "destructive"} [props.variant="default"] - Visual variant of the alert
 * @returns {JSX.Element} The rendered alert container component
 *
 * @example
 * ```tsx
 * // Success message alert
 * <Alert>
 *   <CheckCircle className="h-4 w-4" />
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>
 *     Your article has been published successfully.
 *   </AlertDescription>
 * </Alert>
 *
 * // Error alert
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>
 *     There was a problem processing your request.
 *   </AlertDescription>
 * </Alert>
 * ```
 *
 * @accessibility
 * - Uses role="alert" for immediate screen reader announcement
 * - Supports icons for visual reinforcement
 * - Color is not the only indicator of meaning
 * - Provides clear structure with title and description
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * Alert title component for the main message heading.
 *
 * @param {React.ComponentProps<"div">} props - Standard HTML div props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} The rendered alert title component
 *
 * @accessibility
 * - Provides semantic structure for alert content
 * - Uses appropriate font weight for emphasis
 * - Should be concise and descriptive
 */
function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Alert description component for detailed message content.
 *
 * @param {React.ComponentProps<"div">} props - Standard HTML div props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} The rendered alert description component
 *
 * @accessibility
 * - Provides detailed context for the alert
 * - Uses readable text styling with proper line height
 * - Can contain multiple paragraphs or formatted content
 */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };