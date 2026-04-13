import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogList from '@/components/features/blog/BlogList';
import Footer from '@/components/layout/Footer';

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Digital Marketing Insights | Stellar Wave</title>
        <meta
          name="description"
          content="Expert insights on digital marketing, brand strategy, performance marketing, and content creation from the Stellar Wave team in Chennai."
        />
        <link rel="canonical" href="https://stellarwave.in/blog" />
      </Helmet>
      <main className="min-h-screen bg-[#050505] text-white">
        {/* Page Header */}
        <div className="px-4 md:px-8 max-w-7xl mx-auto pt-28 pb-6">
          <p className="text-[#8350e8] text-sm font-semibold uppercase tracking-widest mb-3">Our Blog</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Marketing Insights &<br className="hidden md:block" /> Industry Stories
          </h1>
          <p className="mt-4 text-white/50 max-w-xl text-lg">
            Weekly content on brand strategy, digital marketing, and growth — by the Stellar Wave team.
          </p>
          <div className="mt-6 w-16 h-1 rounded-full bg-[#8350e8]" />
        </div>

        <BlogList />
      </main>
      <Footer />
    </>
  );
}
