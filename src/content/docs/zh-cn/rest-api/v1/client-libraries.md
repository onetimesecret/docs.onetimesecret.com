---
标题客户图书馆
description：探索可用于 Onetime Secret API 的客户端库，包括 Ruby、Python、Perl、Java、C#、Go 等。
---

## Ruby


[Github页面 onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
作者：[德拉诺](https://delanotes.com/) （更新日期：2024-06-09）

#### 使用示例

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
选项 = {
  秘密：'爵士、爵士、更多爵士'、
  recipient: 'example@onetimesecret.com'、
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Github页面 - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
由 [slashpass](https://github.com/slashpass) (2021-07-08 添加)

#### 使用示例

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # 返回类似 https://onetimesecret.com/secret/xxxxxxxxxxx 的链接
```

[Github页面 - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
由 [Vladislav Stepanov](https://github.com/utter-step/) (2012-06-26 添加)

#### 使用示例

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u "test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65'、
# u'value': u'test'}
```

---

## Perl


[CPAN上的Net::OneTimeSecret](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
作者：[Kyle Dawkins](http://www.shoffle.com/)（添加时间：2012-01-06）

#### 使用示例

``perl
#!/usr/bin/env perl

使用 Net::OneTimeSecret；

# 注意：将这些内容替换为您的内容，这样才能正常工作！
my $customerId = 'YOUR_EMAIL'；
my $testApiKey = 'YOUR_OTS_APIKEY'；

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey )；
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.'、
                   密码 => 'thepassword'、
                   recipient => 'kyle@shoffle.com'、
                   ttl => 7200、
                 );
printf( "%s\n", $result->{secret_key} )；

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" )；
printf( "%s\n", $secret->{value} )；
```

---

## Java


[Github页面 - onetime-java](https://github.com/mpawlowski/onetime-java)
作者：[Marcin Pawlowski](https://github.com/mpawlowski) （2014-05-22 添加）

#### 使用示例

Java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance"、
    "ots-username"、
    "ots-apikey")；

GenerateResponse generateResponse = ots.generate(
                new GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build())；

RetrieveResponse retrieveResponse = ots.retrieve(
                新的 RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build())；

assertEquals(generateResponse.getValue(), retrieveResponse.getValue())；
```

---

## C#


[Github页面 - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
作者：[弗拉迪斯拉夫-斯捷潘诺夫](https://github.com/utter-step/) (添加时间：2014-05-29)

#### 使用示例

```csharp
# 您可以在任何兼容 .NET (4.0+) 或 Mono (2.10.8+) 的项目中使用 OneTimeSharp。
使用 VStepanov.OneTimeSharp；

类测试
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")；

        var generated = ots.GenerateSecret()；

        Console.WriteLine(generated.Value); // LR*?

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Hello, OTS!")；

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


[Github页面 - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
作者：[Corbalt](https://github.com/corbaltcode/) (添加时间：2021-12-10)

#### 使用示例

```go
导入 ots "github.com/corbaltcode/go-onetimesecret"

客户端 := ots.Client{
  用户名： "user@example.com"、
  密钥"我的 api 密钥"、
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // 处理错误
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // 处理错误
}

// 打印 "发射密码
print(secret)
```

### CLI 使用示例

``bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put "what is essential is invisible to the eye
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
眼不见为净

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Github页面](https://github.com/emdneto/otsgo)
作者：[Emídio Neto](https://github.com/emdneto)（添加时间：2024-06-09）

#### 使用示例

```去
// 创建一个新客户端
客户端 := ots.NewClient(
      WithUsername("otsuser@domain.com")、
      WithApiKey("xxxxxxxx")、
)

// 利用上下文发送请求
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Github页面--OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
作者：[Craig Gumbley](https://www.helloitscraig.co.uk)（更新日期：2017-04-28）

#### 使用示例

``powershell
# 从 PowerShell 图库安装
Install-Module -Name OneTimeSecret -Scope CurrentUser

# 设置连接信息
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 生成新的共享密文
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# 检索密钥
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# 查看所有可用功能
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Github页面 - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
作者：[Eric Engstrom](https://eengstrom.github.io/)（更新时间：2018-12-19）

作为脚本应用程序接口的 #### 使用示例

```bash
# 匿名使用的源代码（匿名创建的秘密）
source ots.bash

# 或者，使用特定授权凭证的源代码
apiuser="username"
apikey="apikey"
source ots.bash -u $APIUSER -k $APIKEY

# 检查服务器状态
ots_status

# 创建一个秘密并获取 URL
URL=$(echo "secret" | ots_share)

# 通过 HEREDOC 共享多行秘密。
URL=$(ots_share <<-EOF
      这是一个秘密
      ...多行
EOF
)

# 传递选项以共享或生成。
URL=$(ots_share ttl=600\
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com"<<< "SECRET")

# 获取秘密数据
本地 DATA="$(ots_retrieve "$URL")"

# 共享/生成一个新的秘密，并取回私人元数据密钥
本地 KEY=$(ots_metashare <<< "SECRET")
本地 KEY=$(ots_metagenerate)

# 获取最近创建的私人元数据密钥列表。
# 注意，这需要有效的自动验证凭证
local -a RECENT=( $(ots_recent) )

# 根据私人密钥检查秘密的当前状态
ots_state $KEY

# 给定私人密钥，刻录秘密
ots_burn $KEY
```

### CLI 使用示例

```bash
# 共享秘密（从 stdin
./ots 共享
秘密
^D

# 分享秘密（通过 HEREDOC）
./ots share <<-EOF
      这是通过 HEREDOC 共享的多行秘密。
      其他内容放在这里。
EOF

# 获取/检索秘密：
./ots get <key|url>
./ots retrieve <key|url

### CLI 使用示例

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
