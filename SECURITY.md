# 보안 안내

이 저장소는 정적 GitHub Pages 포트폴리오 사이트입니다. 서버 런타임,
데이터베이스, 로그인/인증 흐름, 쿠키, 클라이언트 API 키를 사용하지 않습니다.

## 현재 적용된 보호 조치

- 배포된 사이트는 비밀값을 필요로 하지 않습니다.
- `index.html`에 Content Security Policy를 적용해 인라인 스크립트,
  플러그인/object 임베드, frame, form 제출, 예상하지 않은 네트워크 연결을
  차단합니다.
- 외부 링크는 React에서 검증한 뒤 클릭 가능한 링크로 렌더링합니다.
- 외부 링크는 `rel="noopener noreferrer"`와 `referrerPolicy="no-referrer"`를
  적용해 새 탭 공격과 referrer 노출을 줄입니다.
- 의존성 취약점은 `npm.cmd audit --audit-level=moderate`로 확인합니다.
- 배포되는 GitHub Pages 소스는 정적 파일만 포함합니다.

## 배포 전 확인

배포 커밋을 push하기 전에 아래 명령을 실행합니다.

```bash
npm.cmd audit --audit-level=moderate
npm.cmd test
```

실수로 비밀값이 커밋되지 않았는지도 확인합니다.

```bash
rg -n -i "api[_-]?key|secret|token|password|private|sk-|ghp_|github_pat_|AIza" .
```

## GitHub 계정 보안 강화

GitHub Pages 보안은 GitHub 계정과 저장소 설정에도 영향을 받습니다.

- GitHub 계정에 2단계 인증(2FA)을 활성화합니다.
- `.env`, 개인 키, 서비스 계정 파일, API 토큰을 커밋하지 않습니다.
- 토큰을 사용해야 한다면 필요한 최소 권한만 가진 fine-grained token을 사용합니다.
- 저장소 collaborator는 신뢰할 수 있는 계정으로만 제한합니다.
- 나중에 GitHub Pages 커스텀 도메인을 추가하면 DNS 설정도 함께 점검합니다.
