

$(document).ready(() => {

  $('#tweet-form').submit(function(event) {
    const tweetValue = $('#tweet-text').val();
    event.preventDefault();
    if (tweetValue === null || tweetValue === "") {
      alert('You must tweet something to submit!');
    } else if (tweetValue.length > 140) {
      alert('Your tweet exceeds the maximum characters allowed!');
    } else {
      $.ajax('/tweets', { method: 'POST', data: $('#tweet-form').serialize() }).then(function() { loadTweets() })
    };
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' }).then((result) => renderTweets(result));
  };
  loadTweets();
});

const escaper = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  let container = $(".all-tweets");
  container.text("");
  for (const tweet of tweets) {
    container.prepend(createTweetElement(tweet));
  };
};



const createTweetElement = function(tweet) {
  const ago = timeago.format(tweet.created_at);
  let $tweet = `<article>
  <div class="tweet">
  <header>
    <div class="avatar-name">
    <img src="${tweet.user.avatars}" alt="avatar">
      <span class="author">${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <label class="tweeted" for="tweetInfo">${escaper(tweet.content.text)}</label>
  <footer class="date-time">
    <div class="bottom-tweet">
      <div class tweet-ago>
        <time datetime="2022-08-11 18:00">${ago}</time>
      </div>
      <div class="emojis">
        <div class="flag"><i class="fa-solid fa-flag"></i></div>
        <div class="retweet"><i class="fa-solid fa-retweet"></i></div>
        <div class="heart"><i class="fa-solid fa-heart"></i></div>
      </div>
    </div>
  </footer>
</article>`;
  return $tweet;
};