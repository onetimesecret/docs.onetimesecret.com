---
title: クライアントライブラリ
description: Ruby、Python、Perl、Java、C#、Goなど、Onetime Secret APIで利用可能なクライアントライブラリを紹介します。
---

## ルビー


[Githubページ onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
by [Delano](https://delanotes.com/) (2024-06-09 更新)

### 使用例

ルビー
onetime/api' を必要とする。

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
オプション = {
  secret: 'ジャズ、ジャズ、そしてもっとジャズを、
  recipient: 'example@onetimesecret.com'、
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

# パイソン


[Githubページ - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
by [slashpass](https://github.com/slashpass) (2021-07-08追記)

### 使用例

パイソン
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # https://onetimesecret.com/secret/xxxxxxxxxxx のようなリンクを返す。
```

[Githubページ - py_onetimesecret](https://github.com/utter-step/py_onetimesecret)
by [Vladislav Stepanov](https://github.com/utter-step/) (2012-06-26追記)

### 使用例

パイソン
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u "test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65'、
# u'value': u'test'}.
```

---

## パール


[Net::OneTimeSecret on CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
by [Kyle Dawkins](http://www.shoffle.com/) (2012-01-06追記)

### 使用例

``perl
#usr/bin/env perl

Net::OneTimeSecretを使用する；

# 注意: これを動作させるためには、これらをあなたのものに置き換えてください！
my $customerId = 'YOUR_EMAIL'；
my $testApiKey = 'YOUR_OTS_APIKEY'；

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey )；
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.'、
                   passphrase => 'thepassword'、
                   recipient => 'kyle@shoffle.com'、
                   ttl => 7200、
                 );
printf( "%sn", $result->{secret_key} )；

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" )；
printf( "%sn", $secret->{value} )；
```

---

#


[Githubページ - onetime-java](https://github.com/mpawlowski/onetime-java)
by [Marcin Pawlowski](https://github.com/mpawlowski) (2014-05-22追記)

### 使用例

java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance"、
    "ots-username"、
    "ots-apikey")；

GenerateResponse generateResponse = ots.generate()
                新しいGenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build())；

RetrieveResponse retrieveResponse = ots.retrieve()
                new RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build())；

assertEquals(generateResponse.getValue(), retrieveResponse.getValue())；
```

---

## C#


[Githubページ - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
by [ウラジスラフ・ステパノフ](https://github.com/utter-step/) (2014-05-29追記)

### 使用例

csharp
# .NET(4.0+)またはMono(2.10.8+)と互換性のあるプロジェクトでOneTimeSharpを使用することができます。
VStepanov.OneTimeSharpを使用しています；

クラステスト
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")；

        var generated = ots.GenerateSecret()；

        Console.WriteLine(generated.Value); // LR*?us*A(UT*)

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


[Githubページ - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
by [Corbalt](https://github.com/corbaltcode/) (2021-12-10追記)

### 使用例

ゴー
インポート ots "github.com/corbaltcode/goo-onetimesecret"

クライアント := ots.Client{
  ユーザー名："user@example.com"、
  キー："my api key"、
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil { // エラーを処理する。
  // エラーを処理する
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil { // エラーを処理する
  // エラーを処理する
}

// "発射コード "を表示する
print(secret)
```

### CLIとしての使用例

バッシュ
$ go install github.com/corbaltcode/goo-onetimesecret/cmd/ots@latest

$ ots put '本質的なものは目に見えない'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
本質的なものは目に見えない

オッツ・ジェン
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Githubページ](https://github.com/emdneto/otsgo)
by [エミディオ・ネト](https://github.com/emdneto) (2024-06-09追記)

### 使用例

``go
// 新しいクライアントを構築する
client := ots.NewClient(
      WithUsername("otsuser@domain.com")、
      WithApiKey("xxxxxxxx")、
)

// コンテキストでリクエストを送信する
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil { もしerr !
      panic(err)
}

fmt.Println(response.Status)
```

---

## パワーシェル


[Githubページ - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
by [クレイグ・ガンブリー](https://www.helloitscraig.co.uk) (2017-04-28更新)

### 使用例

パワーシェル
# PowerShell ギャラリーからインストールする
Install-Module -Name OneTimeSecret -Scope CurrentUser

# 接続情報の設定
Set-OTSAuthorizationToken -ユーザー名 user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxx

# 新しい共有秘密を生成する
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# 秘密の取得
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# 利用可能なすべての関数を表示する
Get-Command -Module OneTimeSecret | 名前の選択
```

---

## バッシュ


[Githubページ - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
by [Eric Engstrom](https://eengstrom.github.io/) (2018-12-19更新)

### スクリプトAPIとしての使用例

バッシュ
# 匿名で使用するためのソース (秘密は匿名で作成)
ソース ots.bash

# または、特定の認証情報を使ってソースを作成する。
apiuser="username"
apikey="アピキー"
ソース ots.bash -u $APIUSER -k $APIKEY

# サーバーの状態をチェックする
ots_status

# シークレットを作成し、URLを返す
URL=$(echo "secret" | ots_share)

# HEREDOCで複数行の秘密を共有する。
URL=$(ots_share <<-EOF
      これは秘密です
      ... 複数行
EOF
)

# 共有または生成するためのオプションを渡します。
URL=$(ots_share ttl=600 ˶ˆ꒳ˆ˵)
                  パスフレーズ="共有秘密"
                  recipient="someone@somewhere.com"<<< "SECRET")

# シークレットデータを取得する
ローカル DATA="$(ots_retrieve "$URL")"

# 新しいシークレットを共有/生成し、プライベート・メタデータ・キーを取得する。
ローカル KEY=$(ots_metashare <<< "SECRET")
ローカルKEY=$(onts_metagenerate)

# 最近作成されたメタデータの秘密鍵のリストを取得する。
# このためには有効な認証情報が必要であることに注意。
local -a RECENT=( $(ots_recent) )

# 秘密鍵の現在の状態をチェックする。
ots_state $KEY

# 秘密鍵を焼く
ots_burn $KEY
```

### CLIとしての使用例

```bash
# 秘密を共有する（標準入力から
./ots 共有
秘密
^D

# 秘密を共有する（HEREDOC経由）
./ots 共有 <<-EOF
      これはHEREDOC経由の複数行の秘密だ。
      他のものはここに置く。
EOF

# 秘密を取得する：
./ots get <key|url>
./ots 取得 <キー|url

### CLIとしての使用例

バッシュ
ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
