# Carpediem324.github.io

Personal portfolio site for GitHub Pages.

## Project Data

This site is fully static. Project cards are defined in `assets/js/app.js` and rendered on `projects.html`.

GitHub Pages does not provide a shared database or server runtime. To add, edit, or remove projects, update the `SAMPLE_PROJECTS` array in `assets/js/app.js` and deploy the commit.

## Checks

```bash
npm test
```

The test suite checks JavaScript syntax, theme switching, language switching, and project-card rendering in Chrome through Playwright.
