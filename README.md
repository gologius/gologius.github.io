# gologius.github.io
自分のサイト用のリポジトリです→[https://gologius.github.io/](https://gologius.github.io/)

基本的にMarkdownで書いています。

以下は設定ファイルの説明
* `_config.yml`
    * HPのタイトル、説明、使用するテーマの指定
* `/assets/css/style.scss`
    * 独自のcssの設定。`@import "{{ site.theme }}";`の次の行からscss形式で記入。
    * 現在使用しているテーマはcayman。使い方は[https://github.com/pages-themes/cayman](https://github.com/pages-themes/cayman)
* `_layouts/default.html`
    * 出力されるHTMLのテンプレート。カスタマイズしたければここを触る。caymanのhtmlを改造して使用している


※GoogleTagManagerのタグが埋め込まれているため注意をお願いします