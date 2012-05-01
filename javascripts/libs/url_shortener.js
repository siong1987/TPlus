// Dependency: jQuery

function UrlShortener() {
}

// The shorten method takes a url to be shortend and the callback
// is called if the function is done.
//
// params:
//   url: url to be shortened
UrlShortener.prototype.shorten = function(url) {
  response = null;
  jQuery.ajax({
    url: "http://api.bitly.com/v3/shorten?longUrl="+encodeURIComponent(url)+"&login=tengsio1&apiKey=R_5b37356e73ed02ad653fc841585ad853",
    type:     "GET",
    dataType: 'json',
    success:  function(resp, textStatus, jqXHR) {
      if(resp.status_code === 500) {
        response = "error";
      } else {
        response = resp.data.url;
      }
    },
    async:  false
  });
  return response;
}

