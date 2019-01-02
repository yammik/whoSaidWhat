function getCurrentTabUrl(callback) {
  var queryInfo = {
  	active: true,
  	currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    
    var tab = tabs[0];
    var url = tab.url;

	console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage(tab.id, {"URL" : url});
    });
});
};

getCurrentTabUrl((url) => {
  	chrome.tabs.executeScript(null, {file: "modiClip.js"});
});