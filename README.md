# Carpediem324.github.io

Personal portfolio site for GitHub Pages.

## Directory Structure

```txt
src/
  main.jsx
  styles.css
public/
  assets/
    images/
tests/
package.json
vite.config.js
playwright.config.js
```

`src/` contains the React application. `public/` contains static assets that Vite copies into the final build. GitHub Pages deploys the generated `dist/` directory through GitHub Actions.

## Project Data

This site is a React single-page portfolio. Project cards are defined in `src/main.jsx` and rendered by React components.

GitHub Pages does not provide a shared database or server runtime. To add, edit, or remove projects, update the `projects` array in `src/main.jsx` and deploy the commit.

Project images use fixed file paths in `src/main.jsx`. Add matching files under `public/assets/images/projects/`, for example:

```txt
public/assets/images/projects/robocop.jpg
public/assets/images/projects/creative-mobility-2023.jpg
```

If an image file is missing, the site shows a polished placeholder instead of a broken image.

## Checks

```bash
npm test
```

The test suite builds the Vite app and checks theme switching, profile rendering, and project-card rendering in Chrome through Playwright.
