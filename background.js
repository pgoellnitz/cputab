chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({showCpu: true}, function() {});
});

chrome.processes.onUpdated.addListener(function(update) {
  //console.log(update);
  chrome.storage.sync.get('showCpu', function(data) {
    if (data.showCpu) {
      for (var key in update) {
        const cpu = update[key].cpu;
        const tabId = update[key].tasks[0].tabId;
        if (tabId) {
          chrome.tabs.get(tabId, function(tab) {
            const title = tab.title.split(" ").pop()
            chrome.tabs.executeScript(
              tabId,
              { code:'document.title = "' + Math.round(cpu) + '% ' + title + '"'},
              _=>{ chrome.runtime.lastError }
            );
          })
        }
      }
    }
  });
});
