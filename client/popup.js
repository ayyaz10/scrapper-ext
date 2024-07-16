document.addEventListener("DOMContentLoaded", function () {
  let stopOpeningLinks = false;

  var openAllLinksBtn = document.querySelector(".eae");
  var scrapEmails = document.querySelector(".sc");
  var viewEmails = document.querySelector(".ve");
  var stopExtracting = document.querySelector(".se");
  var clearStorage = document.querySelector(".cls");

  let openAllClicked = false;
  let scrapEmailsClicked = false;

  viewEmails.addEventListener("click", () => {
    let link = chrome.tabs.create({
      url: chrome.runtime.getURL("list-emails.html"),
    });
    console.log(link);
  });

  chrome.storage.local.get({ extractedEmails: [] }, function (result) {
    let emailsCount = document.querySelector(".emails-count");
    let existingEmails = result.extractedEmails || [];
    emailsCount.innerText = existingEmails.length;
  });

  openAllLinksBtn.addEventListener("click", (e) => {
    openAllClicked = true;
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          openAllClicked,
        });
      });
    });
  });

  stopExtracting.addEventListener("click", (e) => {
    stopOpeningLinks = true;
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          stopOpeningLinks,
        });
      });
    });
  });

  // currently not used
  // scrapEmails.addEventListener("click", (e) => {
  //   scrapEmailsClicked = true;
  //   chrome.tabs.query({}, function (tabs) {
  //     tabs.forEach((tab) => {
  //       chrome.tabs.sendMessage(tab.id, {
  //         scrapEmailsClicked,
  //       });
  //     });
  //   });
  // });

  // Clear storage
  // clearStorage.addEventListener("click", (e) => {
  //   clearStorageClicked = true;
  //   chrome.tabs.query({}, function (tabs) {
  //     tabs.forEach((tab) => {
  //       chrome.tabs.sendMessage(tab.id, {
  //         clearStorageClicked,
  //       });
  //     });
  //   });
  // });

  function updatePageNumber() {
    let pageCount = document.querySelector(".page-count");
    chrome.storage.local.get({ page: 0 }, function (result) {
      pageCount.textContent = result.page;
    });
  }
  updatePageNumber();

  clearStorage.addEventListener("click", function clearStorage() {
    chrome.storage.local.remove(["extractedEmails"], function () {
      console.log("storage removed");

      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
    });
  });

  // Updating extract count
  chrome.storage.local.get({ extractedEmails: [] }, function (result) {
    console.log(result); // Check if this prints the correct storage object
    if (result.extractedEmails) {
      let totalEmailsCollected = result.extractedEmails.length;
      console.log(`Total Emails Collected: ${totalEmailsCollected}`); // Log the count
      // Optionally, update a DOM element with the count
      // document.querySelector('.emails-count').textContent = totalEmailsCollected;
    } else {
      console.log("No emails found in local storage.");
    }
  });
});
