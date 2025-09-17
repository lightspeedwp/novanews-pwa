import { useState } from "react";
import {
  Bell,
  Download,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

/**
 * Props for the SettingsDialog component.
 */
interface SettingsDialogProps {
  /** Whether the settings dialog is open */
  isOpen: boolean;
  /** Callback fired when the dialog should be closed */
  onClose: () => void;
  /** Callback fired when the PWA install button is clicked */
  onInstallClick: () => void;
  /** Whether to show the PWA install button */
  showInstallButton: boolean;
}

/**
 * Settings dialog component for managing app preferences and PWA features.
 * Provides controls for push notifications, appearance, offline storage, and PWA installation.
 *
 * @param {SettingsDialogProps} props - The props for the SettingsDialog component
 * @param {boolean} props.isOpen - Whether the settings dialog is open
 * @param {() => void} props.onClose - Callback fired when the dialog should be closed
 * @param {() => void} props.onInstallClick - Callback fired when the PWA install button is clicked
 * @param {boolean} props.showInstallButton - Whether to show the PWA install button
 * @returns {JSX.Element} The rendered settings dialog component
 *
 * @example
 * ```tsx
 * <SettingsDialog
 *   isOpen={isSettingsOpen}
 *   onClose={() => setIsSettingsOpen(false)}
 *   onInstallClick={handleInstall}
 *   showInstallButton={showInstallButton}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic dialog element with proper ARIA attributes
 * - Provides clear headings and structure for screen readers
 * - Includes proper form labels and descriptions for all settings
 * - Uses switches with appropriate labels and states
 * - Provides keyboard navigation support for all controls
 * - Groups related settings with proper sections and headings
 */
export function SettingsDialog({
  isOpen,
  onClose,
  onInstallClick,
  showInstallButton,
}: SettingsDialogProps) {
  const [notifications, setNotifications] = useState({
    breaking: true,
    politics: false,
    business: true,
    sport: false,
    lifestyle: false,
    technology: true,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);

  /**
   * Handles toggling notification preferences for different categories.
   *
   * @param {string} category - The notification category to toggle
   * @param {boolean} enabled - Whether the category should be enabled
   */
  const handleNotificationChange = (
    category: string,
    enabled: boolean,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: enabled,
    }));
  };

  const enabledNotifications = Object.entries(
    notifications,
  ).filter(([_, enabled]) => enabled);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* PWA Installation */}
          {showInstallButton && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Install App
                </CardTitle>
                <CardDescription>
                  Install NovaNews as a Progressive Web App for
                  a better experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={onInstallClick}
                  className="w-full"
                  aria-label="Install NovaNews Progressive Web App"
                >
                  <Download
                    className="h-4 w-4 mr-2"
                    aria-hidden="true"
                  />
                  Install NovaNews App
                </Button>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Faster loading times</li>
                  <li>• Works offline</li>
                  <li>• Push notifications</li>
                  <li>• Desktop/mobile shortcuts</li>
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Get notified about breaking news and stories
                from categories you follow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {Object.entries(notifications).map(
                  ([category, enabled]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Label
                          htmlFor={category}
                          className="capitalize"
                        >
                          {category}
                        </Label>
                        {category === "breaking" && (
                          <Badge
                            variant="destructive"
                            className="text-xs"
                          >
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <Switch
                        id={category}
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(
                            category,
                            checked,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>

              <Separator />

              <div
                className="bg-accent/50 p-3 rounded-lg"
                role="status"
                aria-live="polite"
              >
                <p className="text-sm font-medium mb-1">
                  Active Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  You'll receive notifications for{" "}
                  {enabledNotifications.length} categories:{" "}
                  {enabledNotifications
                    .map(([category]) => category)
                    .join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Badge variant="outline" className="text-xs">
                    Coming Soon
                  </Badge>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          {/* Offline & Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {offlineMode ? (
                  <Wifi className="h-5 w-5" />
                ) : (
                  <WifiOff className="h-5 w-5" />
                )}
                Offline & Storage
              </CardTitle>
              <CardDescription>
                Manage offline reading and data usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline-mode">
                    Enable Offline Reading
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Save articles for reading without internet
                  </p>
                </div>
                <Switch
                  id="offline-mode"
                  checked={offlineMode}
                  onCheckedChange={setOfflineMode}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Cached Articles</span>
                  <span className="text-muted-foreground">
                    127 articles (24.3 MB)
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Cached Images</span>
                  <span className="text-muted-foreground">
                    89 images (18.7 MB)
                  </span>
                </div>

                <div className="flex justify-between text-sm font-medium">
                  <span>Total Storage</span>
                  <span>43.0 MB</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  aria-label="Clear cached articles and images to free up storage space"
                >
                  <Trash2
                    className="h-4 w-4 mr-2"
                    aria-hidden="true"
                  />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About NovaNews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span>December 2024</span>
              </div>
              <div className="flex justify-between">
                <span>PWA Status</span>
                <Badge variant="outline" className="text-xs">
                  {showInstallButton
                    ? "Available"
                    : "Installed"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}