import {
  Clock,
  Bookmark,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  isBookmarked: boolean;
}

interface ArticleCardProps {
  article: Article;
  onBookmark: (id: string) => void;
  onShare: (article: Article) => void;
  onClick: (article: Article) => void;
  layout?: "default" | "featured" | "compact";
}

export function ArticleCard({
  article,
  onBookmark,
  onShare,
  onClick,
  layout = "default",
}: ArticleCardProps) {
  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark(article.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(article);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  if (layout === "featured") {
    return (
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onClick(article)}
      >
        <div className="relative">
          <ImageWithFallback
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant={
                article.category === "breaking"
                  ? "destructive"
                  : "secondary"
              }
              className="bg-background/90 text-foreground"
            >
              {article.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h2 className="font-bold text-lg mb-2 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{article.author}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleBookmark}
              >
                <Bookmark
                  className={`h-4 w-4 ${article.isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (layout === "compact") {
    return (
      <Card
        className="overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => onClick(article)}
      >
        <CardContent className="p-3">
          <div className="flex gap-3">
            <ImageWithFallback
              src={article.imageUrl}
              alt={article.title}
              className="w-20 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                {article.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {article.author}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleBookmark}
                >
                  <Bookmark
                    className={`h-3 w-3 ${article.isBookmarked ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(article)}
    >
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <ImageWithFallback
            src={article.imageUrl}
            alt={article.title}
            className="w-24 h-20 object-cover rounded flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  article.category === "breaking"
                    ? "destructive"
                    : "outline"
                }
                className="text-xs"
              >
                {article.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <h3 className="font-semibold mb-2 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{article.author}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleBookmark}
                >
                  <Bookmark
                    className={`h-3 w-3 ${article.isBookmarked ? "fill-current" : ""}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleShare}
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}