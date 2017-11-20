$('.search-button').on('click', getSearchTerm);
$('.search-input').on('keyup', () => {
  if(event.keyCode === 13) {
    getSearchTerm();
  }
});

function getSearchTerm() {
  let searchTerm = $('.search-input').val();
  let wikiURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&callback=?`;
  getWikiData(wikiURL);
}

function getWikiData(wikiURL) {
  $.getJSON(wikiURL, (data) => {
  $('.links-section').html('');
    for(let i = 0; i < 10; i++) {
      displayResult(data.query.search[i]);
    }
  });
}

function displayResult(result) {
  $('.links-section').append(`
    <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">
      <div>
        <h2>${result.title}</h2>
        <p>${result.snippet}</p>
      </div>
    </a>`);
}
