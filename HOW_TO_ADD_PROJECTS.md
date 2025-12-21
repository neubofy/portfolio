# 📘 How to Add or Manage Projects

This portfolio uses a flexible, file-based content management system. Each project is a standalone JSON file, giving you granular control over the layout, media, and content without touching the code.

---

## 🚀 Quick Start in 3 Steps

1.  **Create**: Add a new `.json` file in `public/data/projects/` (e.g., `my-super-app.json`).
2.  **Populate**: Copy the [Master Template](#master-template) below and fill in your data.
3.  **Register**: Add your filename (e.g., "my-super-app") to `public/data/projects_master.json`.

---

## 💎 Master Template (Full Capabilities)

Copy this JSON structure to use **every feature** available in the system.

```json
{
  "id": "my-project-id",
  "title": "Project Title",
  "description": "A compelling 1-2 sentence description for the home page card.",
  "tags": ["React", "AI", "Design", "Automation"],
  "liveLink": "https://neubofy.bar",
  "thumbnail": "/images/card-thumbnail.jpg",
  "heroImage": "/images/hero-banner.jpg",
  "gallery": [
    "/images/screenshot-1.jpg",
    "/images/demo-video.mp4",
    "https://external-site.com/image.png"
  ],
  "sections": [
    {
      "title": "Overview",
      "content": "Write **Markdown** here! You can use lists, code blocks, and *styles*.",
      "images": ["/images/detail-1.jpg", "/images/detail-2.jpg"],
      "imageStyle": "grid",
      "links": [
        { "label": "Read Case Study", "url": "https://medium.com/..." }
      ]
    }
  ]
}
```

---

## 🧩 Field Reference & Capabilities

### Core Metadata
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | Unique identifier. Should match the filename (e.g., `"photo-editor"`). |
| `title` | `string` | **Yes** | The main headline of the project. |
| `description` | `string` | **Yes** | Short summary shown on the home page card. |
| `tags` | `array` | **Yes** | List of technologies (e.g., `["Next.js", "AI"]`). Max 4 recommended. |
| `liveLink` | `string` | No | URL to the live project. Adds a "Live" button. |

### Visual Assets
| Field | Type | Description | Capabilities |
| :--- | :--- | :--- | :--- |
| `thumbnail` | `string` | Image shown on the Home Page card. | Supports JPG, PNG, WEBP, GIF. |
| `heroImage` | `string` | Large banner image at the top of the Case Study page. | Supports standard images. |
| `gallery` | `array` | Top carousel of highlights. | **Supports Videos!** (`.mp4`, `.webm`). Put essential visuals here. |

### Content Sections
The `sections` array allows you to tell a story. You can add as many sections as you want.

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Section heading (e.g., "The Problem", "Architecture"). Optional. |
| `content` | `markdown` | The body text. Supports rich Markdown formatting (see below). |
| `images` | `array` | List of images/videos specific to this section. |
| `imageStyle` | `string` | Layout mode for the images: <br>• `"grid"`: Good for screenshots (2-3 columns). <br>• `"slider"`: Good for many mobile screens or swipeable galleries. |
| `links` | `array` | External links relevant to this section (e.g., "See Figma", "View Code"). |

#### Markdown Capabilities in `content`
You can write rich text inside the `content` string:
*   **Bold/Italic**: `**text**`, `*text*`
*   **Lists**: `- Item 1` or `1. Item 1`
*   **Headings**: `### Subheading`
*   **Quotes**: `> This is a quote`
*   **Code**: \`console.log('Hello')\`

---

## 📁 File Management
*   **Location**: All project JSON files live in `public/data/projects/`.
*   **Images**: Store local images in `public/images/`. You can also use absolute URLs (`https://...`).
*   **Ordering**: The order in `public/data/projects_master.json` determines the order on the website.
*   **Top 3**: The first 3 projects in the master list appear on the Home Page.

---

## ⚡ Pro Tips
*   **Videos**: If you add a URL ending in `.mp4` into `gallery` or `sections.images`, it will automatically render as an autoplaying, muted loop video.
*   **Mix & Match**: You can mix images and videos in the same gallery.
*   **Empty Sections**: You can have a section with just images (leave `content` empty) or just text (no `images`).
