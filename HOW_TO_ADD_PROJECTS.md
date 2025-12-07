# How to Add a New Project (The Super-Powered Way)

Your portfolio uses a powerful data-driven system (`projects.json`) that turns raw JSON into extensive, beautiful case studies.

## 1. Top Level Config (The Hero Section)

This information powers the **Immersive Header** and **Top Gallery**.

```json
{
    "id": "unique-id",
    "title": "Project Name",
    "description": "One sentence 'Hook' description for the hero area.",
    "tags": ["Next.js", "AI", "Design"],
    "liveLink": "https://...",
    
    // PRIMARY HERO IMAGE (Background Blur)
    "image": "/images/cover.jpg",
    
    // TOP GALLERY (Auto-Slideshow)
    // Put your best 3-5 shots here. Videos work too!
    "thumbnails": [
        "/images/shot1.jpg",
        "/images/shot2.jpg",
        "/images/demo-vid.mp4" 
    ]
}
```

---

## 2. The "Super Power" Sections

You can add unlimited sections. Each section supports **Rich Markdown**, **Media Grids/Sliders**, and **Custom Links**.

### Markdown Capabilities
In the `"content"` field, you can use:
- `### Header 3` for section sub-titles.
- `**Bold**` for emphasis.
- `> Blockquotes` for testimonials or key insights (styled with gold border).
- `- Bullet lists` for features or tech stacks.

### Media Capabilities
- **Videos**: Just paste an `.mp4` link in the `images` array. It automagically plays.
- **Grid vs Slider**: Set `"imageStyle": "grid"` for a 2-col grid, or `"slider"` for a carousel.

### Section Links
Add buttons specific to that section (e.g. "Read Case Study", "View Figma").

### Full "Super Section" Example:

```json
{
    "title": "Engineering Architecture",
    "content": "We used **Next.js** for the frontend to ensure SEO dominance.\n\n> \"The fastest load times we've ever seen.\"\n\n### Tech Stack\n- **Database**: Supabase\n- **Auth**: Clerk\n- **Styling**: Tailwind",
    
    "images": [
        "/images/architecture-diagram.png",
        "https://my-bucket.com/demo-video.mp4"
    ],
    "imageStyle": "grid",
    
    "links": [
        {
            "label": "View System Diagram",
            "url": "https://..."
        },
        {
            "label": "Read Source Code",
            "url": "https://github.com/..."
        }
    ]
}
```

## 3. Asset Management
- **Images**: Save to `public/images/`
- **Videos**: Save to `public/videos/` or use external URLs.
