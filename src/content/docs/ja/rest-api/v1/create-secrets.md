---
title: タイトル秘密を作る
description: Onetime Secret REST API を使用したシークレットの作成と取得方法についてします。
---

2025-04-02_更新

:::note
**データロケーションと地域の選択**
- 米国（[`us.onetimesecret.com`](https://us.onetimesecret.com/)）またはEU（[`eu.onetimesecret.com`](https://eu.onetimesecret.com/)）のデータセンターから選択する。
- データ主権、レイテンシー、コンプライアンス要件などの要因を考慮する。
- **NOTE:** デフォルトの `onetimesecret.com` は引き続き運用可能で、アクティブなデータセンターへのルーティングを行うが、この機能は将来廃止される可能性があるため、特定のロケールを使用することを推奨する。
:::


## 秘密を作ろう

POST https://REGION.onetimesecret.com/api/v1/share`

このエンドポイントを使用して、秘密の値を保存し、一度だけ使用するリンクを作成します。


### 認証リクエスト

バッシュ
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### 匿名希望

バッシュ
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### クエリ・パラム

- secret**：暗号化されて保存される秘密の値。ご利用のプランに応じた最大長（1k～10k）があります。
- パスフレーズ**：受信者が秘密を見るために知っていなければならない文字列。この値は秘密の暗号化にも使用され、保存される前にbcryptedされるため、この値を持つのは転送時のみとなる。
- 秘密が生き残る最大時間(time-to-live)を秒単位で指定する。この時間が経過すると、秘密は削除され、復元できなくなる。
- 受信者**: メールアドレス。秘密のリンクを含むフレンドリーなメールを送信します (秘密そのものではありません)。
- share_domain**: 秘密のリンクを生成する際に使用するカスタムドメイン。提供されない場合、デフォルトのドメインが使用されます (例: eu.onetimesecret.com)。

### 属性

- **custid**: 秘密を作成したアカウントのユーザー名。匿名リクエストの場合は `anon` となる。
- metadata_key**: メタデータの一意のキー。これは共有しないこと。
- secret_key**：作成した秘密の一意のキー。これは共有可能なキーである。
- ttl**：ttl**：指定された生存時間（秒）（つまり残り時間ではない）
- metadata_ttl**：metadata_ttl**: メタデータの残り時間（秒）。
- **secret_ttl**：secret_ttl**：秘密の残り時間（秒）。
- recipient**：受信者が指定された場合、これはメールアドレスの難読化バージョンである。
- **created**：秘密が作成された時刻(unix time (UTC))。
- updated**：同じだが、最後に更新された時間。
- passphrase_required**：秘密の作成時にパスフレーズが提供された場合、これはtrueになる。そうでない場合は当然falseとなる。
- share_domain** : シークレットリンクを生成する際に使用するカスタムドメイン。それ以外の場合は "" です。


### 回答例

json
{
  "custid": "USERNAME"、
  "metadata_key": "qjpjroeit8wra0ojeyhcw5pjsgwtuq7"、
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl": "3600"、
  "share_domain"："",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## シークレットの生成

POST https://REGION.onetimesecret.com/api/v1/generate`

短くてユニークな秘密を生成します。一時的なパスワード、Onetimeパッド、ソルトなどに便利です。

### 認証リクエスト

バッシュ
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### 匿名希望

バッシュ
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


json
{
  "custid": "USERNAME"、
  "value":"3Rg8R2sfD3?a",
  "metadata_key": "2b6bjmudhmtiqjn2qmdaqjkqxp323gi"、
  "secret_key": "pgcdv7org3vtdurif809sygnt0mstw6"、
  "ttl": "3600"、
  "share_domain"："",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### 属性

上記の "Share A Secret "と同じですが、`value`フィールドが追加されています。
