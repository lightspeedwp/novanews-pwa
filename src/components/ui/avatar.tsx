"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";

import { cn } from "./utils";

/**
 * Avatar component system built on Radix UI Avatar primitive.
 * Displays user profile images with automatic fallback handling.
 * 
 * @see {@link https://ui.shadcn.com/docs/components/avatar|Avatar Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/avatar|Radix Avatar}
 */

/**
 * Root avatar container component that manages image loading and fallback display.
 * 
 * @param {React.ComponentProps<typeof AvatarPrimitive.Root>} props - Radix Avatar Root props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} The avatar container component
 * 
 * @accessibility
 * - Provides consistent circular container for user representations
 * - Supports proper image loading states and fallbacks
 * - Maintains aspect ratio for consistent layout
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Avatar image component that displays the user's profile picture.
 * Automatically falls back to AvatarFallback if image fails to load.
 * 
 * @param {React.ComponentProps<typeof AvatarPrimitive.Image>} props - Radix Avatar Image props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} props.src - URL of the avatar image
 * @param {string} props.alt - Alternative text for the image
 * @returns {JSX.Element} The avatar image component
 * 
 * @accessibility
 * - Requires descriptive alt text for screen readers
 * - Handles loading states gracefully
 * - Falls back automatically on load error
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

/**
 * Avatar fallback component displayed when image is unavailable or loading.
 * Typically contains initials or an icon representing the user.
 * 
 * @param {React.ComponentProps<typeof AvatarPrimitive.Fallback>} props - Radix Avatar Fallback props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} The avatar fallback component
 * 
 * @example
 * ```tsx
 * // Complete avatar with image and fallback
 * <Avatar>
 *   <AvatarImage 
 *     src="/user-profile.jpg" 
 *     alt="John Doe's profile picture" 
 *   />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // Fallback-only avatar with initials
 * <Avatar>
 *   <AvatarFallback className="bg-primary text-primary-foreground">
 *     <User className="h-4 w-4" />
 *   </AvatarFallback>
 * </Avatar>
 * ```
 * 
 * @accessibility
 * - Provides accessible fallback when images fail
 * - Uses appropriate background colors for visibility
 * - Should contain meaningful text or icons
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
