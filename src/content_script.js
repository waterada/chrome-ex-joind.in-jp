var url = location.href;

var replaceInside = function($contents, callback, rep) {
    if ($contents.size() > 0) {
        $contents.each(function() {
            var $content = $(this);
            var html = $content.html();
            if (rep) {
                html = html.replace(callback, rep);
            } else {
                html = callback(html);
            }
            $content.html(html);
        });
    }
};

var replaceButton = function($buttons, callback, rep) {
    if ($buttons.size() > 0) {
        $buttons.each(function() {
            var $button = $(this);
            var val = $button.val();
            if (rep) {
                val = val.replace(callback, rep);
            } else {
                val = callback(val);
            }
            $button.val(val);
        });
    }
};

var replaceSpambot = function() {
    replaceInside($('label[for="cinput"]'), "Spambot check","計算結果を入力してください：");
    replaceInside($('#cinput').parent().children('b'), function(html) {
        html = html.replace("one","1");
        html = html.replace("two","2");
        html = html.replace("three","3");
        html = html.replace("four","4");
        html = html.replace("five","5");
        html = html.replace("six","6");
        html = html.replace("seven","7");
        html = html.replace("eight","8");
        html = html.replace("nine","9");
        html = html.replace("ten","10");
        html = html.replace("zero","0");
        html = html.replace("plus","+");
        html = html.replace("minus","-");
        return html;
    });
};

var replaceDate = function(html) {
    html = html.replace(/\b(\d{1,2})\.Jan\.(\d{4})(?: at )?/g, "$2/1/$1 ");
    html = html.replace(/\b(\d{1,2})\.Feb\.(\d{4})(?: at )?/g, "$2/2/$1 ");
    html = html.replace(/\b(\d{1,2})\.Mar\.(\d{4})(?: at )?/g, "$2/3/$1 ");
    html = html.replace(/\b(\d{1,2})\.Apr\.(\d{4})(?: at )?/g, "$2/4/$1 ");
    html = html.replace(/\b(\d{1,2})\.May\.(\d{4})(?: at )?/g, "$2/5/$1 ");
    html = html.replace(/\b(\d{1,2})\.Jun\.(\d{4})(?: at )?/g, "$2/6/$1 ");
    html = html.replace(/\b(\d{1,2})\.Jul\.(\d{4})(?: at )?/g, "$2/7/$1 ");
    html = html.replace(/\b(\d{1,2})\.Aug\.(\d{4})(?: at )?/g, "$2/8/$1 ");
    html = html.replace(/\b(\d{1,2})\.Sep\.(\d{4})(?: at )?/g, "$2/9/$1 ");
    html = html.replace(/\b(\d{1,2})\.Oct\.(\d{4})(?: at )?/g, "$2/10/$1 ");
    html = html.replace(/\b(\d{1,2})\.Nov\.(\d{4})(?: at )?/g, "$2/11/$1 ");
    html = html.replace(/\b(\d{1,2})\.Dec\.(\d{4})(?: at )?/g, "$2/12/$1 ");
    return html;
};

//イベントページなら
if ( url.match(/\/joind\.in\/event\/view\/\d+/) ) {
    replaceInside($('.event-detail'), function(html) { return replaceDate(html); });
    replaceInside($('#mark-attending'), "I attended", "参加する");
    replaceInside($('.detail'), function(html) {
        html = html.replace("Write a Comment for the Event", "このイベントにコメントを書く");
        html = html.replace("What did you like about this event, and what do you", "このイベントについて良いところや、");
        html = html.replace("think could be better for the next time? Leave your feedback", "次回良くするために思ったことがありましたら、");
        html = html.replace("to help the organizers know what you liked, and what could be", "フィードバックすることで、主催者に良い点や改善すべき点を");
        html = html.replace("improved on.", "伝えることができます。");
        return html;
    });
    replaceInside($('a[href="#comment-form"]'), "Give Event Feedback", "フィードバックする");
}

