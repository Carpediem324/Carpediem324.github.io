# Carpediem324.github.io

Personal portfolio site for GitHub Pages.

## Directory Structure

```txt
src/
  App.jsx
  data.js
  main.jsx
  styles.css
public/
  assets/
    images/
scripts/
  smoke-test.cjs
  sync-pages-build.cjs
tests/
package.json
vite.config.js
playwright.config.js
```

`src/App.jsx` contains the React views and interaction logic. `src/data.js` contains portfolio content. `src/main.jsx` is only the React entrypoint. `public/` contains source static assets that Vite copies into the final build.

The single root `index.html` supports both local Vite development and GitHub Pages root hosting. The repository also keeps root `assets/app.js` and `assets/app.css` because the current GitHub Pages source serves the repository root. Run `npm run build` before committing changes that affect the app or assets.

## Project Data

This site is a React single-page portfolio. Project cards are defined in `src/data.js` and rendered by React components in `src/App.jsx`.

GitHub Pages does not provide a shared database or server runtime. To add, edit, or remove projects, update the `projects` array in `src/data.js`, run `npm run build`, and deploy the commit.

Project images use fixed file paths in `src/data.js`. Add matching files under `public/assets/images/projects/`, for example:

```txt
public/assets/images/projects/robocop.jpg
public/assets/images/projects/creative-mobility-2023.jpg
```

If an image file is missing, the site shows a polished placeholder instead of a broken image.

## Checks

```bash
npm test
```

The default test suite builds the Vite app and runs deterministic smoke checks in Chrome. The original Playwright test runner specs remain available with:

```bash
npm run test:smoke:pw
```
