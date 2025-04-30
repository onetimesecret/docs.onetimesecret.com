---
title: 클라이언트 라이브러리
description: 루비, 파이썬, 펄, 자바, C#, Go 등을 포함하여 Onetime Secret API에 사용할 수 있는 클라이언트 라이브러리를 살펴보세요.
---

## 루비


[깃허브 페이지 온타임루비](https://github.com/onetimesecret/onetime-ruby)
작성자: [Delano](https://delanotes.com/) (2024-06-09 업데이트)

### 사용 예

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret: '재즈, 재즈 그리고 더 많은 재즈',
  recipient: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## 파이썬


[깃허브 페이지 - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
by [slashpass](https://github.com/slashpass) (2021-07-08 추가)

### 사용 예

```python
에서 원타임시크릿을 가져옵니다.

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # https://onetimesecret.com/secret/xxxxxxxxxxx 같은 링크를 반환합니다.
```

[깃허브 페이지 - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
블라디슬라프 스테파노프](https://github.com/utter-step/) (2012-06-26 추가)

### 사용 예

```python
에서 원타임시크릿을 가져옵니다.

o = 원타임시크릿("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u"test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[CPAN의 넷::원타임시크릿](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
카일 도킨스](http://www.shoffle.com/) (2012-01-06 추가)

### 사용 예

```perl
#!/usr/bin/env perl

Net::OneTimeSecret을 사용합니다;

# 참고: 이 기능이 작동하려면 이 값을 사용자 이름으로 바꿔야 합니다!
내 $customerId = 'YOUR_EMAIL';
내 $testApiKey = 'YOUR_OTS_APIKEY';

내 $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
내 $result = $api->shareSecret( '재즈, 재즈, 더 재즈.',
                   passphrase => 'thepassword',
                   수신자 => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $result->{secret_key} );

내 $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf( "%s\n", $secret->{value} );
```

---

## Java


[깃허브 페이지 - onetime-java](https://github.com/mpawlowski/onetime-java)
Marcin Pawlowski](https://github.com/mpawlowski)(2014-05-22 추가)

### 사용 예

```java
원타임시크릿 ots = 새로운 원타임시크릿레스트임플(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

생성 응답 생성 응답 = ots.generate(
                새로운 GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                새로운 RetrieveRequest.빌더()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[깃허브 페이지 - 원타임샤프](https://github.com/utter-step/OneTimeSharp)
블라디슬라프 스테파노프](https://github.com/utter-step/)(2014-05-29 추가)

### 사용 예

```csharp
# .NET(4.0+) 또는 Mono(2.10.8+)와 호환되는 모든 프로젝트에서 OneTimeSharp를 사용할 수 있습니다.
VStepanov.OneTimeSharp를 사용합니다;

Test 클래스
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*)

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("안녕하세요, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


[깃허브 페이지-온타임시크릿](https://github.com/corbaltcode/go-onetimesecret)
코발트](https://github.com/corbaltcode/)(2021-12-10 추가)

### 사용 예

```go
ots "github.com/corbaltcode/go-onetimesecret" 가져오기

client := ots.Client{
  사용자 이름: "user@example.com",
  Key: "내 API 키",
}

메타데이터, err := client.Put("실행 코드", "패스프레이즈", 0, "")
if err != nil {
  // 오류 처리
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // 오류 처리
}

// "실행 코드"를 출력합니다.
print(secret)
```

CLI로 ### 사용 예시

```bash
$ go 설치 github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

'필수적인 것은 눈에 보이지 않는다'라는 문구
HDJK6P0OZF61O7N6PBAXY4IN8ZUQ7SM IFIPVDPEO8OY6R8RYJBU8Y7RHM9KTY9

OTS GET HDJK6P0OZF61O7N6PBAXY4IN8ZUQ7SM
필수적인 것은 눈에 보이지 않습니다.

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

OTS BURN FLSDLAUN6HWCQU9UTMC0VTS5XJ9XU1
FLSDLAUN6HWCQU9UTMC0VTS5XJ9XU1
```

---


## Go (라이브러리)


[깃허브 페이지](https://github.com/emdneto/otsgo)
에미디오 네토](https://github.com/emdneto) (2024-06-09 추가)

### 사용 예

```go
// 새 클라이언트 빌드
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// 컨텍스트와 함께 요청 보내기
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(응답.상태)
```

---

## PowerShell


[깃허브 페이지 - 원타임시크릿](https://github.com/chelnak/OneTimeSecret)
크레이그 검블리](https://www.helloitscraig.co.uk) (업데이트 2017-04-28)

### 사용 예

```powershell
# PowerShell 갤러리에서 설치
Install-Module -Name OneTimeSecret -Scope CurrentUser

# 연결 정보 설정
Set-OTSAuthorizationToken -사용자 이름 user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 새 공유 비밀 생성
New-OTSSharedSecret -비밀 "매우 비밀" -암호 1234 -수신자 user@mail.com

# 비밀 검색
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# 사용 가능한 모든 함수 보기
Get-Command -Module OneTimeSecret | 이름 선택
```

---

## Bash


[깃허브 페이지 - 원타임시크릿 배쉬](https://github.com/eengstrom/onetimesecret-bash)
에릭 엥스트롬](https://eengstrom.github.io/) (2018-12-19 업데이트)

### 스크립팅 API로 사용 예시

```bash
# 익명으로 사용하기 위한 소스(익명으로 생성된 비밀)
소스 ots.bash

# 또는, 특정 인증 자격 증명이 있는 소스
apiuser="사용자 아이디"
apikey="apikey"
source ots.bash -u $APIUSER -k $APIKEY

# 서버 상태 확인
ots_status

# 시크릿을 만들고 URL을 다시 가져옵니다.
URL=$(echo "secret" | ots_share)

# HEREDOC을 통해 여러 줄의 비밀을 공유합니다.
URL=$(ots_share <<-EOF
      이것은 시크릿입니다
      ... 여러 줄에 걸쳐
EOF
)

# 공유 또는 생성할 옵션을 전달합니다.
URL=$(ots_share ttl=600 \.
                  패스프레이즈="공유-비밀" \.
                  recipient="someone@somewhere.com" <<< "SECRET")

# 비밀 데이터 가져오기
local DATA="$(ots_retrieve "$URL")"

# 새 시크릿을 공유/생성하고 비공개 메타데이터 키를 다시 가져옵니다.
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# 최근에 생성된 비공개 메타데이터 키 목록을 가져옵니다.
# 유효한 인증 자격 증명이 필요합니다.
local -a RECENT=( $(ots_recent) )

# 개인키가 주어졌을 때 비밀의 현재 상태를 확인합니다.
ots_state $KEY

개인 키가 주어지면 # 비밀을 소각합니다.
ots_burn $KEY
```

CLI로 ### 사용 예시

```bash
# 비밀 공유(에서
./ots 공유
SECRET
^D

# 비밀 공유(HEREDOC을 통해)
./ots 공유 <<-EOF
      이것은 HEREDOC을 통한 다중 줄 비밀입니다.
      여기에 다른 것이 있습니다.
EOF

# 비밀을 가져오거나 검색합니다:
./ots get <키|url>
./ots 검색 <키|URL>

CLI로 ### 사용 예시

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
FLSDLAUN6HWCQU9UTMC0VTS5XJ9XU1
```
