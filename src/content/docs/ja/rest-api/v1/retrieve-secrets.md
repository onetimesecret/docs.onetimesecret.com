---
title: シークレットを取得する
description: Onetime Secret REST API を使用してシークレットを取得する方法について説明します。
---

2025-04-02_更新

:::note
**データのロケールと地域の選択
- リージョン]({getRelativeLocaleUrl(Astro.currentLocale ??'en', 'regions')})を選択する (例: [`us.onetimesecret.com`](https://us.onetimesecret.com/)、[`eu.onetimesecret.com`](https://eu.onetimesecret.com/))。
- データ主権、レイテンシー、コンプライアンス要件などの要因を考慮する。
- **NOTE:** デフォルトの `onetimesecret.com` は引き続き運用可能で、アクティブなデータセンターにルーティングされる。
:::

## シークレットを取り出す

POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### 認証リクエスト

バッシュ
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### 匿名希望

バッシュ
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### クエリ・パラム

- SECRET_KEY**：この秘密の一意な鍵。
- パスフレーズ** (必要な場合): パスフレーズは秘密鍵がパスフレーズ付きで作成された場合のみ必要です。

### 属性

- secret_key**：作成した秘密の一意のキー。これは共有可能なキーです。
- 値**：実際の秘密。言うまでもないことですが、これは一度しか使用できません。

## メタデータの取得

POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

すべての秘密には関連するメタデータもある。メタデータは秘密の作成者 (つまり受信者ではない) が使用することを意図したものであり、 一般的には非公開にしておくべきである。メタデータの鍵は秘密の鍵とは異なるので、秘密そのものの基本的な情報 (たとえば、いつ閲覧されたかどうかなど) を得るためにメタデータの鍵を安全に使うことができる。

### 認証リクエスト

バッシュ
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### クエリ・パラム

- METADATA_KEY**：このメタデータの一意のキー。

### 属性

- **custid**: 秘密を作成したアカウントのユーザー名。匿名リクエストの場合は `anon` となる。
- metadata_key**: メタデータの一意のキー。これは共有しないこと。
- secret_key**：作成した秘密の一意のキー。これは共有可能なキーである。
- ttl**：ttl**：指定された生存時間（残り時間ではない）。
- metadata_ttl**：metadata_ttl**: メタデータの残り時間（秒）。
- **secret_ttl**：secret_ttl**：秘密の残り時間（秒）。
- recipient**：受信者が指定された場合、これはメールアドレスの難読化バージョンである。
- **created**：unix時間(UTC)でメタデータが作成された時刻。
- updated**：同じですが、最後に更新された時刻です。
- received**：秘密が受信された時刻。
- passphrase_required**：秘密の作成時にパスフレーズが提供された場合、これはtrueになる。そうでなければ当然 false。


## シークレットを削除

POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

まだ読まれていない秘密を燃やす。

### 認証リクエスト

バッシュ
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### クエリ・パラム

- なし

### 属性

- ステータスがburnedのメタデータ属性と同じ。

## 最近のメタデータを取得

**GET https://onetimesecret.com/api/v1/private/recent**

最近のメタデータのリストを取得する。

### 認証リクエスト

バッシュ
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### クエリ・パラム

- なし

### 属性

- メタデータ属性と同じですが、リストとなり、秘密キーの値は常にNULLとなります。

::: 警告 認証が必要です
注意: メタデータと管理操作(メタデータの取得、秘密の書き込み、最近のメタデータ)は認証されたユーザーのみ利用可能です。
:::
