import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

/**
 * Props for the InstallPrompt component.
 */
interface InstallPromptProps {
  /** Callback fired when user chooses to install the PWA */
  onInstall: () => void;
  /** Callback fired when user dismisses the install prompt */
  onDismiss: () => void;
  /** Whether to show the install prompt */
  showPrompt: boolean;
}

/**
 * Progressive Web App install prompt component.
 * Displays a dismissible banner encouraging users to install the NovaNews PWA.
 *
 * @param {InstallPromptProps} props - The props for the InstallPrompt component
 * @param {() => void} props.onInstall - Callback fired when user chooses to install the PWA
 * @param {() => void} props.onDismiss - Callback fired when user dismisses the install prompt
 * @param {boolean} props.showPrompt - Whether to show the install prompt
 * @returns {JSX.Element | null} The rendered install prompt or null if not visible
 *
 * @example
 * ```tsx
 * <InstallPrompt
 *   onInstall={handleInstall}
 *   onDismiss={() => setShowInstallPrompt(false)}
 *   showPrompt={showInstallPrompt}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic elements with proper roles and labels
 * - Provides clear action buttons with descriptive text
 * - Includes keyboard navigation support
 * - Uses appropriate focus management for modal-like behavior
 * - Provides clear visual hierarchy with icons and headings
 */
export function InstallPrompt({
  onInstall,
  onDismiss,
  showPrompt,
}: InstallPromptProps) {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Controls the visibility timing of the install prompt.
   * Shows prompt after a 2-second delay for better user experience.
   */
  useEffect(() => {
    if (showPrompt) {
      // Show prompt after a slight delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showPrompt]);

  /**
   * Handles dismissing the install prompt with animation.
   */
  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  /**
   * Handles the install action with animation cleanup.
   */
  const handleInstall = () => {
    setIsVisible(false);
    onInstall();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm"
      role="dialog"
      aria-labelledby="install-prompt-title"
      aria-describedby="install-prompt-description"
    >
      <Card className="shadow-lg border-2">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              className="bg-[#0a2e5c] text-white p-2 rounded-full flex-shrink-0"
              aria-hidden="true"
            >
              <Download className="h-4 w-4" />
            </div>

            <div className="flex-1 min-w-0">
              <h3
                id="install-prompt-title"
                className="font-semibold text-sm mb-1"
              >
                Install NovaNews App
              </h3>
              <p
                id="install-prompt-description"
                className="text-xs text-muted-foreground mb-3 leading-relaxed"
              >
                Get faster loading, offline reading, and push
                notifications. Install now for the best
                experience.
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="flex-1"
                  aria-label="Install NovaNews Progressive Web App"
                >
                  <Download
                    className="h-3 w-3 mr-2"
                    aria-hidden="true"
                  />
                  Install
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDismiss}
                  aria-label="Dismiss install prompt"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}