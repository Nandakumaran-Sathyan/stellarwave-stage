import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sanityClient, urlFor, POST_BY_SLUG_QUERY, normalizeSlug, type BlogPost } from '@/lib/sanity';
import BlogPostDetail from '@/components/features/blog/BlogPost';
import Footer from '@/components/layout/Footer';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const normalizedSlug = slug ? normalizeSlug(slug) : undefined;

  useEffect(() => {
    if (!normalizedSlug) return;
    sanityClient.fetch<BlogPost>(POST_BY_SLUG_QUERY, { slug: normalizedSlug }).then(setPost);
  }, [normalizedSlug]);

  const metaTitle = post?.metaTitle ?? (post ? `${post.title} | Stellar Wave Blog` : 'Blog | Stellar Wave');
  const metaDesc = post?.metaDescription ?? 'Read the latest insights from Stellar Wave on digital marketing, branding, and growth.';
  const ogImage = post?.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).fit('crop').url() : undefined;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        {normalizedSlug && <link rel="canonical" href={`https://stellarwave.in/blog/${normalizedSlug}`} />}
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <main className="min-h-screen bg-[#050505] text-white pt-16">
        <BlogPostDetail />
      </main>
      <Footer />
    </>
  );
}
