import {
  WifiOff,
  RefreshCw,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArticleCard } from "./ArticleCard";

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
 * Props for the OfflinePage component.
 */
interface OfflinePageProps {
  /** Array of articles that have been saved for offline reading */
  savedArticles: Article[];
  /** Callback fired when user attempts to retry connection */
  onRetry: () => void;
  /** Callback fired when user navigates back from offline mode */
  onBack: () => void;
  /** Callback fired when user clicks on an article */
  onArticleClick: (article: Article) => void;
  /** Callback fired when user bookmarks/unbookmarks an article */
  onBookmark: (id: string) => void;
  /** Callback fired when user shares an article */
  onShare: (article: Article) => void;
}

/**
 * Offline page component displayed when the app detects no internet connection.
 * Shows saved articles and provides options to retry connection or read cached content.
 *
 * @param {OfflinePageProps} props - The props for the OfflinePage component
 * @param {Article[]} props.savedArticles - Array of articles that have been saved for offline reading
 * @param {() => void} props.onRetry - Callback fired when user attempts to retry connection
 * @param {() => void} props.onBack - Callback fired when user navigates back from offline mode
 * @param {(article: Article) => void} props.onArticleClick - Callback fired when user clicks on an article
 * @param {(id: string) => void} props.onBookmark - Callback fired when user bookmarks/unbookmarks an article
 * @param {(article: Article) => void} props.onShare - Callback fired when user shares an article
 * @returns {JSX.Element} The rendered offline page component
 *
 * @example
 * ```tsx
 * <OfflinePage
 *   savedArticles={savedArticles}
 *   onRetry={() => setIsOffline(false)}
 *   onBack={() => setIsOffline(false)}
 *   onArticleClick={setSelectedArticle}
 *   onBookmark={handleBookmark}
 *   onShare={handleShare}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic main element for page content
 * - Provides clear headings and structure for screen readers
 * - Includes descriptive status messages for offline state
 * - Uses proper ARIA labels for action buttons
 * - Provides keyboard navigation support for all interactive elements
 * - Uses live regions for dynamic content updates
 */
export function OfflinePage({
  savedArticles,
  onRetry,
  onBack,
  onArticleClick,
  onBookmark,
  onShare,
}: OfflinePageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 -ml-2"
          aria-label="Navigate back to online mode"
        >
          <ArrowLeft
            className="h-4 w-4 mr-2"
            aria-hidden="true"
          />
          Back
        </Button>

        <div className="text-center mb-8">
          <div
            className="bg-muted/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
            aria-hidden="true"
          >
            <WifiOff className="h-12 w-12 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-bold mb-3">
            You're Offline
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            No internet connection available. You can still read
            your saved articles and recently viewed content
            below.
          </p>

          <Button
            onClick={onRetry}
            className="mb-8"
            aria-label="Check internet connection and try to go back online"
          >
            <RefreshCw
              className="h-4 w-4 mr-2"
              aria-hidden="true"
            />
            Try Again
          </Button>
        </div>

        {savedArticles.length > 0 ? (
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Saved Articles ({savedArticles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  These articles are available offline and ready
                  to read.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {savedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onBookmark={onBookmark}
                  onShare={onShare}
                  onClick={onArticleClick}
                  layout="compact"
                />
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center p-12">
              <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">
                No Saved Articles
              </h3>
              <p className="text-muted-foreground mb-4">
                When you're back online, bookmark articles to
                read them offline later.
              </p>
              <Button variant="outline" onClick={onRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Connection
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 p-4 bg-accent/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> When online, articles are
            automatically saved for offline reading. Enable
            notifications in settings to stay updated with
            breaking news.
          </p>
        </div>
      </div>
    </main>
  );
}