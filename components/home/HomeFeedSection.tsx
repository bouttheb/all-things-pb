import FeedCard from "@/components/feed/FeedCard";
import type { Post } from "@/types";

interface HomeFeedSectionProps {
  posts: Post[];
}

export default function HomeFeedSection({ posts }: HomeFeedSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section id="feed" className="site-section">
      <h2 className="section-heading">Latest Content</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[960px] mx-auto mb-8">
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center">
        <a href="/feed" className="view-all-link">
          View All Content
        </a>
      </div>
    </section>
  );
}
