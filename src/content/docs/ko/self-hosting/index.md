---
title: 셀프 호스팅 개요
description: 자체 Onetime Secret 인스턴스를 실행하기 위한 완전한 가이드
sidebar:
  order: 1
---

데이터, 보안, 배포에 대한 완전한 제어권을 가지고 자체 Onetime Secret 인스턴스를 실행하세요.

:::caution[2026년 3월 — 셀프 호스팅 문서 전환 중]
현재 **v0.23**에서 **v0.24**(`main` 브랜치)로 전환하는 과정에 있습니다. 일부 셀프 호스팅 문서가 오래되었으며 [개선 작업을 진행 중](https://github.com/onetimesecret/onetimesecret/issues/2628)입니다.

**빠르게 실행해 보고 싶으시다면**, `rel/0.23` 브랜치를 권장합니다. 몇 개의 환경 변수와 Redis만 있으면 되며, 여전히 수정 사항과 소규모 업데이트를 적극적으로 푸시하고 있습니다.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## 셀프 호스팅을 하는 이유

Onetime Secret을 셀프 호스팅하면 다음과 같은 이점이 있습니다:

- **완전한 데이터 제어** - 모든 비밀이 자체 인프라와 네트워크에 유지됩니다
- **사용자 지정 보안 정책** - 인증, 개인정보 보호 옵션 및 접근 제어를 구성합니다
- **규정 준수** - 데이터 처리에 대한 규제 요구 사항을 충족합니다
- **사용자 지정 브랜딩** - 조직에 맞게 인터페이스를 사용자 지정합니다

## 빠른 시작 옵션

환경에 가장 적합한 배포 방법을 선택하세요:

### Docker (권장)
```bash
# Redis와 Onetime Secret 시작
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

`http://localhost:3000`에서 접근할 수 있습니다.

### 수동 설치
사용자 지정 구성이 필요한 프로덕션 환경에 적합합니다.

자세한 단계는 [설치 및 배포](./installation) 가이드를 참조하세요.

## 포함된 기능

셀프 호스팅 인스턴스에는 다음이 포함됩니다:

- **웹 인터페이스** - 비밀 생성 및 공유를 위한 완전한 기능의 UI
- **REST API** - 통합을 위한 프로그래밍 방식의 접근
- **다국어 지원** - 12개 이상의 언어로 제공
- **사용자 지정 도메인** - 자체 도메인 및 브랜딩 사용


## 시스템 요구 사항

**권장:**
- 2개 이상의 CPU 코어
- 2GB 이상의 RAM
- 10GB 이상의 디스크 공간
- 세션 저장을 위한 Redis
- Node.js 22+ (개발용)

## 다음 단계

1. **[시작하기](./getting-started)** - 단계별 설정 가이드
2. **[설치 및 배포](./installation)** - 상세 배포 옵션
3. **[구성 참조](./configuration)** - 전체 설정 문서

---

_시작할 준비가 되셨습니까? [시작하기](./getting-started) 가이드를 따라주세요._
