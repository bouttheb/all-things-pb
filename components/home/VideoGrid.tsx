/* eslint-disable @next/next/no-img-element */
import type { Post } from "@/types";

interface VideoGridProps {
  id: string;
  heading: string;
  posts: Post[];
  viewAllHref: string;
  viewAllLabel: string;
}

export default function VideoGrid({
  id,
  heading,
  posts,
  viewAllHref,
  viewAllLabel,
}: VideoGridProps) {
  return (
    <section id={id} className="site-section">
      <h2 className="section-heading">{heading}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        {posts.map((post) => {
          const videoId = post.embed_url?.match(/embed\/([^?]+)/)?.[1] || "";
          const href = videoId
            ? `https://youtube.com/watch?v=${videoId}`
            : post.content_url || "#";

          return (
            <a
              key={post.id}
              href={href}
              target="_blank"
              rel="noopener"
              className="relative rounded-lg overflow-hidden group no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex flex-col"
            >
              <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden">
                {post.thumbnail_url ? (
                  <img
                    src={post.thumbnail_url}
                    alt={post.title || ""}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#666">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-2.5 bg-[var(--color-cream)]">
                <span className="text-[0.78rem] font-semibold text-[var(--color-ink)] leading-snug line-clamp-2 block">
                  {post.title}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="text-center">
        <a href={viewAllHref} target="_blank" rel="noopener" className="view-all-link">
          {viewAllLabel}
        </a>
      </div>
    </section>
  );
}
