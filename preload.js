const os = require('os');

function toHumanReadableTime(seconds) {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }

  var days = 0
  var hours = Math.floor(seconds / (60 * 60));

  if (hours >= 24) {
    days = Math.floor(hours / 24)
    hours = Math.floor(hours - (days * 24))
  }
  var minutes = Math.floor(seconds % (60 * 60) / 60);
  var seconds = Math.floor(seconds % 60);

  console.log(days, hours, minutes, seconds)

  return `${days} days ${pad(hours)} hours ${pad(minutes)} minutes and ${pad(seconds)} seconds`;
}


function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const sysInfo = {
    'uptime': toHumanReadableTime(os.uptime()),
    'totalmem': bytesToSize(os.totalmem()),
    'freemem': bytesToSize(os.freemem())
  }


  for (const systemState of ['uptime', 'totalmem', 'freemem']) {
    // let result = eval(`os.${systemState}()`);
    replaceText(systemState, sysInfo[systemState]);
  }
})
