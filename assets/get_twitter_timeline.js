class twitter_timeline_get {
    constructor(twitter_id, load_end = function () {}, instance = $("body")) {
        this.load_end_fn = load_end;
        this.division_id = $('twitter_timeline_get').length + 0;
        this.tweet_length = 0;
        instance.append('<twitter_timeline_get style="display:none;"><a class="twitter-timeline" href="https://twitter.com/' +
            twitter_id + '">Tweets by ' + twitter_id + '</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>');
        this.load_wait();
    }

    load_wait() {
        let that = this;
        let load_wait_fn = function () {
            if ($('#twitter-widget-' + that.division_id).contents().find('ol.timeline-TweetList').find('li.timeline-TweetList-tweet.customisable-border').length > that.tweet_length) {
                that.tweet_length = $('#twitter-widget-' + that.division_id).contents().find('ol.timeline-TweetList').find('li.timeline-TweetList-tweet.customisable-border').length;
                that.contents = $('#twitter-widget-' + that.division_id).contents();
                that.get();
                return;
            }
            setTimeout(load_wait_fn, 100);
        }
        setTimeout(load_wait_fn, 100);
    }


    get(load_end = this.load_end_fn) {
        this.tweet = [];
        let that = this;
        this.contents.find('ol.timeline-TweetList').children().each(
            function (i, element) {
                let data_instance = $(element);
                /*メディア関係(画像と動画のサムネ)*/
                let imglist = [];
                data_instance.find('.MediaCard-mediaContainer img').each(function (i, img) {
                    imglist.push({
                        'alt': $(img).attr('alt'),
                        'src': $(img).attr('src'),
                        'title': $(img).attr('title')
                    });
                });

                /*汎用型ツイートエンコーダー*/
                var tweet_text_list = [];
                var tweet_text_emoji = "";
                data_instance.find('p.timeline-Tweet-text')[0].childNodes.forEach(function (tweet_data) {
                    let tweet_instance = $(tweet_data);

                    /*文字の処理*/
                    if (tweet_data.data) {
                        tweet_text_list.push({
                            "text": tweet_data.data,
                            'type': "text"
                        });
                        tweet_text_emoji += tweet_data.data;
                    }

                    /*絵文字の処理*/
                    if (tweet_instance.prop('tagName') == 'IMG') {
                        tweet_text_list.push({
                            'arialabel': tweet_instance.attr('aria-label'),
                            'title': tweet_instance.attr('title'),
                            'alt': tweet_instance.attr('alt'),
                            'src': tweet_instance.attr('src'),
                            'type': 'img'
                        });
                        tweet_text_emoji += tweet_instance.attr('alt');
                    }

                    /*改行*/
                    if (tweet_instance.prop('tagName') == 'BR') {
                        tweet_text_list.push({
                            'type': 'br'
                        });
                        tweet_text_emoji += '\n';
                    }

                    /*引用RTの元ツイ ハッシュタグ メンション*/
                    if (tweet_instance.prop('tagName') == 'A') {
                        if (tweet_instance.attr('data-scribe') == "element:hashtag") {
                            /*ハッシュタグ メンション*/
                            tweet_text_list.push({
                                'data': tweet_instance.attr('data-scribe'),
                                'value': tweet_instance.find('span.PrettyLink-prefix').text() + tweet_instance.find('span.PrettyLink-value').text(),
                                'link': tweet_instance.prop('href'),
                                'type': 'tag'
                            });
                            tweet_text_emoji += tweet_instance.find('span.PrettyLink-prefix').text() + tweet_instance.find('span.PrettyLink-value').text();

                        } else if (tweet_instance.attr('data-scribe') == "element:url") {
                            {
                                /*url*/
                                tweet_text_list.push({
                                    'link': tweet_instance.prop('href'),
                                    'type': 'link'
                                });
                                tweet_text_emoji += tweet_instance.prop('href');
                            }
                        }
                    }
                });

                /*まとめ*/
                that.tweet.push({
                    'retweetCredit': data_instance.find('.timeline-Tweet-retweetCredit').text(),
                    'inReplyTo': data_instance.find('.timeline-Tweet-inReplyTo').text(),
                    'user': {
                        'img': data_instance.find('img.Avatar').attr('src'),
                        'name': data_instance.find('span.TweetAuthor-name.Identity-name.customisable-highlight').text(),
                        'id': data_instance.find('span.TweetAuthor-screenName.Identity-screenName').text(),
                        'link': data_instance.find('a.TweetAuthor-link.Identity.u-linkBlend').attr('href')
                    },
                    'tweet': {
                        'text': data_instance.find('p.timeline-Tweet-text').text(),
                        'textemoji': tweet_text_emoji,
                        'code': data_instance.find('p.timeline-Tweet-text').html(),
                        'list': tweet_text_list
                    },
                    'share': {
                        'like': {
                            'link': data_instance.find('a.TweetAction.TweetAction--heart.web-intent').attr('href'),
                            'datascribe': data_instance.find('a.TweetAction.TweetAction--heart.web-intent').attr('data-scribe'),
                        },
                        'Twitter': {
                            'link': data_instance.find('a.timeline-ShareMenu-option').eq(0).attr('href'),
                            'datascribe': data_instance.find('a.timeline-ShareMenu-option').eq(0).attr('data-scribe'),
                        },
                        'Facebook': {
                            'link': data_instance.find('a.timeline-ShareMenu-option').eq(1).attr('href'),
                            'datascribe': data_instance.find('a.timeline-ShareMenu-option').eq(1).attr('data-scribe'),
                        },
                        'LinkedIn': {
                            'link': data_instance.find('a.timeline-ShareMenu-option').eq(2).attr('href'),
                            'datascribe': data_instance.find('a.timeline-ShareMenu-option').eq(2).attr('data-scribe'),
                        },
                        'Tumblr': {
                            'link': data_instance.find('a.timeline-ShareMenu-option').eq(3).attr('href'),
                            'datascribe': data_instance.find('a.timeline-ShareMenu-option').eq(3).attr('data-scribe'),
                        }
                    },
                    'link': data_instance.find('.timeline-Tweet.u-cf.js-tweetIdInfo.js-clickToOpenTarget').attr('data-click-to-open-target'),
                    'time': {
                        'datetime': data_instance.find('time.dt-updated').attr('datetime'),
                        'label': data_instance.find('time.dt-updated').attr('aria-label'),
                        'title': data_instance.find('time.dt-updated').attr('title')
                    },
                    'label': data_instance.find('.Icon.Icon--twitter').attr('aria-label'),
                    'img': imglist
                });

            }
        );
        load_end();
    }

    loadmore(load_end = function () {}) {
        this.load_end_fn = load_end;
        this.contents.find('div.timeline-LoadMore').find('button').click();
        this.load_wait();
    }
}