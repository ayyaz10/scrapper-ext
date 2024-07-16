// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content.js"],
//   });
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.clearLocalStorage) {
//     // Clear local storage
//     chrome.storage.local.clear(function () {
//       console.log("Local storage cleared");
//       // Send a response indicating success or failure
//       sendResponse({ success: true });
//     });
//     // Return true to indicate that sendResponse will be called asynchronously
//     return true;
//   }
// });
