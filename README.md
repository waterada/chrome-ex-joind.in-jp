chrome-ex-joindin
==================

joind.in のサイトを日本語化する拡張です。


インストール
------------

1. Google Chrome を開く。
2. https://chrome.google.com/webstore/detail/joindin-%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%8C%96/nkklgeklbaokjpbhmlihdopfmbegkkpl にアクセスして追加する。


確認
------------
https://joind.in/talk/view/16457
https://joind.in/16457
何も入力せずに「コメントを投稿する」→エラーメッセージ
計算結果を間違える→エラーメッセージ


拡張機能の更新手順(開発側)
--------------------------

1. `src/manifest.json` の `version` をインクリメントする(たとえば `1.4`)。
2. `src/` の中を更新する。
3. 拡張機能( `chrome://extensions` )の画面で『デベロッパーモード』をONにする。
4. 対象の拡張機能の `有効にする` を OFF にする。
5. 拡張機能の `パッケージ化されていない拡張機能を読み込む...` ボタンで `src` のディレクトリを選択する。
6. これで拡張機能が読み込まれるので画面でテストする。ソースを修正したら `リロード (Ctrl + R)` のリンクをクリックすることで、拡張機能が最新に更新される。
7. 問題なければ commit して github に push。
8. `src` のディレクトリを zip する。
9. 寺田の google chrome の デベロッパー・ダッシュボードを表示: https://chrome.google.com/webstore/developer/dashboard
10. 「編集する」をクリックし、「更新パッケージをアップロード」ボタンでアップロード画面に進み、zipファイルをアップロードし、公開する。
11. 拡張機能の画面で、開発用の拡張機能は削除して、元の拡張機能の `有効にする` をONに戻す。
12. 拡張機能の画面で `拡張機能を今すぐ更新` ボタンをクリックする。
