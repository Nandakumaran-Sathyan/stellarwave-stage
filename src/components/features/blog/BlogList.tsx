import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { sanityClient, urlFor, ALL_POSTS_QUERY, type BlogPost } from '@/lib/sanity';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient.fetch<BlogPost[]>(ALL_POSTS_QUERY)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
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

  if (posts.length === 0) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-5xl">📝</p>
        <p className="text-white/60 text-lg">No posts yet — check back soon.</p>
      </section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">

      {/* ── Featured Post ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <Link to={`/blog/${featured.slug.current}`} className="group block">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-white/5 border border-white/10">
            {featured.featuredImage ? (
              <img
                src={urlFor(featured.featuredImage).width(1400).height(612).fit('crop').url()}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#8350e8]/30 to-[#050505]" />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {featured.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-[#8350e8]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-[#c4a4ff] transition-colors duration-300">
                {featured.title}
              </h2>
              <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                {featured.author && (
                  <span className="flex items-center gap-1.5"><User size={13} />{featured.author}</span>
                )}
                {featured.publishedAt && (
                  <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(featured.publishedAt)}</span>
                )}
              </div>
              <span className="inline-flex items-center gap-2 text-[#c4a4ff] font-semibold text-sm group-hover:gap-3 transition-all">
                Read article <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <>
          <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-8">More Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post._id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
              >
                <Link
                  to={`/blog/${post.slug.current}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#8350e8]/50 hover:bg-white/[0.06] transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-white/5">
                    {post.featuredImage ? (
                      <img
                        src={urlFor(post.featuredImage).width(600).height(338).fit('crop').url()}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8350e8]/20 to-[#050505]" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] font-semibold text-[#c4a4ff] bg-[#8350e8]/15 px-2.5 py-0.5 rounded-full">
                          <Tag size={9} />{tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold leading-snug group-hover:text-[#c4a4ff] transition-colors duration-300 flex-1">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10 text-white/40 text-xs">
                      <span className="flex items-center gap-1.5">
                        <User size={11} />{post.author ?? 'Stellar Wave'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} />{formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
