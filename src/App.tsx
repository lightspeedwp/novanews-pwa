import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { ArticleCard } from "./components/ArticleCard";
import { ArticleView } from "./components/ArticleView";
import { SearchDialog } from "./components/SearchDialog";
import { SettingsDialog } from "./components/SettingsDialog";
import { InstallPrompt } from "./components/InstallPrompt";
import { OfflinePage } from "./components/OfflinePage";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { toast } from "sonner@2.0.3";

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
 * Mock articles data for prototype and development.
 * In production, this would be replaced with API calls to fetch real article data.
 * Each article follows the Article interface specification.
 *
 * @type {Article[]}
 */
const mockArticles: Article[] = [
  {
    id: "1",
    title:
      "Breaking: Major Economic Policy Changes Announced for 2025",
    excerpt:
      "The government has unveiled comprehensive economic reforms that will reshape the business landscape across South Africa.",
    content: `The South African government has announced sweeping economic policy changes that are set to take effect in early 2025. These reforms, described as the most significant in a decade, aim to stimulate growth and attract foreign investment.

Key changes include new tax incentives for businesses, streamlined regulatory processes, and enhanced support for small and medium enterprises. The Minister of Finance emphasized that these measures are designed to create jobs and boost economic recovery.

The private sector has responded positively to the announcements, with several major corporations already indicating plans to expand their operations. Economic analysts predict that these changes could lead to a significant increase in GDP growth over the next two years.

However, some critics argue that the reforms may not address fundamental structural issues in the economy. They call for more comprehensive changes to education, infrastructure, and governance systems.

The implementation timeline for these policies has been set for March 2025, with a phased approach to ensure smooth transition for all stakeholders.`,
    imageUrl:
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3N8ZW58MXx8fHwxNzU3NjM1MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "breaking",
    author: "Sarah Johnson",
    publishedAt: "2024-12-18T08:30:00Z",
    readTime: "4 min read",
    isBookmarked: false,
  },
  {
    id: "2",
    title:
      "Local Business Leaders Discuss Post-Pandemic Recovery Strategies",
    excerpt:
      "Industry executives share insights on navigating the new business environment and opportunities for growth.",
    content: `Business leaders from across various sectors gathered at the annual Economic Forum to discuss recovery strategies and future opportunities in the post-pandemic era.

The discussions centered around digital transformation, supply chain resilience, and the changing nature of work. Many companies have accelerated their digital initiatives, with some reporting productivity gains of up to 30%.

Key themes that emerged include the importance of agile business models, investment in employee wellbeing, and sustainable business practices. Several speakers highlighted the need for businesses to be more responsive to changing consumer preferences.

The forum also addressed challenges such as skills shortages, rising operational costs, and regulatory uncertainty. Participants shared practical solutions and collaborative approaches to overcome these obstacles.

Looking ahead, there was optimism about the potential for innovation and growth, particularly in technology, renewable energy, and healthcare sectors.`,
    imageUrl:
      "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzU3NjYxMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "business",
    author: "Michael Chen",
    publishedAt: "2024-12-18T06:15:00Z",
    readTime: "6 min read",
    isBookmarked: true,
  },
  {
    id: "3",
    title:
      "Rugby World Cup Preparations Intensify as Team Finalizes Squad",
    excerpt:
      "The national rugby team is making final preparations with key player selections announced ahead of the championship.",
    content: `The national rugby team has announced its final squad for the upcoming international championships, with several surprise inclusions that have excited fans and pundits alike.

Coach Williams emphasized the team's focus on youth and experience, selecting a balanced squad that combines veteran leadership with emerging talent. The selection process was described as the most competitive in recent years.

Training camps have been intensified, with players working on specific game strategies and fitness protocols. The coaching staff has implemented new tactical approaches based on analysis of recent international matches.

Several key players have returned from injury, adding depth to the squad. The captain expressed confidence in the team's preparation and their ability to compete at the highest level.

Fans are showing tremendous support, with ticket sales for home matches exceeding expectations. The team's preparation has been closely followed by media and supporters who are optimistic about their chances.`,
    imageUrl:
      "https://images.unsplash.com/photo-1565483276060-e6730c0cc6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtfGVufDF8fHx8MTc1NzYxNjUxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "sport",
    author: "David Thompson",
    publishedAt: "2024-12-17T14:20:00Z",
    readTime: "3 min read",
    isBookmarked: false,
  },
  {
    id: "4",
    title:
      "Parliamentary Debate on Education Reform Draws Public Interest",
    excerpt:
      "Proposed changes to the education system spark heated discussions among politicians and education experts.",
    content: `The ongoing parliamentary debate on education reform has captured public attention, with proposed changes affecting curriculum, teacher training, and school infrastructure investment.

The Education Minister outlined a comprehensive plan to modernize the education system, including increased digital literacy programs, revised teacher qualification requirements, and substantial infrastructure improvements.

Opposition parties have raised concerns about implementation timelines and budget allocations, calling for more detailed financial planning and phased rollouts. They argue that previous reforms lacked adequate consultation with educators and communities.

Education unions have organized consultations to gather input from teachers and school administrators. Their preliminary feedback highlights the need for adequate training and resources to support any new initiatives.

Parents and community organizations have also voiced their opinions, with many supporting the direction of reforms while expressing concerns about disruption to current students' education.

The debate is expected to continue for several weeks, with committee hearings scheduled to examine specific aspects of the proposed reforms in detail.`,
    imageUrl:
      "https://images.unsplash.com/photo-1510993968327-0766450f8a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpdGljcyUyMGdvdmVybm1lbnR8ZW58MXx8fHwxNzU3NjE2NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "politics",
    author: "Anna Williams",
    publishedAt: "2024-12-17T11:45:00Z",
    readTime: "5 min read",
    isBookmarked: false,
  },
  {
    id: "5",
    title: "Fashion Week Showcases Sustainable Design Trends",
    excerpt:
      "Local designers embrace eco-friendly materials and ethical production methods in their latest collections.",
    content: `This year's Fashion Week has highlighted a significant shift towards sustainable and ethical fashion, with designers showcasing innovative approaches to eco-friendly design.

Prominent local designers have embraced organic materials, recycled fabrics, and zero-waste production methods. The collections demonstrate that sustainable fashion can be both stylish and commercially viable.

Several designers have partnered with local artisans and community cooperatives, creating employment opportunities while preserving traditional craftsmanship. These collaborations have resulted in unique pieces that tell authentic stories.

The event featured panel discussions on the future of fashion, addressing topics such as circular economy principles, consumer behavior changes, and the role of technology in sustainable production.

Fashion retailers have shown strong interest in the sustainable collections, with several major brands already placing orders. Industry experts predict that this trend will continue to grow as consumers become more environmentally conscious.

The success of this year's sustainable fashion showcase has positioned local designers as leaders in the global movement towards responsible fashion.`,
    imageUrl:
      "https://images.unsplash.com/photo-1610244922760-8bd7d912c4d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYXNoaW9ufGVufDF8fHx8MTc1NzY3MzM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "lifestyle",
    author: "Emma Davis",
    publishedAt: "2024-12-16T16:30:00Z",
    readTime: "4 min read",
    isBookmarked: true,
  },
  {
    id: "6",
    title:
      "Tech Innovation Hub Launches New Startup Accelerator Program",
    excerpt:
      "Local entrepreneurs gain access to mentorship, funding, and resources through the new initiative.",
    content: `The recently launched startup accelerator program at the city's Tech Innovation Hub is set to support the next generation of entrepreneurs with comprehensive resources and mentorship opportunities.

The program offers a 12-week intensive course covering business development, technology implementation, market research, and funding strategies. Participants will work directly with industry mentors and successful entrepreneurs.

Selection criteria emphasize innovation potential, scalability, and positive social impact. The first cohort includes startups focused on fintech, healthtech, and sustainable technology solutions.

Funding opportunities include seed investment, grants, and connections to venture capital networks. The program also provides access to state-of-the-art facilities and technical resources.

Program directors report overwhelming interest, with applications received from across the region. The diversity of applicants reflects the broad appeal of entrepreneurship and innovation in the current economic climate.

Success metrics will include job creation, revenue generation, and successful funding rounds for participating startups. The program aims to establish the region as a leading technology and innovation center.`,
    imageUrl:
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NTc1NzYyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "technology",
    author: "James Wilson",
    publishedAt: "2024-12-16T10:00:00Z",
    readTime: "3 min read",
    isBookmarked: false,
  },
];

