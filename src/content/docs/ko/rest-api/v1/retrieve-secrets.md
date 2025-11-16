---
title: 비밀 검색
description: 인증된 액세스 및 익명 액세스를 모두 지원하는 Onetime Secret REST API를 사용하여 비밀을 검색하는 방법을 알아보세요.
---

_업데이트 2025-04-02_

:::참고
**데이터 로캘 및 지역 선택**
- 지역](/ko/regions/) 선택(예: [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) 데이터 센터.
- 데이터 주권, 지연 시간 및 규정 준수 요구 사항과 같은 요소를 고려합니다.
- 참고: 기본 `onetimesecret.com`은 계속 운영되며 이 기능은 향후 사용되지 않을 수 있으므로 특정 로케이션을 사용하여 활성 데이터 센터로 라우팅하는 것이 좋습니다.
:::

## 비밀 검색

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### 인증된 요청

```bash
curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

익명 요청 ### 익명 요청

```bash
curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### 쿼리 매개변수

- 비밀키**: 이 비밀의 고유 키입니다.
- 패스프레이즈**(필요한 경우): 비밀번호를 사용하여 비밀번호를 만든 경우에만 비밀번호가 필요합니다.

### 속성

- 비밀키**: 생성한 비밀의 고유 키입니다. 이 키는 공유할 수 있는 키입니다.
- **값**: 실제 비밀입니다. 말할 필요도 없지만, 이 키는 한 번만 사용할 수 있습니다.

## 메타데이터 검색

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

모든 비밀에는 관련 메타데이터도 있습니다. 메타데이터는 시크릿을 만든 사람(즉, 받는 사람이 아닌)이 사용하도록 되어 있으며 일반적으로 비공개로 유지되어야 합니다. 메타데이터 키는 비밀 키와 다르므로 메타데이터 키를 사용하여 비밀 자체에 대한 기본 정보(예: 열람 여부 또는 열람 시기)를 안전하게 검색할 수 있습니다.

### 인증된 요청

```bash
curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### 쿼리 매개변수

- 메타데이터_키**: 이 메타데이터의 고유 키입니다.

### 속성

- 커스티드**: 비밀을 만든 계정의 사용자 아이디입니다. 익명 요청의 경우 이 값은 `anon`이 됩니다.
- 메타데이터\_키**: 메타데이터의 고유 키입니다. 공유하지 마세요.
- **비밀\_키**: 생성한 비밀의 고유 키입니다. 공유할 수 있는 키입니다.
- TTL**: 지정한 유효 기간(즉, 남은 시간이 아님)입니다.
- 메타데이터\_ttl**: 메타데이터의 남은 유효기간(초)입니다.
- SECRET\_TTL**: 시크릿의 유효 기간이 남은 시간(초)입니다.
- 수신자**: 수신자를 지정한 경우, 이메일 주소의 난독화된 버전입니다.
- 생성**: 메타데이터가 생성된 시간(유닉스 시간(UTC))입니다.
- updated**: 동일하지만 마지막으로 업데이트된 시간입니다.
- **받은**: 시크릿을 수신한 시간.
- 암호문구\_필요**: 시크릿을 만들 때 비밀번호를 제공했다면 이 값은 참입니다. 그렇지 않으면 거짓입니다.


## 비밀을 태우다

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

아직 읽지 않은 비밀을 소각하세요.

### 인증된 요청

```bash
curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### 쿼리 매개변수

- 없음

### 속성

- 소각된 상태의 메타데이터 속성과 동일합니다.

## 최근 메타데이터 검색

**GET https://onetimesecret.com/api/v1/private/recent**

최근 메타데이터 목록을 검색합니다.

### 인증된 요청

```bash
curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### 쿼리 매개변수

- 없음

### 속성

- 메타데이터 속성과 동일하지만 목록과 비밀 키 값은 항상 null입니다.

::: 경고 인증 필요
참고: 메타데이터 및 관리 작업(메타데이터 검색, 비밀 굽기, 최근 메타데이터)은 인증된 사용자만 사용할 수 있습니다.
:::
