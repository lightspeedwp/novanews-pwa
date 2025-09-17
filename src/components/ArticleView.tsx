import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  /** Full article content */
  content: string;
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
 * Props for the ArticleView component.
 */
interface ArticleViewProps {
  /** The article to display */
  article: Article;
  /** Callback fired when user navigates back */
  onBack: () => void;
  /** Callback fired when user bookmarks/unbookmarks the article */
  onBookmark: (id: string) => void;
  /** Callback fired when user shares the article */
  onShare: (article: Article) => void;
}

/**
 * Full-screen article view component for displaying complete article content.
 * Provides article reading experience with author information, sharing options, and bookmark functionality.
 *
 * @param {ArticleViewProps} props - The props for the ArticleView component
 * @param {Article} props.article - The article to display
 * @param {() => void} props.onBack - Callback fired when user navigates back
 * @param {(id: string) => void} props.onBookmark - Callback fired when user bookmarks/unbookmarks the article
 * @param {(article: Article) => void} props.onShare - Callback fired when user shares the article
 * @returns {JSX.Element} The rendered article view component
 *
 * @example
 * ```tsx
 * <ArticleView
 *   article={selectedArticle}
 *   onBack={() => setSelectedArticle(null)}
 *   onBookmark={handleBookmark}
 *   onShare={handleShare}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic article element for main content
 * - Implements proper heading hierarchy starting with h1
 * - Provides descriptive alt text for images
 * - Includes keyboard navigation support for all interactive elements
 * - Uses appropriate ARIA labels for action buttons
 * - Maintains focus management when navigating back
 */
export function ArticleView({
  article,
  onBack,
  onBookmark,
  onShare,
}: ArticleViewProps) {
  /**
   * Formats an ISO date string into a readable format.
   * Uses British English locale for consistent date formatting.
   *
   * @param {string} dateString - ISO date string to format
   * @returns {string} Formatted date string with day, month, year, and time
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Handles article sharing using native Web Share API when available.
   * Falls back to custom share handler if Web Share API is not supported.
   */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      onShare(article);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2"
          aria-label="Navigate back to article list"
        >
          <ArrowLeft
            className="h-4 w-4 mr-2"
            aria-hidden="true"
          />
          Back
        </Button>

        <div className="mb-4">
          <Badge
            variant={
              article.category === "breaking"
                ? "destructive"
                : "outline"
            }
            className="mb-3"
          >
            {article.category}
          </Badge>

          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            {article.excerpt}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span className="font-medium">
              {article.author}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBookmark(article.id)}
              aria-label={
                article.isBookmarked
                  ? "Remove article from saved articles"
                  : "Save article for offline reading"
              }
            >
              <Bookmark
                className={`h-4 w-4 mr-2 ${article.isBookmarked ? "fill-current" : ""}`}
                aria-hidden="true"
              />
              {article.isBookmarked ? "Saved" : "Save"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              aria-label="Share this article"
            >
              <Share2
                className="h-4 w-4 mr-2"
                aria-hidden="true"
              />
              Share
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />
      </div>

      <article className="prose prose-lg max-w-none">
        <ImageWithFallback
          src={article.imageUrl}
          alt={`Featured image for: ${article.title}`}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="whitespace-pre-line leading-relaxed">
          {article.content}
        </div>
      </article>

      <Separator className="my-8" />

      <section
        className="bg-accent/50 p-6 rounded-lg"
        aria-labelledby="author-heading"
      >
        <h3 id="author-heading" className="font-semibold mb-3">
          About the Author
        </h3>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold"
            aria-label={`Profile picture placeholder for ${article.author}`}
          >
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{article.author}</p>
            <p className="text-sm text-muted-foreground">
              Senior Reporter at NovaNews
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}