//評価ページなら
if ( url.match(/\/joind\.in\/(?:talk\/view\/)?\d+/) ) {
    replaceInside($('#comment_anonymously'), "anonymously", '匿名ユーザ');
    replaceInside($('input[name="private"]').parent(), "Mark as private?", "スピーカーの人だけに見えるように投稿する");
    replaceInside($('input[name="anonymous"]').parent(), "Post anonymously?", "名前を伏せて投稿する");
    replaceInside($('label[for="rating"]'), "Rating", "評価を５段階で選択してください：");
    replaceInside($('label[for="comment"]'), function(html) {
        return html.replace("Comment\n", "").replace(" as ", "") + " としてコメントする：";
    });
    $('.info:contains(Want to comment on this talk)').hide();
    replaceSpambot();
    replaceInside($('.msg'), function(html) {
        html = html.replace("Please note: you are","注: 現在、");
        html = html.replace("not logged in","ログインしていないため、");
        html = html.replace("and will be posting anonymously!","匿名ユーザとして投稿されます！");

        html = html.replace("Comment added!","コメントを追加しました！");

        html = html.replace("Please choose a rating.","評価を選択してください。");
        html = html.replace("The Captcha field is required.","計算結果を入力してください。");
        html = html.replace("Incorrect captcha.","計算結果が正しくありません。");

        html = html.replace("Username/password combination invalid!","Username/password の組み合わせが正しくありません！");
        return html;
    });
    replaceInside($('.info'), function(html) {
        html = replaceDate(html);
        html = html.replace(" min)", "分)");
        html = html.replace("Talk at ", "トーク場所: ");
        html = html.replace("(Japanese)", "(日本語)");
        return html;
    });
    $('#comment-form').hide();
    replaceInside($('#claim_btn'), "Claim talk","このトークのスピーカー権限を要求する");
    replaceInside($('.quicklink'), "Quicklink:","ショートリンク:");
    replaceInside($('#comments'), "Comments","コメント");
    replaceInside($('#ratingbar-norating'), "You already rated this talk.","すでに評価済みです。");
    replaceButton($('form.form-talk').find('input[name="sub"]'), "Submit Comment","コメントを投稿する");
    $('a[href="/event/submit"]').closest('.box').hide();
    $('a[title="Cloud hosting Combell"]').closest('.box').hide();
    replaceInside($('#claim-dialog'), function(html) {
        html = html.replace(
            "By clicking this button you are declaring that you are the speaker responsible for it and a claim request will be sent to the administrator of the event.",
            "このボタンをクリックすることで、このトークのスピーカーは自分であると宣言でき、編集権の要求がイベントの管理者に飛びます。"
        );
        html = html.replace(
            "If the claim is approved you will be able to edit the information for this talk.",
            "要求が承認されたら、このトークの情報を編集できるようになります。"
        );
        html = html.replace("Are you sure?", "続けて良い場合は 「Yes, Proceed」 を押してください。");
        return html;
    });
    //以下、イベントが設置されているので、置き換える際には気をつけること。
    var $faq = $('.toggle-faq');
    replaceInside($faq.closest('.box').children('h4'), 'Speaker F.A.Q.', 'スピーカー向け FAQ');
    replaceInside($faq.closest('.ctn').children('p'), function(html) {
        html = html.replace('Congratulations! Your claim on this talk has been approved.', 'このトークの編集権は承認されました。');
        html = html.replace('Here are some helpful tips on frequently asked question:', 'ここではよくある質問にお答えします：');
        return html;
    });
    replaceInside($faq.find('li > .question'), function(html) {
        html = html.replace('How do I add my slides?', '自分のスライドはどうやって追加する？');
        html = html.replace('Where can I find more of my claimed talks?', '編集権のある他のトークはどこで見られる？');
        html = html.replace('Am I allowed to comment on my talk?', '自分のトークにコメントしてもいいですか？');
        return html;
    });
    replaceInside($faq.find('li > .answer'), function(html) {
        html = html.replace('You can add or edit a link to your slides by going to the', 'このリンクから、スライドを追加/編集することができます：');
        html = html.replace('for this talk and entering the URL for the slides.', '');
        html = html.replace(/You can see a listing of all your claimed talks by visiting\s+the/, 'このリンクから編集権のあるすべてのトークの一覧を見ることができます：');
        html = html.replace(/section of your account\s+page\./, '(あなたのアカウントページの中です)');
        html = html.replace("Of course! While you won't be allowed to give it a rating,", 'もちろん！ ただし評価をすることはできませんよ。');
        html = html.replace("feel free to discuss with the others giving their comments", '他のコメントと一緒に気軽にディスカッションしてください。');
        html = html.replace("about your talk.", '');
        return html;
    });
}

