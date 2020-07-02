const toggle = document.getElementById('toggle');
let showCpu;
let console = chrome.extension.getBackgroundPage().console;

chrome.storage.sync.get('showCpu', function(data) {
  console.log(data);
  showCpu = data.showCpu;
  toggle.innerHTML = 'Show usage: ' + showCpu;
});


toggle.onclick = function(element) {
  console.log(showCpu);
  showCpu = !showCpu
  chrome.storage.sync.set({showCpu: showCpu}, function() {});
  toggle.innerHTML = 'Show usage: ' + showCpu;
};
