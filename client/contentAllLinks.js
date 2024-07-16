console.log("main");

const stopOpeningLinks = false;

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    const nextButton = document.querySelector("button.icon-right");
    nextButton.click();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "ControlRight") {
    openAllLinksInNewTabs();
  }
});

function openedNextPage() {
  const nextButton = document.querySelector("button.icon-right");
  nextButton.click();
}

setTimeout(() => {
  openAllLinksInNewTabs();
}, 3000);

function getAndStorePageNumber() {
  const pageNumber = document.querySelector(".numbertext--current").textContent;
  console.log("page number ", pageNumber);
  chrome.storage.local.set({ page: pageNumber });
}

function openAllLinksInNewTabs() {
  const anchors = document.querySelectorAll("a.entry-detail-link");
  getAndStorePageNumber();

  const totalLinks = anchors.length;
  let openedLinksCount = 0;

  anchors.forEach((anchor, index) => {
    setTimeout(() => {
      if (stopOpeningLinks) {
        console.log("Link opening stopped.");
        return;
      }
      if (anchor && anchor.href) {
        const width = 1;
        const height = 1;
        const left = (screen.width - width) / 2 + index * 10; // Adjust position slightly for each window
        const top = (screen.height - height) / 2 + index * 10; // Adjust position slightly for each window
        window.open(
          anchor.href,
          "_blank",
          `width=${width},height=${height},right=0,top=0`
        );
        console.log("Contact", openedLinksCount + 1);
        openedLinksCount++;
        if (openedLinksCount === totalLinks) {
          console.log("All emails are extracted, next page is opening");
          setTimeout(() => {
            openedNextPage();
          }, 4000);
        }
      }
    }, 3000 * index); // Delay increases by 3 seconds for each link
  });
}

function messageButtonClicked(message) {
  console.log(message);
  if (message) {
    openAllLinksInNewTabs();
  }
}
function handleMessage(message) {
  if (
    message.openAllClicked !== undefined ||
    message.stopOpeningLinks !== undefined
  ) {
    if (message.openAllClicked) {
      messageButtonClicked(message.openAllClicked);
    } else if (message.stopOpeningLinks) {
      stopOpeningLinks = message.stopOpeningLinks;
    }
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
