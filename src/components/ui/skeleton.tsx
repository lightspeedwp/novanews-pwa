import { cn } from "./utils";

/**
 * Skeleton component for displaying loading placeholders while content is being fetched.
 * Provides visual feedback to users during asynchronous operations.
 *
 * @param {React.ComponentProps<"div">} props - Standard HTML div props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} The rendered skeleton placeholder component
 *
 * @example
 * ```tsx
 * // Basic skeleton for text content
 * <Skeleton className="h-4 w-full" />
 *
 * // Skeleton for article card
 * <div className="space-y-2">
 *   <Skeleton className="h-4 w-3/4" />
 *   <Skeleton className="h-4 w-1/2" />
 *   <Skeleton className="h-32 w-full" />
 * </div>
 *
 * // Avatar skeleton
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * // Button skeleton
 * <Skeleton className="h-10 w-24 rounded-md" />
 * ```
 *
 * @accessibility
 * - Uses subtle animation that respects prefers-reduced-motion
 * - Provides visual structure while content loads
 * - Should match approximate size of final content
 * - Can include aria-label="Loading..." for screen readers
 *
 * @see {@link https://ui.shadcn.com/docs/components/skeleton|Skeleton Documentation}
 */
function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };