---
title: 영국(UK)
description: 런던에 위치한 Onetime Secret의 영국 데이터 센터 지역입니다.
---

## 인프라

- **위치**: 영국 런던
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **호스팅 제공업체**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (핀란드 헬싱키)
- **사용자 정의 도메인 CNAME**: `identity.ingress.onetime.co` (애니캐스트)

## 사용자 정의 도메인 DNS

이 지역에 사용자 정의 도메인을 연결하려면 CNAME 레코드를 생성하세요:

| 레코드 유형 | 호스트                  | 값                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

영국 지역은 지역별 하위 도메인이 아닌 애니캐스트 CNAME을 사용한다는 점에 유의하세요.

전체 안내는 [사용자 정의 도메인 설정 가이드](/ko/custom-domains/setup-guide)를 참조하세요.

## 규제 환경

영국의 개인정보 보호 체계는 **영국 일반 데이터 보호 규정(UK GDPR)**과 **2018년 데이터보호법(Data Protection Act 2018)**에 의해 규율됩니다. 브렉시트 이후에도 영국은 EU GDPR과 밀접하게 정렬된 자체 데이터 보호 체계를 유지하고 있습니다.

### 호스팅 제공업체 정보

이 지역은 2011년 설립되어 핀란드 헬싱키에 본사를 둔 유럽 클라우드 인프라 제공업체 <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>에서 호스팅합니다. 주권을 갖춘 유럽 제공업체로서, 계정 관련 데이터는 핀란드 및 EU 데이터 보호 규정에 따라 오직 핀란드에만 저장됩니다. UpCloud는 이 지역을 호스팅하는 런던을 포함해 유럽 여러 지역에서 데이터 센터를 운영하고 있습니다.

### 주요 규제 사항

- 정보위원회(Information Commissioner's Office, ICO)가 독립 감독 기관 역할을 수행합니다
- 영국 GDPR은 정보 주체의 권리 및 적법한 처리 근거 요건 등 EU GDPR의 핵심 원칙과 권리를 그대로 유지합니다
- 영국은 유럽연합 집행위원회로부터 적정성 결정을 받아 EU/EEA로부터의 데이터가 자유롭게 흐를 수 있습니다
- 2018년 데이터보호법은 영국의 법 집행 및 정보기관에 특화된 조항으로 영국 GDPR을 보완합니다

## 이 지역을 고려해야 할 때

- 소속 조직이나 사용자가 주로 영국에 있는 경우
- 영국 GDPR 및 2018년 데이터보호법을 준수해야 하는 경우
- 영국 국내에 데이터를 상주시키고자 하는 경우
- 영국 내 데이터 처리를 요구하는 고객에게 서비스를 제공하는 경우
