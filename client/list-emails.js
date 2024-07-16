function updateUIWithEmailCount(totalEmailsCollected) {
  const emailsCount = document.querySelector(".emails-count");
  emailsCount.innerText = totalEmailsCollected;
}
chrome.storage.local.get({ extractedEmails: [] }, function (result) {
  let emailsList = document.querySelector(".emails-list");
  let totalEmailsCollected = result.extractedEmails.length;

  result.extractedEmails.forEach((each, i) => {
    let listItem = document.createElement("li");
    listItem.textContent = `${i + 1}. ${each}`;
    emailsList.appendChild(listItem);
  });
  updateUIWithEmailCount(totalEmailsCollected);
});
