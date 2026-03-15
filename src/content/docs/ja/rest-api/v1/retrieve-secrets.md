---
title: シークレットを取得する
description: Onetime Secret REST API を使用してシークレットを取得する方法について説明します。
---

_更新 2025-04-02_

:::note
**データロケーションと地域の選択**
- [リージョン](/ja/regions/)を選択する（例: [`ca.onetimesecret.com`](https://ca.onetimesecret.com/)、[`eu.onetimesecret.com`](https://eu.onetimesecret.com/)、[`nz.onetimesecret.com`](https://nz.onetimesecret.com/)、[`uk.onetimesecret.com`](https://uk.onetimesecret.com/)、[`us.onetimesecret.com`](https://us.onetimesecret.com/)）。
- データ主権、レイテンシー、コンプライアンス要件などの要因を考慮する。
- **NOTE:** デフォルトの `onetimesecret.com` は引き続き運用可能で、アクティブなデータセンターにルーティングされる。
:::

## シークレットの取得

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### 認証リクエスト

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### 匿名リクエスト

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### クエリパラメータ

- **SECRET_KEY**：このシークレットの一意な鍵。
- **passphrase**（必要な場合）：パスフレーズはシークレット鍵がパスフレーズ付きで作成された場合のみ必要です。

### 属性

- **secret_key**：作成したシークレットの一意のキー。これは共有可能なキーです。
- **value**：実際のシークレット。言うまでもないことですが、これは一度しか使用できません。

## メタデータの取得

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

すべてのシークレットには関連するメタデータもある。メタデータはシークレットの作成者（つまり受信者ではない）が使用することを意図したものであり、一般的には非公開にしておくべきである。メタデータの鍵はシークレットの鍵とは異なるので、シークレットそのものの基本的な情報（たとえば、いつ閲覧されたかどうかなど）を得るためにメタデータの鍵を安全に使うことができる。

### 認証リクエスト

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### クエリパラメータ

- **METADATA_KEY**：このメタデータの一意のキー。

### 属性

- **custid**：シークレットを作成したアカウントのユーザー名。匿名リクエストの場合は `anon` となる。
- **metadata\_key**：メタデータの一意のキー。これは共有しないこと。
- **secret\_key**：作成したシークレットの一意のキー。これは共有可能なキーである。
- **ttl**：指定された生存時間（残り時間ではない）。
- **metadata\_ttl**：メタデータの残り時間（秒）。
- **secret\_ttl**：シークレットの残り時間（秒）。
- **recipient**：受信者が指定された場合、これはメールアドレスの難読化バージョンである。
- **created**：メタデータが作成された時刻（unix time (UTC)）。
- **updated**：同上だが、最後に更新された時刻。
- **received**：シークレットが受信された時刻。
- **passphrase\_required**：シークレットの作成時にパスフレーズが提供された場合、これはtrueになる。そうでなければ当然false。


## シークレットの削除

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

まだ読まれていないシークレットを削除する。

### 認証リクエスト

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### クエリパラメータ

- なし

### 属性

- ステータスがburnedのメタデータ属性と同じ。

## 最近のメタデータを取得

**GET https://onetimesecret.com/api/v1/private/recent**

最近のメタデータのリストを取得する。

### 認証リクエスト

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### クエリパラメータ

- なし

### 属性

- メタデータ属性と同じですが、リストとなり、シークレットキーの値は常にnullとなります。

:::warning 認証が必要です
注意: メタデータと管理操作（メタデータの取得、シークレットの削除、最近のメタデータ）は認証されたユーザーのみ利用可能です。
:::
