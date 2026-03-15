---
title: シークレットを作る
description: Onetime Secret REST API を使用したシークレットの作成と取得方法について説明します。
---

_更新 2025-04-02_

:::note
**データロケーションと地域の選択**
- 米国（[`us.onetimesecret.com`](https://us.onetimesecret.com/)）、EU（[`eu.onetimesecret.com`](https://eu.onetimesecret.com/)）、カナダ（[`ca.onetimesecret.com`](https://ca.onetimesecret.com/)）、ニュージーランド（[`nz.onetimesecret.com`](https://nz.onetimesecret.com/)）、または英国（[`uk.onetimesecret.com`](https://uk.onetimesecret.com/)）のデータセンターから選択する。
- データ主権、レイテンシー、コンプライアンス要件などの要因を考慮する。
- **NOTE:** デフォルトの `onetimesecret.com` は引き続き運用可能で、アクティブなデータセンターへのルーティングを行うが、この機能は将来廃止される可能性があるため、特定のロケールを使用することを推奨する。
:::


## シークレットの作成

`POST https://REGION.onetimesecret.com/api/v1/share`

このエンドポイントを使用して、シークレットの値を保存し、一度だけ使用するリンクを作成します。


### 認証リクエスト

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### 匿名リクエスト

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### クエリパラメータ

- **secret**：暗号化されて保存されるシークレットの値。ご利用のプランに応じた最大長（1k～10k）があります。
- **passphrase**：受信者がシークレットを見るために知っていなければならない文字列。この値はシークレットの暗号化にも使用され、保存される前にbcryptされるため、この値を持つのは転送時のみとなる。
- **ttl**：シークレットが生き残る最大時間(time-to-live)を秒単位で指定する。この時間が経過すると、シークレットは削除され、復元できなくなる。
- **recipient**：メールアドレス。シークレットリンクを含むフレンドリーなメールを送信します（シークレットそのものではありません）。
- **share_domain**：シークレットリンクを生成する際に使用するカスタムドメイン。提供されない場合、デフォルトのドメインが使用されます（例: eu.onetimesecret.com）。

### 属性

- **custid**：シークレットを作成したアカウントのユーザー名。匿名リクエストの場合は `anon` となる。
- **metadata\_key**：メタデータの一意のキー。これは共有しないこと。
- **secret\_key**：作成したシークレットの一意のキー。これは共有可能なキーである。
- **ttl**：指定された生存時間（秒）（つまり残り時間ではない）
- **metadata\_ttl**：メタデータの残り時間（秒）。
- **secret\_ttl**：シークレットの残り時間（秒）。
- **recipient**：受信者が指定された場合、これはメールアドレスの難読化バージョンである。
- **created**：シークレットが作成された時刻（unix time (UTC)）。
- **updated**：同上だが、最後に更新された時間。
- **passphrase\_required**：シークレットの作成時にパスフレーズが提供された場合、これはtrueになる。そうでない場合は当然falseとなる。
- **share_domain**：シークレットリンクを生成する際に使用するカスタムドメイン。それ以外の場合は ""。


### レスポンス例

```json
{
  "custid":"USERNAME",
  "metadata_key":"qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## シークレットの生成

`POST https://REGION.onetimesecret.com/api/v1/generate`

短くてユニークなシークレットを生成します。一時的なパスワード、Onetimeパッド、ソルトなどに便利です。

### 認証リクエスト

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### 匿名リクエスト

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
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

### 属性

上記の「シークレットの作成」と同じですが、`value`フィールドが追加されています。
