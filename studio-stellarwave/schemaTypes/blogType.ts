import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO & Meta'},
  ],
  fields: [
    // ── Core ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main headline of the blog post.',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      description: 'Auto-generated URL path. Click "Generate" after entering the title.',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'Stellar Wave',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Category',
      type: 'array',
      group: 'content',
      description: 'Add up to 5 tags (e.g. "Brand Strategy", "SEO", "Social Media")',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {value: 'Brand Strategy', title: 'Brand Strategy'},
          {value: 'Performance Marketing', title: 'Performance Marketing'},
          {value: 'Creative Content', title: 'Creative Content'},
          {value: 'Social Media', title: 'Social Media'},
          {value: 'SEO', title: 'SEO'},
          {value: 'Sports Marketing', title: 'Sports Marketing'},
          {value: 'Case Study', title: 'Case Study'},
          {value: 'Industry News', title: 'Industry News'},
        ],
      },
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      description: 'Main blog image. Recommended size: 1400 × 700px.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (for accessibility & SEO)',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Blog Content',
      type: 'array',
      group: 'content',
      description: 'Write your blog post here. Use the toolbar to add headings, bold, images, etc.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {name: 'href', type: 'url', title: 'URL'},
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt Text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Leave blank to auto-use the post title. Max 60 characters.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Short description for Google search results. Aim for 140–160 characters.',
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'featuredImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {author, date} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('en-IN') : 'Unpublished'
      return {
        ...selection,
        subtitle: `${author ?? 'Stellar Wave'} · ${formattedDate}`,
      }
    },
  },
})
