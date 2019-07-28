# Apps Script(GAS)からBigQueryにクエリを投げて結果をSlackに投稿するサンプル

## できること
  * Spreadsheetオーナーでなく、サービスアカウントでBigQueryを叩ける
  * 結果をSlackに投稿できる

## 使い方
### 1. サービスアカウントでキーを発行する
  * console → `IAM&admin` → `Service accounts` → サービスアカウントを選ぶ → `Create Key`
  * ↓のフォーマットのjsonが取得できる
    ```json
      {
        "type": "service_account",
        "project_id": "{PROJECT_ID}",
        "private_key_id": "xxxxxxxx",
        "private_key": "{PRIVATE_KEY}",
        "client_email": "{CLIENT_EMAIL}",
        "client_id": "xxxxxxxx",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/{PROJECT_ID}%40appspot.gserviceaccount.com"
      }
    ```

### 2. Spreadsheetを作ってApp Scriptをかく
  * main.gsを参考に

### 3. ProjectPropertiesのScriptPropertiesに必要な値を設定する
  * `project_id` → 1.の`PROJECT_ID`
  * `private_key` → 1.の`PRIVATE_KEY`
  * `slack_webhook_url` → Slackのインテグレーションから発行
  * `service_account_email` → 1.の`CLIENT_EMAIL`

### 4. 必要なリソースを取得する
  * BigQuery
    * script editor → `Resources` → `Advanced Google Services` → `BigQuery API` をONにする
    * ![Screen Shot 2019-07-23 at 7 14 14](https://user-images.githubusercontent.com/31527437/61668989-86de1600-ad19-11e9-9ec1-bae2d8512581.png)
  * OAuth2
    * script editor → `Resources` → `Libraries`で `Add a library`に下のプロジェクトキーを入力して`Add`を押す
      * プロジェクトキー: `1CXDCY5sqT9ph64fFwSzVtXnbjpSfWdRymafDrtIZ7Z_hwysTY7IIhi7s`
    * ![Screen Shot 2019-07-23 at 7 10 37](https://user-images.githubusercontent.com/31527437/61668983-83e32580-ad19-11e9-86a6-b5ba47b73ba9.png)
