import Link from "next/link";
import type { BlogPost } from "../data/blog";

interface BlogCardProps {
  post: BlogPost;
}

const categoryColors: Record<string, string> = {
  "Web Development": "text-blue-400",
  "E-Commerce Development": "text-emerald-400",
  "Agentic AI": "text-purple-400",
  "Deep Tech AI": "text-orange-400",
  "Landing Pages": "text-pink-400",
  "Enterprise AI": "text-cyan-400",
};

const BlogCard = ({ post }: BlogCardProps) => {
  const categoryColor = categoryColors[post.category] ?? "text-[var(--muted)]";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className={`font-mono text-xs uppercase tracking-[0.15em] ${categoryColor}`}>
          {post.category}
        </span>
        <span className="font-mono text-xs text-[var(--muted-soft)]">{post.readTime}</span>
      </div>

      <h2 className="mb-3 text-base font-semibold leading-snug text-[var(--foreground)] transition-opacity group-hover:opacity-80">
        {post.title}
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <time
          dateTime={post.date}
          className="font-mono text-xs text-[var(--muted-soft)]"
        >
          {new Date(post.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
          Read →
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
