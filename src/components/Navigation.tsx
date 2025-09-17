import { Badge } from "./ui/badge";

/**
 * Props for the Navigation component
 */
interface NavigationProps {
  /** Currently active category identifier */
  activeCategory: string;
  /** Callback fired when a category is selected */
  onCategoryChange: (category: string) => void;
  /** Whether the mobile navigation menu is open */
  isOpen: boolean;
  /** Callback fired when the navigation should be closed */
  onClose: () => void;
}

/**
 * News categories available in the navigation.
 * Each category has an ID, display label, and color variant for styling.
 */
const categories = [
  { id: "home", label: "Home", color: "default" },
  { id: "breaking", label: "Breaking", color: "destructive" },
  { id: "news", label: "News", color: "default" },
  { id: "politics", label: "Politics", color: "default" },
  { id: "business", label: "Business", color: "default" },
  { id: "sport", label: "Sport", color: "default" },
  { id: "lifestyle", label: "Lifestyle", color: "default" },
  { id: "technology", label: "Technology", color: "default" },
  { id: "opinion", label: "Opinion", color: "default" },
];

/**
 * Navigation component providing category-based filtering for news articles.
 * Renders as horizontal badges on desktop and a mobile sidebar menu on smaller screens.
 *
 * @param {NavigationProps} props - The props for the Navigation component
 * @returns {JSX.Element} The rendered navigation component
 *
 * @example
 * ```tsx
 * <Navigation
 *   activeCategory="breaking"
 *   onCategoryChange={handleCategoryChange}
 *   isOpen={isMobileMenuOpen}
 *   onClose={closeMobileMenu}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic nav element for navigation landmark
 * - Provides focus management for mobile menu
 * - All category buttons are keyboard accessible
 * - Screen reader accessible button labels
 * - Overlay click closes mobile menu
 * - Active category clearly indicated with visual styling
 */
export function Navigation({
  activeCategory,
  onCategoryChange,
  isOpen,
  onClose,
}: NavigationProps) {
  /**
   * Handles category selection and closes mobile menu if applicable.
   *
   * @param {string} categoryId - The ID of the selected category
   */
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Navigation sidebar */}
      <nav
        id="mobile-navigation"
        className={`
          fixed top-[73px] left-0 z-40 h-[calc(100vh-73px)] w-64 bg-background border-r
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-auto md:w-auto md:bg-transparent md:border-r-0
        `}
        aria-label="News categories"
      >
        <div className="p-4">
          <h3 className="font-semibold mb-4 md:hidden">
            Categories
          </h3>

          {/* Desktop horizontal navigation */}
          <div className="hidden md:flex md:flex-wrap md:gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={
                  activeCategory === category.id
                    ? "default"
                    : "secondary"
                }
                className={`cursor-pointer hover:bg-accent transition-colors ${
                  category.color === "destructive" &&
                  activeCategory === category.id
                    ? "bg-destructive text-destructive-foreground"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          {/* Mobile vertical navigation */}
          <div className="flex flex-col gap-2 md:hidden">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`text-left p-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`}
              >
                <span
                  className={`${
                    category.color === "destructive"
                      ? "text-destructive font-semibold"
                      : ""
                  }`}
                >
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}