/**
 * Main application component for the NovaNews Progressive Web App.
 * Handles navigation, article display, PWA functionality, and offline support.
 *
 * @returns {JSX.Element} The complete NovaNews application
 *
 * @accessibility
 * - Uses semantic HTML with proper heading hierarchy
 * - Implements focus management for modals and navigation
 * - Provides keyboard navigation support
 * - Includes ARIA attributes for dynamic content
 * - Supports screen reader announcements via toast notifications
 *
 * @example
 * ```tsx
 * import App from './App';
 *
 * function Root() {
 *   return <App />;
 * }
 * ```
 */
export default function App() {
  /** Currently active category filter for article display */
  const [activeCategory, setActiveCategory] = useState("home");
  /** Currently selected article for detailed view, null when showing article list */
  const [selectedArticle, setSelectedArticle] =
    useState<Article | null>(null);
  /** Array of all articles with bookmark status managed locally */
  const [articles, setArticles] =
    useState<Article[]>(mockArticles);
  /** Controls visibility of mobile navigation menu */
  const [isNavOpen, setIsNavOpen] = useState(false);
  /** Controls visibility of search dialog modal */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  /** Controls visibility of settings dialog modal */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  /** Controls visibility of PWA install prompt banner */
  const [showInstallPrompt, setShowInstallPrompt] =
    useState(false);
  /** Controls availability of PWA install functionality in header */
  const [showInstallButton, setShowInstallButton] =
    useState(true);
  /** Tracks application offline/online status for offline page display */
  const [isOffline, setIsOffline] = useState(false);

  /**
   * Simulates PWA install prompt behavior.
   * Shows install prompt after 5 seconds if install button is available.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showInstallButton) {
        setShowInstallPrompt(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [showInstallButton]);

  /**
   * Handles online/offline status detection.
   * Updates application state based on network connectivity.
   */
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /**
   * Handles PWA installation process.
   * Shows success notification and updates UI state.
   */
  const handleInstall = () => {
    toast.success("App installed successfully!", {
      description:
        "NovaNews is now available from your home screen.",
    });
    setShowInstallButton(false);
    setShowInstallPrompt(false);
  };

  /**
   * Toggles bookmark status for an article.
   * Updates article state and shows user feedback via toast notification.
   *
   * @param {string} articleId - The ID of the article to bookmark/unbookmark
   */
  const handleBookmark = (articleId: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article,
      ),
    );

    const article = articles.find((a) => a.id === articleId);
    if (article) {
      toast.success(
        article.isBookmarked
          ? "Removed from saved articles"
          : "Article saved for offline reading",
        {
          description: article.isBookmarked
            ? "Article removed from your saved collection"
            : "You can now read this article when offline",
        },
      );
    }
  };

  /**
   * Handles article sharing functionality.
   * Uses Web Share API if available, otherwise falls back to clipboard copy.
   * Provides user feedback through toast notifications for all outcomes.
   *
   * @param {Article} article - The article to share
   *
   * @accessibility
   * - Provides immediate feedback via toast notifications
   * - Uses native sharing when available for better UX
   * - Gracefully degrades to clipboard copy with clear messaging
   */
  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          // Fallback to clipboard if sharing fails
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
              toast.success("Link copied to clipboard!");
            })
            .catch(() => {
              toast.error(
                "Unable to share article. Please copy the URL manually.",
              );
            });
        });
    } else {
      // Fallback for browsers without Web Share API
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            toast.success("Link copied to clipboard!");
          })
          .catch(() => {
            toast.error(
              "Unable to copy link. Please copy the URL manually.",
            );
          });
      } else {
        toast.error(
          "Sharing not supported. Please copy the URL from your browser.",
        );
      }
    }
  };

  const filteredArticles =
    activeCategory === "home"
      ? articles
      : articles.filter(
          (article) => article.category === activeCategory,
        );

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);
  const savedArticles = articles.filter(
    (article) => article.isBookmarked,
  );

  if (isOffline) {
    return (
      <OfflinePage
        savedArticles={savedArticles}
        onRetry={() => setIsOffline(false)}
        onBack={() => setIsOffline(false)}
        onArticleClick={setSelectedArticle}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    );
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background" lang="en">
        {/* Skip link for keyboard navigation accessibility */}
        <a
          href="#article-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to article content
        </a>

        <Header
          onMenuClick={() => setIsNavOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
          onInstallClick={handleInstall}
          onSettingsClick={() => setIsSettingsOpen(true)}
          showInstallButton={showInstallButton}
        />

        <ArticleView
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onBookmark={handleBookmark}
          onShare={handleShare}
        />

        <SearchDialog
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          articles={articles}
          onArticleClick={setSelectedArticle}
        />

        <SettingsDialog
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onInstallClick={handleInstall}
          showInstallButton={showInstallButton}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" lang="en">
      {/* Skip link for keyboard navigation accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <Header
        onMenuClick={() => setIsNavOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onInstallClick={handleInstall}
        onSettingsClick={() => setIsSettingsOpen(true)}
        showInstallButton={showInstallButton}
      />

      <Navigation
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />

      <main id="main-content" className="md:ml-0 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 capitalize">
              {activeCategory === "home"
                ? "Latest News"
                : activeCategory}
            </h1>
            {activeCategory !== "home" && (
              <p className="text-muted-foreground">
                Latest updates from {activeCategory}
              </p>
            )}
          </div>

          {/* Breaking News Banner */}
          {activeCategory === "home" && (
            <Card className="mb-6 bg-destructive/10 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive">Breaking</Badge>
                  <span className="text-sm text-muted-foreground">
                    Live Updates
                  </span>
                </div>
                <h3 className="font-semibold">
                  Major Economic Policy Changes Announced for
                  2025
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Government unveils comprehensive reforms to
                  reshape business landscape
                </p>
              </CardContent>
            </Card>
          )}

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Featured Story
              </h2>
              <ArticleCard
                article={featuredArticle}
                onBookmark={handleBookmark}
                onShare={handleShare}
                onClick={setSelectedArticle}
                layout="featured"
              />
            </div>
          )}

          {/* Articles Grid */}
          {regularArticles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {activeCategory === "home"
                    ? "More Stories"
                    : `${activeCategory} News`}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOffline(true)}
                  aria-label="Preview offline reading experience"
                  title="See how the app works when you're offline"
                >
                  Preview Offline Mode
                </Button>
              </div>

              <div className="grid gap-4">
                {regularArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                    onClick={setSelectedArticle}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <Card>
              <CardContent className="text-center p-12">
                <h3 className="font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-4">
                  There are no articles in this category yet.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveCategory("home")}
                >
                  View All Articles
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onArticleClick={setSelectedArticle}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onInstallClick={handleInstall}
        showInstallButton={showInstallButton}
      />

      <InstallPrompt
        onInstall={handleInstall}
        onDismiss={() => setShowInstallPrompt(false)}
        showPrompt={showInstallPrompt}
      />
    </div>
  );
}