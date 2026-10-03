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
SECURITY.md
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

## Security

This is a static GitHub Pages site with no server-side secrets. The deployment uses a CSP in `index.html`, validated external links, and no inline scripts. Before deploying, run:

```bash
npm.cmd audit --audit-level=moderate
npm.cmd test
```

See `SECURITY.md` for the full checklist.

## GoatCounter 방문 통계

### 설정

1. [GoatCounter](https://www.goatcounter.com/)에 가입하고 이 사이트용 사이트를 생성합니다.
2. `src/analytics.js`의 `YOUR_GOATCOUNTER_CODE`를 가입한 사이트 코드로 바꿉니다.
   예를 들어 주소가 `https://example.goatcounter.com`이면 `example`만 입력합니다.
   서버 환경변수나 API 토큰은 필요하지 않습니다. 코드 변경 후 다시 빌드합니다.
3. GoatCounter 사이트 설정에서 **Allow adding visitor counts on your website**를 켭니다.
   Dashboard는 비공개로 유지합니다. 이 옵션은 경로별 숫자 조회를 공개하므로,
   다른 사람이 공개 counter URL로 각 경로의 방문 수를 조회할 수는 있습니다.
4. **Settings → Data collection → Sessions**를 활성화한 상태로 유지합니다.
   브라우저/OS, 화면 크기, 국가, referrer 등 필요한 수집 항목도 활성화합니다.
5. 날짜 비교를 위해 Dashboard의 표시 시간대를 **UTC**로 맞춥니다.
   이 위젯의 TODAY는 UTC 날짜 기준이며 한국 시간으로 오전 9시에 날짜가 바뀝니다.

### 숫자의 정확한 의미

- **TODAY**: `/` 경로의 오늘(UTC) 00:00부터 현재까지 방문 수. 공개 JSON counter에
  `start=YYYY-MM-DD`를 전달하고 `end`는 생략합니다.
- **TOTAL**: `/` 경로의 전체 보관 기간 누적 방문 수. 기존 수집 데이터가 있으면 포함되며,
  GoatCounter 사용 전 방문은 소급 집계되지 않습니다.
- 두 값 모두 공개 counter 응답의 `count`를 사용합니다. Sessions가 켜져 있으면
  같은 세션에서 같은 경로의 새로고침/재방문은 중복 제외됩니다. 약 8시간의 세션 구분을
  사용하므로 평생 중복 제거된 사람 수나 엄밀한 일별 unique person 수가 아닙니다.
  세션이 바뀌거나 기기/네트워크가 바뀌면 다시 집계될 수 있습니다.
- 현재 앱은 항상 홈에서 시작하므로 `/`를 사이트 방문의 기준으로 사용합니다.
  프로필과 프로젝트 탭은 각각 `/profile`, `/projects`라는 가상 경로로 전송합니다.
  테마/언어 변경은 전송하지 않습니다. 향후 직접 진입하는 라우트를 추가하면 이 기준을
  재검토해야 합니다. 여러 경로의 방문 수를 더하면 같은 방문자가 중복되므로 합산하지 않습니다.
- 페이지뷰는 매 로드/탭 진입, 방문 수는 세션별 경로 중복을 제외한 값입니다.
  Dashboard에서 일별/경로별 방문량, 유입 경로, 브라우저, OS, 화면 크기 기반 기기 정보,
  국가 등 수집한 상세 통계를 확인합니다. 원시 페이지뷰가 필요하면 GoatCounter export를
  사용할 수 있습니다. Dashboard 전체 경로 합계와 이 위젯의 `/` 값은 다를 수 있습니다.
- 첫 방문 처리와 서버 캐시 때문에 즉시 증가하지 않을 수 있습니다. 공개 카운터의 현재
  서버 구현은 약 4시간 캐시를 사용하므로 Dashboard보다 수 시간 늦을 수 있으며 실시간 수치가 아닙니다.
  위젯은 표시 중인 탭에서
  60초마다 다시 조회합니다. 미설정, 차단, 시간 초과, 비정상 응답, 아직 없는 경로(404)는
  `--`로 표시하고 실제 0 응답은 `0`으로 표시합니다.

### 로컬 확인

```bash
npm run build
npm run dev
npm test
npm run test:smoke:pw
```

현재 로컬 HTML은 빌드된 `/assets/app.js`를 참조하므로 소스 변경 후 `npm run build`가
필요합니다. 별도 lint 명령은 없으며 `check:js`는 빌드를 실행합니다.
placeholder 상태에서는 GoatCounter 네트워크 요청 없이 `--`가 표시됩니다.
설정 후 로컬에서도 공개 숫자는 조회하지만 localhost/127.0.0.1/::1의 방문은 수집하지 않습니다.
실제 수집은 배포 사이트에서 확인합니다. PC 1520px 이상은 우측 하단 여백에 카드가 고정되고,
그보다 좁은 PC와 모바일에서는 콘텐츠 아래에 작은 가로 카드로 표시됩니다.
라이트/다크 모드 및 한국어/영어 접근성 문구도 지원합니다.

### 배포 후 확인

1. 설정 변경과 빌드 결과(`assets/app.js`, `assets/app.css`)를 함께 커밋해 배포합니다.
   현재 GitHub Actions workflow는 빌드 후 `dist/`를 배포하며, 루트 호스팅도 지원합니다.
2. 광고 차단 확장 기능이 없는 일반 브라우저로 사이트를 열고 개발자 도구 Network에서
   `gc.zgo.at/count.js`, 사이트의 `/count`, `/counter/%2F.json` 요청을 확인합니다.
   TODAY 요청에는 `start`가 있어야 합니다. CSP 또는 CORS 오류가 없어야 합니다.
3. 수집 처리 후 비공개 Dashboard의 `/`를 확인하고 탭 이동 후 `/profile`, `/projects`도 확인합니다.
   같은 세션에서 반복 새로고침한 방문이 매번 증가하지 않는지 확인합니다.
4. 공개 카운터 캐시 갱신 후 Dashboard의 UTC 오늘 `/` 값과 TODAY, 전체 기간 `/` 값과 TOTAL을 비교합니다.
   통계를 차단하거나 offline으로 전환한 뒤 새로고침해도 사이트 탐색과 테마 전환은 동작해야 합니다.
5. `--`가 계속되면 사이트 코드, 공개 카운터 허용 옵션, 첫 방문 처리 여부와 요청 응답을 확인합니다.

외부 스크립트는 비동기로 로드하고 조회는 8초 후 중단합니다. API 토큰, 자체 백엔드,
새 라이브러리는 사용하지 않습니다. CSP는 `gc.zgo.at` 스크립트와 `*.goatcounter.com`
통계 요청/추적 이미지에만 추가 허용합니다. 외부 유입 정보는 브라우저가 제공하는
`document.referrer` 범위 내에서 전송되며 발신 사이트 정책에 따라 비어 있을 수 있습니다.

참고: [공개 카운터](https://www.goatcounter.com/help/visitor-counter),
[세션과 방문 수](https://www.goatcounter.com/help/sessions),
[SPA 집계](https://www.goatcounter.com/help/spa), [CSP](https://www.goatcounter.com/help/csp).
