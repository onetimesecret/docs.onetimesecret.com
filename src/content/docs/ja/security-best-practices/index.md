---
title: タイトルセキュリティのベストプラクティス
description: カスタムドメインのセキュリティ上の利点など、Onetime Secret特有のベストプラクティスで秘密共有のセキュリティを強化してください。
---

# セキュリティのベストプラクティス

Onetime Secretはセキュリティを考慮して設計されていますが、特にカスタムドメインなどの機能を使用する場合は、これらのベストプラクティスに従うことで、機密情報の保護がさらに強化されます。

## 秘密共有のベストプラクティス

1.**適切な有効期限を設定する：秘密の有効期限は、現実的に最も短いものを選びます。これにより、不正アクセスの機会を最小限に抑えることができます。

2.**パスフレーズ保護を使用する：機密性の高い情報には、パスフレーズ保護機能を使用します。これは、受信者が秘密を見るためにパスフレーズを入力することを要求し、セキュリティの追加の層を追加します。

3.**機密情報の分割**：機密性の高いデータを扱う場合は、複数の秘密に分割することを検討する。こうすることで、1つの秘密が漏洩しても、一連の情報全体は保護されたままとなる。

4.**メタデータの共有には安全な経路を使用すること：Onetime Secretは秘密の内容を保護しますが、リンクや関連するメタデータ（パスフレーズなど）の共有方法には注意してください。この通信には、安全で暗号化されたチャネルを使用してください。

5.**受取人の確認**：あなたが意図した受信者と秘密を共有していることを確認してください。送信する前にメールアドレスやユーザー名を再確認してください。

6.**ユーザーを教育する組織内でOnetime Secretを使用する場合、適切な使用方法とシークレットシェアリング特有のセキュリティプラクティスをチームに教育します。

## カスタムドメインのセキュリティ上の利点

Onetime Secretでカスタムドメインを使用すると、いくつかのセキュリティ上の利点があります：

1.**強化されたフィッシング対策**：カスタムドメインを使用すると、ユーザーは秘密の共有のために特定のURLに慣れるようになります。これにより、似たようなドメインを使用したフィッシングの可能性を簡単に特定することができます。

2.**信頼と正当性の向上**：受信者が見慣れたドメインを見ると、秘密の発信元を信頼する可能性が高まります。これは、クライアントやパートナーと機密情報を共有するビジネスにとって特に重要です。

3.**既存のセキュリティ・インフラとのシームレスな統合**：カスタムドメインは、既存のセキュリティツールや監視システムとより簡単に統合することができ、組織の秘密共有活動のより包括的なビューを提供します。

4.**コンプライアンスと監査**：コンプライアンスと監査**：規制業界の組織にとって、カスタムドメインの使用は、組織の直接管理下に秘密共有活動を維持し、監査プロセスをより簡単にすることで、コンプライアンスの維持に役立ちます。

Onetime Secretは、SSL/TLSの設定やドメインのアクティビティ監視など、カスタムドメインを保護するための技術的な側面を処理し、お客様はこれらの戦略的なセキュリティの利点に集中することができます。

## API使用のセキュリティ

Onetime Secret APIを使用している場合：

1.**APIキーの保護**：APIキーを安全に保管し、クライアント側のコードや公開リポジトリには決して公開しないこと。

2.**APIキーのローテーション**：APIキーのローテーションを定期的に行いましょう。

3.**APIアクセスの制限**：APIアクセスを設定する際には、最小特権の原則を使用すること。特定のユースケースごとに必要な権限のみを付与する。

## 高度な自己ホスト型セキュリティ

このセクションでは、Onetime Secretのインスタンスを独自に運用する場合の、高度なセキュリティについてします。オープンソースプロジェクトは[GitHub](https://github.com/onetimesecret/onetimesecret)に、公式Dockerイメージは[Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret)にあります。

Onetime Secretをセルフホストする場合、以下の推奨事項をインフラレベルで実装できます：

1.**エフェメラルな環境を使用する：可能であれば、秘密共有セッションごとに環境を作成し、破棄する。これは特に機密性の高い操作に有用である。私たちの[Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md)Dockerイメージは、エフェメラルなユースケースのために設計されています。

2.**時間ベースの制限を実施する：ユースケースが許すのであれば、営業時間内のみなど、秘密へのアクセスに時間ベースの制限を実装することを検討する。

3.**ジオフェンシング**：機密性の高い業務については、特定の地理的位置からの秘密へのアクセスを制限するジオフェンシングの導入を検討する。

4.**監査証跡**：秘密の作成とアクセス試行の詳細な監査証跡を維持します。これは、インシデントレスポンスやコンプライアンス要件において非常に重要です。

5.**静止時の暗号化**：Onetime Secretは暗号化を処理しますが、機密性の高いデータの場合は、シークレットを作成する前にコンテンツを暗号化し、保護レイヤーを追加することを検討してください。


## インシデントレスポンス

このセクションでは、あなたの組織に役立つ可能性のある一般的なセキュリティに関する推奨事項を概説します。これらの推奨事項は、当社サービスの特定の機能ではありません。

1.**計画を持つ**：秘密共有プロセスに特化したインシデント対応計画を策定する。これには、アクセス権の剥奪、影響を受ける当事者への通知、潜在的な損害の軽減などの手順を含める。

2.**クイックアクションシークレットが漏洩した疑いがある場合、シークレットがまだ閲覧されていなければ、すぐに Onetime Secret の書き込み機能を使用してください。閲覧されている場合は、適切な対処を行い、潜在的な損害を軽減してください。

3.**定期的なセキュリティの見直し**：秘密共有の慣行を定期的に見直し、必要に応じてセキュリティ対策を調整する。

---

これらのベストプラクティスに従うことで、Onetime Secretでの秘密共有活動のセキュリティを大幅に強化することができます。セキュリティは継続的なプロセスであり、警戒を怠らないことが機密情報を保護する鍵であることを忘れないでください。

セキュリティ上の懸念事項や潜在的な脆弱性の報告については、直ちにセキュリティチーム（security@onetimesecret.com）までご連絡ください。
