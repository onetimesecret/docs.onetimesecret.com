---
title: 客户端库
description: 探索 Onetime Secret API 的可用客户端库，包括 Ruby、Python、Perl、Java、C#、Go 等。
---

## Ruby


[Github 页面 onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
作者：[Delano](https://delanotes.com/)（更新于 2024-06-09）

### 使用示例

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret: 'Jazz, jazz and more jazz.',
  recipient: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Github 页面 - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
作者：[slashpass](https://github.com/slashpass)（添加于 2021-07-08）

### 使用示例

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # 返回类似 https://onetimesecret.com/secret/xxxxxxxxxxx 的链接
```

[Github 页面 - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
作者：[Vladislav Stepanov](https://github.com/utter-step/)（添加于 2012-06-26）

### 使用示例

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u"test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[CPAN 上的 Net::OneTimeSecret](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
作者：[Kyle Dawkins](http://www.shoffle.com/)（添加于 2012-01-06）

### 使用示例

```perl
#!/usr/bin/env perl

use Net::OneTimeSecret;

# 注意：请替换为您自己的凭据才能正常使用！
my $customerId  = 'YOUR_EMAIL';
my $testApiKey  = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.',
                   passphrase => 'thepassword',
                   recipient => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $result->{secret_key} );

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf( "%s\n", $secret->{value} );
```

---

## Java


[Github 页面 - onetime-java](https://github.com/mpawlowski/onetime-java)
作者：[Marcin Pawlowski](https://github.com/mpawlowski)（添加于 2014-05-22）

### 使用示例

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

GenerateResponse generateResponse = ots.generate(
                new GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                new RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[Github 页面 - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
作者：[Vladislav Stepanov](https://github.com/utter-step/)（添加于 2014-05-29）

### 使用示例

```csharp
# 您可以在任何兼容 .NET (4.0+) 或 Mono (2.10.8+) 的项目中使用 OneTimeSharp。
using VStepanov.OneTimeSharp;

class Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Hello, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


[Github 页面 - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
作者：[Corbalt](https://github.com/corbaltcode/)（添加于 2021-12-10）

### 使用示例

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Username: "user@example.com",
  Key: "my api key",
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // 处理错误
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // 处理错误
}

// 输出 "the launch codes"
print(secret)
```

### 命令行使用示例

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'what is essential is invisible to the eye'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
what is essential is invisible to the eye

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go（库）


[Github 页面](https://github.com/emdneto/otsgo)
作者：[Emídio Neto](https://github.com/emdneto)（添加于 2024-06-09）

### 使用示例

```go
// 创建新客户端
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// 发送带上下文的请求
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Github 页面 - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
作者：[Craig Gumbley](https://www.helloitscraig.co.uk)（更新于 2017-04-28）

### 使用示例

```powershell
# 从 PowerShell 库安装
Install-Module -Name OneTimeSecret -Scope CurrentUser

# 设置连接信息
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 生成新的共享密钥
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# 获取密钥
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# 查看所有可用函数
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Github 页面 - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
作者：[Eric Engstrom](https://eengstrom.github.io/)（更新于 2018-12-19）

### 脚本 API 使用示例

```bash
# 以匿名方式使用（匿名创建密钥）
source ots.bash

# 或者使用特定的认证凭据
APIUSER="USERNAME"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# 检查服务器状态
ots_status

# 创建密钥并获取 URL
URL=$(echo "secret" | ots_share)

# 通过 HEREDOC 分享多行密钥
URL=$(ots_share <<-EOF
      This is a Secret
      ... on multiple lines
EOF
)

# 向 share 或 generate 传递选项
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# 获取密钥数据
local DATA="$(ots_retrieve "$URL")"

# 分享/生成新密钥，并获取私有元数据密钥
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# 获取最近创建的私有元数据密钥列表
# 注意：这需要有效的认证凭据
local -a RECENT=( $(ots_recent) )

# 检查密钥的当前状态（需提供私有密钥）
ots_state $KEY

# 销毁密钥（需提供私有密钥）
ots_burn $KEY
```

### 命令行使用示例

```bash
# 分享密钥（从标准输入）
./ots share
SECRET
^D

# 分享密钥（通过 HEREDOC）
./ots share <<-EOF
      This is a mulit-line secret via HEREDOC.
      Somthing else goes here.
EOF

# 获取/检索密钥：
./ots get <key|url>
./ots retrieve <key|url>
```

### 命令行使用示例

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
