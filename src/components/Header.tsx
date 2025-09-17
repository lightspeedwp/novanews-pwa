import {
  Search,
  Menu,
  Download,
  Bell,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Callback fired when mobile menu button is clicked */
  onMenuClick: () => void;
  /** Callback fired when search button is clicked */
  onSearchClick: () => void;
  /** Callback fired when PWA install button is clicked */
  onInstallClick: () => void;
  /** Callback fired when settings button is clicked */
  onSettingsClick: () => void;
  /** Whether to show the PWA install button */
  showInstallButton: boolean;
}

/**
 * Header component for the NovaNews PWA providing site navigation and user actions.
 * Implements responsive design with mobile hamburger menu and desktop horizontal navigation.
 *
 * @param {HeaderProps} props - The props for the Header component
 * @returns {JSX.Element} The rendered header component
 *
 * @example
 * ```tsx
 * <Header
 *   onMenuClick={() => setIsNavOpen(true)}
 *   onSearchClick={() => setIsSearchOpen(true)}
 *   onInstallClick={handleInstall}
 *   onSettingsClick={() => setIsSettingsOpen(true)}
 *   showInstallButton={true}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic header element for page structure
 * - Provides accessible button labels for screen readers
 * - All interactive elements are keyboard accessible
 * - Mobile menu button includes appropriate aria attributes
 * - Brand logo uses proper text contrast
 */
export function Header({
  onMenuClick,
  onSearchClick,
  onInstallClick,
  onSettingsClick,
  showInstallButton,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="bg-[#0a2e5c] text-white px-2 py-1 rounded text-sm font-bold">
              NOVA
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              NEWS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showInstallButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onInstallClick}
              className="hidden sm:flex items-center gap-2"
              aria-label="Install NovaNews app"
            >
              <Download className="h-4 w-4" />
              Get App
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            aria-label="Search articles"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            aria-label="Open settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}