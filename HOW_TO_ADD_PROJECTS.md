# 📘 How to Add Projects

## 🚀 The Super Easy Way (Just 2 Steps!)

### Step 1: Create your HTML file

Ask any AI (ChatGPT, Claude, etc.) to create a beautiful project page:

```
Create a beautiful single-file HTML landing page for my project called "[YOUR PROJECT NAME]".

Requirements:
- Self-contained (CSS and JS in same file)
- Dark theme with animated gradient background
- Purple/pink or any color scheme you like
- Sections: Hero, Gallery, Content, Footer
- Include these details:
  • Title: [YOUR TITLE]
  • Description: [YOUR DESCRIPTION]  
  • Technologies: [YOUR TAGS]
  • Live link: [YOUR URL]
- Beautiful animations
- Mobile responsive
- "Back to Projects" link pointing to /projects
```

### Step 2: Save the file

Save it to: `public/projects/your-project-name.html`

**That's it!** Visit: `yoursite.com/projects/your-project-name`

---

## 📁 File Location

```
public/
└── projects/
    ├── aimers.html      ← Example project
    ├── reality.html     ← Add your projects here
    └── my-new-app.html  ← Just drop HTML files!
```

---

## 🎨 What You Can Customize

**Everything!** Each HTML file is completely independent:

- ✅ Unique colors and themes
- ✅ Custom animations
- ✅ Any layout you want
- ✅ Embed videos, images, code blocks
- ✅ Add interactive elements
- ✅ Use any CSS framework or vanilla CSS

---

## 📋 Show Project in Listings (Homepage/Projects Page)

To show your project on the homepage and /projects page, add it to:

`public/data/projects_master.json`:

```json
[
    "your-project-name",
    "another-project"
]
```

And create a simple info file at `public/data/projects/your-project-name.json`:

```json
{
    "id": "your-project-name",
    "title": "My Project",
    "description": "Short description for cards",
    "tags": ["React", "AI"],
    "thumbnail": "/images/thumb.jpg"
}
```

---

## 📱 Edit From Anywhere

Since files are in `public/` folder:
- ✅ Edit via GitHub web interface
- ✅ Edit via GitHub mobile app
- ✅ No rebuild needed
- ✅ Changes go live with next deploy

---

## 💡 Pro Tips

1. **Copy existing**: Start by copying `public/projects/aimers.html`
2. **Test locally**: Just refresh browser after saving
3. **Use external images**: `https://...` URLs work fine
4. **Mobile first**: Always test on mobile view
