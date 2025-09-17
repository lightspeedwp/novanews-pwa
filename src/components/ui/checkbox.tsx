"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

/**
 * Checkbox component built on Radix UI Checkbox primitive.
 * Provides accessible multi-selection input with visual feedback for checked/unchecked states.
 * 
 * @param {React.ComponentProps<typeof CheckboxPrimitive.Root>} props - Radix Checkbox Root props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Default checked state for uncontrolled usage
 * @param {(checked: boolean) => void} [props.onCheckedChange] - Callback fired when state changes
 * @returns {JSX.Element} The rendered checkbox component
 * 
 * @example
 * ```tsx
 * // Controlled checkbox
 * <Checkbox 
 *   checked={isAccepted} 
 *   onCheckedChange={setIsAccepted}
 *   aria-label="Accept terms and conditions"
 * />
 * 
 * // Checkbox with label
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="notifications" />
 *   <Label htmlFor="notifications">
 *     Send me email notifications
 *   </Label>
 * </div>
 * 
 * // Indeterminate state (partial selection)
 * <Checkbox 
 *   checked={selectedItems.length === totalItems ? true : selectedItems.length > 0 ? "indeterminate" : false}
 *   onCheckedChange={handleSelectAll}
 * />
 * 
 * // Disabled checkbox
 * <Checkbox disabled defaultChecked />
 * ```
 * 
 * @accessibility
 * - Uses semantic checkbox role for assistive technologies
 * - Supports keyboard navigation (Space to toggle)
 * - Provides clear visual focus indicators
 * - State changes announced to screen readers
 * - Should be labeled via aria-label or associated Label component
 * - Supports indeterminate state for partial selections
 * - Disabled state properly communicated to assistive technology
 * 
 * @see {@link https://ui.shadcn.com/docs/components/checkbox|Checkbox Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/checkbox|Radix Checkbox}
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
