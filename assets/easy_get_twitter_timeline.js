$(function () {
    $("get-twitter-timeline").each(function (i) {
        let get_twitter_timeline = $("get-twitter-timeline").eq(i);
        let userid = get_twitter_timeline.attr("user");

        let output = function () {
            let flag = false;
            get_twitter_timeline.children("t-article").each(function (article_eq) {
                let article = get_twitter_timeline.children("t-article").eq(article_eq);
                let number = article.attr("number");
                let tweet = twitter.tweet[number];
                if (tweet === undefined) {
                    twitter.loadmore(output);
                    flag = true;
                    return false;
                }
            });
            if (flag) return;
            get_twitter_timeline.children("t-article").each(function (article_eq) {
                let article = get_twitter_timeline.children("t-article").eq(article_eq);
                let number = article.attr("number");
                let tweet = twitter.tweet[number];
                let rep_list = {
                    "name": tweet.user.name,
                    "user_id": tweet.user.id,
                    "user_img": tweet.user.img,
                    "user_link": tweet.user.link,
                    "link": tweet.link,
                    "time_label": tweet.time.label,
                    "time_datetime": tweet.time.datetime,
                    "time_title": tweet.time.title,
                    "label": tweet.label,
                    "text": tweet.tweet.text,
                    "tweet": tweet.tweet.textemoji,
                    "code": tweet.tweet.code,
                    "share_like_link": tweet.share.like.link,
                    "share_like_datascribe": tweet.share.like.datascribe,
                    "share_Twitter_link": tweet.share.Twitter.link,
                    "share_Twitter_datascribe": tweet.share.Twitter.datascribe,
                    "share_Facebook_link": tweet.share.Facebook.link,
                    "share_Facebook_datascribe": tweet.share.Facebook.datascribe,
                    "share_LinkedIn_link": tweet.share.LinkedIn.link,
                    "share_LinkedIn_datascribe": tweet.share.LinkedIn.datascribe,
                    "share_Tumblr_link": tweet.share.Tumblr.link,
                    "share_Tumblr_datascribe": tweet.share.Tumblr.datascribe
                };

                let i = 0;
                while (tweet.img[i]) {
                    if (tweet.img[i].alt !== undefined) rep_list["img_" + (i + 1) + "_alt"] = tweet.img[i].alt;
                    if (tweet.img[i].src !== undefined) rep_list["img_" + (i + 1) + "_src"] = tweet.img[i].src;
                    if (tweet.img[i].title !== undefined) rep_list["img_" + (i + 1) + "_title"] = tweet.img[i].title;
                    i++;
                }



                article.find("t-div").each(function (ii) {
                    let t_div = article.find("t-div").eq(ii);
                    if (rep_list[t_div.text()] === undefined) {
                        t_div.text("")
                            .addClass("t-error");
                        return;
                    }
                    if (t_div.text() === "code") {
                        t_div.html(rep_list[t_div.text()]);
                        return;
                    }
                    t_div.text(rep_list[t_div.text()]);
                });

                article.find("*[t-div]").each(function (ii) {
                    let t_div = article.find("*[t-div]").eq(ii);
                    if (rep_list[t_div.attr(t_div.attr("t-div"))] === undefined) {
                        t_div.attr(t_div.attr("t-div"), "")
                            .addClass("t-error");
                        return;
                    }
                    t_div.attr(t_div.attr("t-div"), rep_list[t_div.attr(t_div.attr("t-div"))]);
                });
                article.addClass("t-loaded");
            });

        }
        let twitter = new twitter_timeline_get(userid, output);
    });

});