$('documnet').ready( () => {
  $('.search-input').focus();
});

$('.search-button').on('click', getSearchTerm);
$('.search-input').on('keyup', (e) => {
  if(e.keyCode === 13) {
    getSearchTerm(e);
  }
});

function getSearchTerm(e) {
  e.preventDefault();
  let searchTerm = $('.search-input').val();
  let wikiURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&callback=?`;
  $('.search-input').val('').focus();
  getWikiData(wikiURL);
}

function getWikiData(wikiURL) {
  $('.links-section').html('');
  $.getJSON(wikiURL, (data) => {
    for(let i = 0; i < 10; i++) {
      displayResult(data.query.search[i]);
    }
  });
}

function displayResult(result) {
  $('.links-section').append(`
    <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">
      <article class="result-article">
        <h2>${result.title}</h2>
        <p>${result.snippet}</p>
      </article>
    </a>`);
}
