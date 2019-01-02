chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.URL) {

      if (request.URL.indexOf("wiley") > -1) {
        var author = document.head.querySelector("[name='citation_author']").content; 
        var year = document.head.querySelector("[name='citation_publication_date']").content.slice(0,4);
      }

      else if (request.URL.indexOf("sciencedirect") > -1) {
        var author = document.querySelector('div.author-group span.text.given-name').innerText + ' ' + document.querySelector('div.author-group span.text.surname').innerText;
        var year = document.head.querySelector("[name='citation_publication_date']").content.slice(0,4); 
      } 

      else if (request.URL.indexOf("ncbi.nlm.nih.gov/pmc/articles/") > -1) {
        var author = document.head.querySelector("[name='DC.Contributor']").content;
        var year = document.head.querySelector("[name='DC.Date']").content.slice(0,4);
      } 

      else if (request.URL.indexOf("pubmed") > -1) {
        var author = document.querySelector('div.auths a').innerText;
        var year = document.querySelector('div.cit').innerText.slice(-12,-8);
      }

      else if (request.URL.indexOf("jb.asm.org") > -1) {
        var author = document.querySelector('a.name-search').innerText;
        var year = document.querySelector('div#slugline span span').innerText.slice(-4);
      }

      else if (request.URL.indexOf("springer") > -1) {
        var author = document.head.querySelector("[name='citation_author']").content;
        var year = document.head.querySelector("[name='citation_cover_date']").content.slice(0,4);
      }

    }

    var modifyCopy = e => { 

      var selectedText = window.getSelection().toString();         
      selectedText = selectedText.replace(/\u200B/g, "");   
      console.log(author + " " + year);
      newText = selectedText + ' (' + author + ', ' + year + ')';   

      clipboardData = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;        
      clipboardData.setData('text/html', newText);        

      e.preventDefault();
    }; 

    document.addEventListener('copy', modifyCopy);

  });