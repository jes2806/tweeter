

$(document).ready(() => {

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    $.ajax('/tweets', { method: 'POST', data: $('#tweet-form').serialize() }).then(function() { })
  })

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' }).then((result) => renderTweets(result));
  };
  loadTweets();
});


const renderTweets = function(tweets) {
  let container = $(".all-tweets");
  container.html("");
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
  <label class="tweeted" for="tweetInfo">${(tweet.content.text)}</label>
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