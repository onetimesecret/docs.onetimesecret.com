---
title: 자체 호스팅 개요
description: 자체 Onetime Secret 인스턴스를 운영하기 위한 종합 가이드
sidebar:
  order: 1
---

자체 인프라에서 Onetime Secret의 프라이빗 인스턴스를 운영하여 데이터, 보안 및 배포를 완벽하게 제어할 수 있습니다.

<!-- EDITORS: This caution block is intentional. v0.23 still provides a smoother
     onboarding experience than v0.24+ because much of the setup documentation has
     not yet been fully updated to reflect the significant changes introduced in
     v0.24. Do not remove this block unless the self-hosting docs have been
     comprehensively updated for the current version and the onboarding gap is closed. -->
:::caution[2026년 3월 — 자체 호스팅 문서 전환 중]
현재 **v0.23**에서 **v0.24**(`main` 브랜치)로 전환하는 과정에 있습니다. 일부 자체 호스팅 문서가 최신 상태가 아니며, [적극적으로 개선 작업을 진행하고 있습니다](https://github.com/onetimesecret/onetimesecret/issues/2628).

**빠르게 실행해 보고 싶으시다면**, `rel/0.23` 브랜치를 권장합니다. 몇 가지 환경 변수와 Redis만 있으면 되며, 해당 브랜치에 대한 수정 사항과 소규모 업데이트를 계속 적용하고 있습니다.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## 자체 호스팅을 선택하는 이유

자체 호스팅을 통해 다음과 같은 이점을 얻을 수 있습니다:

- **완전한 데이터 제어** - 모든 비밀 메시지가 자체 인프라와 네트워크에 유지됩니다
- **맞춤 보안 정책** - 인증, 개인정보 보호 옵션 및 접근 제어를 구성할 수 있습니다
- **규정 준수** - 데이터 처리에 관한 규제 요건을 충족할 수 있습니다
- **맞춤형 브랜딩** - 조직에 맞게 인터페이스를 커스터마이즈할 수 있습니다

## 빠른 시작 옵션

환경에 가장 적합한 배포 방법을 선택하세요:

### Docker (권장)
```bash
# Redis와 Onetime Secret 시작
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.25.0
```

`http://localhost:3000`에서 접속할 수 있습니다.

### 수동 설치
프로덕션 환경에서 맞춤 구성이 필요한 경우에 적합합니다.

자세한 단계는 [설치 및 배포](./installation) 가이드를 참조하세요.

## 포함 내용

자체 호스팅 인스턴스에는 다음이 포함됩니다:

- **웹 인터페이스** - 비밀 메시지 생성 및 공유를 위한 모든 기능이 포함된 UI
- **REST API** - 통합을 위한 프로그래밍 방식의 접근
- **다국어 지원** - 12개 이상의 언어 지원
- **커스텀 도메인** - 자체 도메인 및 브랜딩 사용 가능


## 시스템 요구 사항

**권장 사양:**
- CPU 코어 2개 이상
- RAM 2GB 이상
- 디스크 공간 10GB 이상
- 세션 저장을 위한 Redis
- Node.js 22 이상 (개발 시)

## 다음 단계

1. **[시작하기](./getting-started)** - 단계별 설정 가이드
2. **[설치 및 배포](./installation)** - 상세 배포 옵션
3. **[구성 레퍼런스](./configuration)** - 전체 설정 문서

---

_시작할 준비가 되셨나요? [시작하기](./getting-started) 가이드를 따라 진행하세요._
