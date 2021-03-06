chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({showCpu: true}, function() {});
  handleListener();
});

chrome.runtime.onStartup.addListener(function() {
  handleListener();
});

function updateCpuUsage(update) {
  for (var key in update) {
    const cpu = update[key].cpu;
    const tabId = update[key].tasks[0].tabId;
    if (tabId) {
      chrome.tabs.get(tabId, function(tab) {
        const title = tab.title.split("% ", 2).pop();
        chrome.tabs.executeScript(
          tabId,
          { code:'document.title = "' + Math.round(cpu) + '% ' + title + '"'},
          _=>{ chrome.runtime.lastError }
        );
      });
    };
  };
};

function handleListener() {
  chrome.storage.local.get('showCpu', function(data) {
    console.log('handle: ' + data.showCpu);
    if (data.showCpu) {
      chrome.processes.onUpdated.addListener(updateCpuUsage);
      chrome.browserAction.setBadgeText({text: 'on'});
      chrome.browserAction.setBadgeBackgroundColor({color: 'blue'});
    } else {
      chrome.processes.onUpdated.removeListener(updateCpuUsage);
      chrome.browserAction.setBadgeText({text: 'off'});
      chrome.browserAction.setBadgeBackgroundColor({color: 'black'});
    };
  });
};

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.local.get('showCpu', function(data) {
    console.log('set to: ' + !data.showCpu);
    
    chrome.storage.local.set({ showCpu: !data.showCpu}, function() {});
    handleListener();
  });
});
