import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { sanityClient, urlFor, POST_BY_SLUG_QUERY, type BlogPost } from '@/lib/sanity';

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-10 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-2">{children}</h3>,
    normal: ({ children }: any) => <p className="text-white/75 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#8350e8] pl-5 my-6 text-white/60 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-white/70">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-white/80">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-white/10 text-[#c4a4ff] text-sm font-mono px-1.5 py-0.5 rounded">{children}</code>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#c4a4ff] underline underline-offset-2 hover:text-white transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(900).url()}
          alt={value.alt ?? ''}
          className="w-full rounded-xl object-cover border border-white/10"
        />
        {value.caption && (
          <figcaption className="text-center text-white/40 text-sm mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    sanityClient.fetch<BlogPost>(POST_BY_SLUG_QUERY, { slug })
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[#8350e8] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">🔍</p>
        <h1 className="text-2xl font-bold text-white">Post not found</h1>
        <Link to="/blog" className="text-[#c4a4ff] hover:underline flex items-center gap-2">
          <ArrowLeft size={15} /> Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="min-h-screen">
      {/* ── Hero Image ──────────────────────────────────────────────── */}
      {post.featuredImage && (
        <div className="w-full aspect-[21/9] overflow-hidden relative">
          <img
            src={urlFor(post.featuredImage).width(1600).height(686).fit('crop').url()}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
        </div>
      )}

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-8 mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags?.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs font-semibold text-[#c4a4ff] bg-[#8350e8]/15 px-3 py-1 rounded-full">
                <Tag size={10} />{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-5 text-white/50 text-sm">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User size={14} /> {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {formatDate(post.publishedAt)}
                </span>
              )}
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
              title="Share this post"
            >
              <Share2 size={15} /> Share
            </button>
          </div>

          {/* Body */}
          <div className="prose-blog">
            {post.body ? (
              <PortableText value={post.body as any} components={portableTextComponents} />
            ) : post.content ? (
              <PortableText value={post.content as any} components={portableTextComponents} />
            ) : (
              <p className="text-white/50 italic">No content available for this post.</p>
            )}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
