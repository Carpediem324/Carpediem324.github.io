# Carpediem324.github.io

Personal portfolio site for GitHub Pages.

## Project Data

This site is fully static. Project cards are defined in `assets/js/app.js` and rendered on `projects.html`.

GitHub Pages does not provide a shared database or server runtime. To add, edit, or remove projects, update the `PROJECTS` array in `assets/js/app.js` and deploy the commit.

Project images use fixed file paths in `assets/js/app.js`. Add matching files under `assets/images/projects/`, for example:

```txt
assets/images/projects/robocop.jpg
assets/images/projects/creative-mobility-2023.jpg
```

If an image file is missing, the site shows a polished placeholder instead of a broken image.

## Weather Background

The site uses the browser location API when available and falls back to Gwangju coordinates. Weather is fetched from Open-Meteo without an API key and mapped to clear, rain, snow, or cloudy visual states.

## Checks

```bash
npm test
```

The test suite checks JavaScript syntax, theme switching, language switching, and project-card rendering in Chrome through Playwright.
