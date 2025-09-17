import { useState } from "react";
import { Search, X, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

/**
 * Represents a news article with all associated metadata and content.
 * Used throughout the application for article display and management.
 */
interface Article {
  /** Unique identifier for the article */
  id: string;
  /** Main headline of the article */
  title: string;
  /** Brief summary or description of the article */
  excerpt: string;
  /** URL of the featured image */
  imageUrl: string;
  /** Category classification (e.g., 'breaking', 'politics', 'sport') */
  category: string;
  /** Name of the article author */
  author: string;
  /** ISO date string of when the article was published */
  publishedAt: string;
  /** Estimated reading time (e.g., '4 min read') */
  readTime: string;
  /** Whether the article is bookmarked by the user */
  isBookmarked: boolean;
}

/**
 * Props for the SearchDialog component.
 */
interface SearchDialogProps {
  /** Whether the search dialog is open */
  isOpen: boolean;
  /** Callback fired when the dialog should be closed */
  onClose: () => void;
  /** Array of articles to search through */
  articles: Article[];
  /** Callback fired when an article is selected from search results */
  onArticleClick: (article: Article) => void;
}

/**
 * Search dialog component for finding articles by title, content, or category.
 * Provides recent searches, trending topics, and real-time search results.
 *
 * @param {SearchDialogProps} props - The props for the SearchDialog component
 * @param {boolean} props.isOpen - Whether the search dialog is open
 * @param {() => void} props.onClose - Callback fired when the dialog should be closed
 * @param {Article[]} props.articles - Array of articles to search through
 * @param {(article: Article) => void} props.onArticleClick - Callback fired when an article is selected from search results
 * @returns {JSX.Element} The rendered search dialog component
 *
 * @example
 * ```tsx
 * <SearchDialog
 *   isOpen={isSearchOpen}
 *   onClose={() => setIsSearchOpen(false)}
 *   articles={articles}
 *   onArticleClick={setSelectedArticle}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic dialog element with proper ARIA attributes
 * - Provides clear headings and structure for screen readers
 * - Includes keyboard navigation support (Enter to search, Esc to close)
 * - Auto-focuses search input when dialog opens
 * - Uses live region for dynamic search results announcements
 * - Provides clear labels for all interactive elements
 */
export function SearchDialog({
  isOpen,
  onClose,
  articles,
  onArticleClick,
}: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [recentSearches] = useState([
    "Breaking news",
    "Election results",
    "Business updates",
    "Sports scores",
  ]);

  /**
   * Filters articles based on search query.
   * Searches through title, excerpt, and category fields.
   * Limited to 8 results for performance and UX.
   */
  const filteredArticles = query.trim()
    ? articles
        .filter(
          (article) =>
            article.title
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            article.excerpt
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            article.category
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : [];

  /**
   * Handles article selection from search results.
   * Closes dialog and resets search query.
   *
   * @param {Article} article - The selected article
   */
  const handleArticleClick = (article: Article) => {
    onArticleClick(article);
    onClose();
    setQuery("");
  };

  /**
   * Handles clicking on recent search terms.
   * Populates search input with the selected term.
   *
   * @param {string} searchTerm - The search term to use
   */
  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="relative p-6 pb-4">
          <DialogTitle className="sr-only">
            Search Articles
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-background border border-border shadow-sm hover:bg-accent z-10"
            aria-label="Close search dialog"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search articles, categories, authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 placeholder:text-muted-foreground"
              autoFocus
              aria-label="Search for articles"
              role="searchbox"
            />
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 overflow-y-auto">
          {!query.trim() && (
            <div>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                Recent Searches
              </h3>
              <div
                className="flex flex-wrap gap-2 mb-6"
                role="group"
                aria-label="Recent search terms"
              >
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleRecentSearchClick(search)
                    }
                    className="h-8"
                    aria-label={`Search for ${search}`}
                  >
                    <Clock
                      className="h-3 w-3 mr-2"
                      aria-hidden="true"
                    />
                    {search}
                  </Button>
                ))}
              </div>

              <Separator className="mb-4" />

              <div>
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                  Trending Topics
                </h3>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Trending topic categories"
                >
                  {[
                    "Breaking",
                    "Politics",
                    "Business",
                    "Sport",
                  ].map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() =>
                        handleRecentSearchClick(topic)
                      }
                      tabIndex={0}
                      role="button"
                      aria-label={`Search for ${topic} articles`}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" ||
                          e.key === " "
                        ) {
                          e.preventDefault();
                          handleRecentSearchClick(topic);
                        }
                      }}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query.trim() && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Search Results
                </h3>
                <span
                  className="text-sm text-muted-foreground"
                  aria-live="polite"
                  aria-label={`${filteredArticles.length} search results found`}
                >
                  {filteredArticles.length} results
                </span>
              </div>

              {filteredArticles.length === 0 ? (
                <div
                  className="text-center py-8"
                  role="status"
                  aria-live="polite"
                >
                  <Search
                    className="h-12 w-12 text-muted-foreground mx-auto mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-muted-foreground">
                    No articles found for "{query}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching for different keywords
                  </p>
                </div>
              ) : (
                <div
                  className="space-y-3"
                  role="list"
                  aria-label="Search results"
                >
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() =>
                        handleArticleClick(article)
                      }
                      className="flex gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      role="listitem"
                      tabIndex={0}
                      aria-label={`Article: ${article.title} by ${article.author}`}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" ||
                          e.key === " "
                        ) {
                          e.preventDefault();
                          handleArticleClick(article);
                        }
                      }}
                    >
                      <img
                        src={article.imageUrl}
                        alt={`Thumbnail for ${article.title}`}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {article.author}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}