# get_twitter_timeline

Twitter のタイムラインを取得するライブラリです
js だけで動いてるので web のクライアントだけで動きます
このリポジトリに含まれる easy_get_twitter_timeline.js を使うと非プログラマでもサイトに Twitter の情報を掲載することが出来ます
<br><br>

## get_twitter_timeline

プログラマ向けです

### import

jquery と get_twitter_timeline をロードします

```html
<script src="assets//jquery-3.4.1.min.js"></script>
<script src="assets/get_twitter_timeline.js"></script>
```

### use

第 1 引数に取得したいユーザー id を指定してください(必須)<br>
第 2 引数にロードが完了したあとの処理を指定してください<br>
第 3 引数に jquery のインスタンスを指定してください この要素の最後(append)に埋め込みリンクを展開します<br>

```js
var twitter = new twitter_timeline_get("faa0311", function () {
  console.log(twitter.tweet);
});
```

ロードの時間が考慮されていないため下記の例だとエラーになる可能性があります<br>

```js
var twitter = new twitter_timeline_get("faa0311");
console.log(twitter.tweet);
```

細かい解説は[sample.html](https://fa0311.github.io/get_twitter_timeline/sample.html)に書いています
<br><br>

## easy_get_twitter_timeline

非プログラマ向けです<br>
このプラグインを使用すると簡単にツイートを埋め込むことが出来ます

### import

jquery と get_twitter_timeline と easy_get_twitter_timeline をロードします

```html
<script src="assets//jquery-3.4.1.min.js"></script>
<script src="assets/get_twitter_timeline.js"></script>
<script src="assets/easy_get_twitter_timeline.js"></script>
```

### use

```html
<get-twitter-timeline user="faa0311">
  <!-- get-twitter-timelineのuserに取得したいTwitterIdを指定してください -->

  <t-article number="1">
    <!-- get_twitter_timelineの直下のt-articleのnumberに取得したいツイートを指定してください -->
    <!--番号が少ないほど新しいツイートです -->

    <p><t-div>code</t-div></p>
    <!-- t-divの文字の中がcodeの場合ツイートのhtmlソースに置き換えます -->

    <img t-div="src" src="user_img" />
    <!-- t-div属性が含まれる場合t-div内の属性を置き換えます -->
    <!-- 上記の例の場合ユーザー画像が表示されます -->
  </t-article>
</get-twitter-timeline>
```

```html
<get-twitter-timeline user="faa0311">
  <t-article number="1">
    <p><img t-div="src" src="user_img" /><t-div>name</t-div></p>
    <p><t-div>code</t-div></p>
    <p><a t-div="href" href="share_like_link">いいね</a></p>
    <p><a t-div="href" href="share_Twitter_link">リツイート</a></p>
  </t-article>
</get-twitter-timeline>
```

```css
/*内容がなかった要素にはt-errorが自動で付きます*/
.t-error {
}
/*ロードが完了した要素にはt-loadedが自動で付きます*/
.t-loaded {
}
```

```css
/*内容がない要素を削除*/
.t-error {
  display: none;
}
/*ロード完了まで要素を削除*/
t-article {
  display: none;
}
t-article.t-loaded {
  display: block;
}
```

細かい解説は[sample.html](https://fa0311.github.io/get_twitter_timeline/easy_sample.html)に書いています

# License

get_twitter_timeline is under MIT License
