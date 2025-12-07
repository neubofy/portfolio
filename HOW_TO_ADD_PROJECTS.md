# How to Add a New Project

1. **Add Project Image**:
   - Save your project image/screenshot in the `public/images` folder.
   - Example: `public/images/my-new-project.jpg`

2. **Update Data**:
   - Open `public/data/projects.json` (or `src/data/projects.json`).
   - Add a new entry to the list following this format:
     ```json
     {
       "id": "3",  // Unique ID
       "title": "My New Project",
       "description": "Short description of the project...",
       "tags": ["React", "AI", "Tool"],
       "liveLink": "https://link-to-project.com",
       "image": "/images/my-new-project.jpg",
       "thumbnails": ["/images/screen1.jpg", "/images/screen2.jpg"] // Optional gallery
     }
     ```

3. **Save**:
   - Save the file. The website will automatically update if running locally.
   - For production, redeploy (commit and push to GitHub).
