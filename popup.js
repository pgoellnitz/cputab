const toggle = document.getElementById('toggle');
let showCpu;
let console = chrome.extension.getBackgroundPage().console;

chrome.storage.sync.get('showCpu', function(data) {
  console.log(data);
  showCpu = data.showCpu;
  setToggleMenu()
});


toggle.onclick = function(element) {
  console.log(showCpu);
  showCpu = !showCpu
  chrome.storage.sync.set({showCpu: showCpu}, function() {});
  setToggleMenu()
};

function setToggleMenu() {
  toggle.innerHTML = (showCpu ? '(on)': '(off)') + ' Show CPU usage';
}
