chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({
    tabId: tab.id
  });
  const nextState = prevState === 'OFF' ? 'ON' : 'OFF';
  chrome.action.setBadgeText({
    text: nextState
  });

  if (nextState === 'ON') {
    await chrome.scripting.executeScript({
      files: ['lib/Readability.js'],
      target: { tabId: tab.id }
    });
    await chrome.scripting.executeScript({
      files: ['inject/script.js'],
      target: { tabId: tab.id }
    });
    await chrome.scripting.insertCSS({
      files: ['inject/style.css'],
      target: { tabId: tab.id }
    });
  }

  else if (nextState === 'OFF') {
    await chrome.scripting.executeScript({
      func: reloadPage,
      target: { tabId: tab.id }
    })
  }
});

function reloadPage() {
  window.location.reload();
}