//ログインページなら
if ( url.match(/\/joind\.in\/user\/login/) ) {
    replaceInside($('.msg'), function(html) {
        html = html.replace("Username/password combination invalid!","Username/password の組み合わせが正しくありません！");
        return html;
    });
    replaceInside($('.row').children('p'), function(html) {
        html = html.replace("Please login below. If you do not have an account you can ","下記からログインしてください。アカウントがまだ無いなら ");
        html = html.replace('<a href="/user/register">create<\/a>','<a href="/user/register">新規登録</a>');
        html = html.replace(" a new one."," してください。");
        return html;
    });
    $('a[href="/event/submit"]').closest('.box').hide();
    $('a[title="Cloud hosting Combell"]').closest('.box').hide();
}

//登録ページなら
if ( url.match(/\/joind\.in\/user\/(?:register|manage|main)/) ) {
    replaceInside($('.msg'), function(html) {
        html = html.replace("The Username field is required.","Username は必須項目です。");
        html = html.replace("The Password field is required.","Password は必須項目です。");
        html = html.replace("The Confirm Password field is required.","Confirm Password は必須項目です。");
        html = html.replace("The Email field is required.","Email は必須項目です。");
        html = html.replace("The Captcha field is required.","計算結果を入力してください。");
        return html;
    });
    replaceInside($('.main'), function(html) {
        html = html.replace("Register a new account","アカウントの新規登録");
        html = html.replace("Use the form below to register a new account for the site.","下記のフォームを使ってアカウントを新規登録してください。");
        html = html.replace("Username, password and email address fields are required.","Username, Password, Email は必須項目です。");
        return html;
    });
    replaceInside($('label[for="email"]'), "Email","Email *");
    replaceInside($('label[for="user"]'), "Username","Username * (ログインに使うもの)");
    replaceInside($('label[for="pass"]'), "Password","Password * (ログインに使うもの)");
    replaceInside($('label[for="passc"]'), "Confirm Password","Confirm Password * (確認用にPasswordをもう一度)");
    replaceInside($('label[for="full_name"]'), "Full Name","表示される名前");
    replaceInside($('label[for="twitter"]'), "Twitter Username","Twitter アカウント");
    replaceInside($('.row').children('p'), function(html) {
        html = html.replace("Please login below. If you do not have an account you can ","下記からログインしてください。アカウントがまだ無いなら ");
        html = html.replace('<a href="/user/register">create<\/a>','<a href="/user/register">新規登録</a>');
        html = html.replace(" a new one."," してください。");
        return html;
    });
    $('input:submit[value="Register"]').val("登録する");
    $('input:submit[value="Save changes"]').val("変更を保存する");
    $('.menu a[href="/user/main"]').text("ダッシュボード");
    $('.menu a[href="/user/manage"]').text("アカウントを変更");
    replaceSpambot();

    $('a[href="/event/submit"]').closest('.box').hide();
    $('a[title="Cloud hosting Combell"]').closest('.box').hide();
}

//共通
replaceInside($('#sidebar_user').closest('.box'), function(html) {
    html = html.replace("Or login via these services:","もしくは、下記からログインする:");
    html = html.replace("Need an account?","アカウント作る：");
    html = html.replace("Register now!","今すぐ登録！");
    html = html.replace("Forgot Password","パスワード忘れた場合");
    return html;
});
