import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'y1u1r3gv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImage?: any;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  body?: unknown; // Portable Text blocks
  content?: unknown; // Portable Text blocks (blogType compatibility)
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const ALL_POSTS_QUERY = `*[_type in ["post", "blog"] && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  featuredImage,
  excerpt,
  tags,
  author,
  publishedAt,
  body,
  content
}`;

export const POST_BY_SLUG_QUERY = `*[(_type in ["post", "blog"]) && defined(slug.current) && slug.current == $slug][0] {
  _id,
  title,
  slug,
  featuredImage,
  excerpt,
  metaTitle,
  metaDescription,
  tags,
  author,
  publishedAt,
  body,
  content
}`;
