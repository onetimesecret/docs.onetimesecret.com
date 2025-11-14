---
title: 비밀 만들기
description: 인증 및 익명 사용을 모두 지원하는 Onetime Secret REST API를 사용하여 비밀을 만들고 검색하는 방법을 알아보세요.
---

_업데이트 2025-04-02_

:::참고
**데이터 로캘 및 지역 선택**
- 미국([`us.onetimesecret.com`](https://us.onetimesecret.com/)), 유럽([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), 캐나다([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)), 또는 뉴질랜드([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) 데이터 센터 중에서 선택합니다.
- 데이터 주권, 지연 시간 및 규정 준수 요구 사항과 같은 요소를 고려합니다.
- 참고: 기본 `onetimesecret.com`은 계속 작동하며 활성 데이터 센터로 라우팅되며, 이 기능은 향후 사용되지 않을 수 있으므로 특정 로케이션을 사용하는 것이 좋습니다.
:::


## 비밀 만들기

`POST https://REGION.onetimesecret.com/api/v1/share`

이 엔드포인트를 사용하여 비밀 값을 저장하고 일회성 사용 링크를 생성합니다.


### 인증된 요청

```bash
curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

익명 요청 ### 익명 요청

```bash
curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### 쿼리 매개변수

- 비밀**: 저장되기 전에 암호화되는 비밀 값입니다. 적용되는 요금제에 따라 최대 길이가 정해져 있습니다(1k-10k).
- 접근 문구**: 수신자가 비밀 메시지를 보기 위해 알아야 하는 문자열입니다. 이 값은 또한 비밀 메시지를 암호화하는 데 사용되며 저장되기 전에 암호화되므로 전송 시에는 이 값만 보유합니다.
- TTL**: 비밀 메시지가 보존되어야 하는 최대 시간(초 단위)입니다(즉, 생존 시간). 이 시간이 만료되면 비밀 메시지는 삭제되며 복구할 수 없습니다.
- 받는 사람**: 이메일 주소입니다. 시크릿 링크가 포함된 친근한 이메일을 보내드립니다(시크릿 자체는 아님).
- 공유_도메인**: 시크릿 링크를 생성할 때 사용할 사용자 지정 도메인입니다. 제공하지 않으면 기본 도메인이 사용됩니다(예: eu.onetimesecret.com).

### 속성

- 커스티드**: 비밀을 만든 계정의 사용자 아이디입니다. 익명 요청의 경우 이 값은 `anon`이 됩니다.
- 메타데이터\_키**: 메타데이터의 고유 키입니다. 공유하지 마세요.
- **비밀\_키**: 생성한 비밀의 고유 키입니다. 공유할 수 있는 키입니다.
- TTL**: 지정한 유효기간(초 단위)(즉, 남은 시간이 아님)입니다.
- 메타데이터\_ttl**: 메타데이터의 남은 유효 기간(초)입니다.
- SECRET\_TTL**: 시크릿의 유효 기간이 남은 시간(초)입니다.
- 수신자**: 수신자를 지정한 경우, 이메일 주소의 난독화된 버전입니다.
- 생성된**: 유닉스 시간(UTC)으로 비밀이 생성된 시간입니다.
- 업데이트됨**: 마찬가지로 마지막으로 업데이트된 시간입니다.
- 접근\_문구\_필요**: 비밀 메시지를 만들 때 접근 문구가 제공되었다면 참이 됩니다. 그렇지 않으면 당연히 거짓입니다.
- **공유_도메인**: 시크릿 링크를 생성할 때 사용할 사용자 지정 도메인입니다. 그렇지 않으면 "".


### 응답 예시:

```json
{
  "custid":"사용자명",
  "metadata_key":"qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## 비밀 생성

`POST https://REGION.onetimesecret.com/api/v1/generate`

짧고 고유한 비밀 메시지를 생성하세요. 임시 비밀 메시지, 원타임 패드, 솔트 등에 유용합니다.

### 인증된 요청

```bash
curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

익명 요청 ### 익명 요청

```bash
curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


```json
{
  "custid":"USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key":"2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key":"pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### 속성

위의 '비밀 공유'와 동일하지만 '값' 필드가 추가됩니다.
