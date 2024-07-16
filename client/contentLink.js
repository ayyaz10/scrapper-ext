console.log("hello world from content js");
let stopOpeningLinks = false;
window.onload = function () {
  const emails = extractEmails();
  if (emails.length > 0) {
    checkAndSendEmail(emails);
    // console.log("may email", emails[0]);
    // sendToGS(emails[0]);
  }
};

function extractEmails() {
  const bodyText = document.body.innerText;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7})/g;
  const emails = bodyText.match(emailRegex);
  return emails ? [...new Set(emails)] : [];
}

// function saveEmail() {
//   const emails = extractEmails();
//   console.log(emails);
//   chrome.storage.local.set({ emails }, function () {
//     console.log("Email " + emails + " is stored in local");

//     chrome.runtime.onMessage.addListener(function (
//       request,
//       sender,
//       sendResponse
//     ) {
//       if (request.action === "combineData") {
//         combineAndStoreData();
//       }
//     });
//   });
// }

// function combineAndStoreData() {
//   chrome.storage.local.get(["emails", "pageNumber"], function (result) {
//     if (result.emails && result.pageNumber !== undefined) {
//       const combinedData = {
//         emails: result.emails,
//         pageNumber: result.pageNumber,
//       };

//       console.log(combinedData);
//       // Store the combined data
//       chrome.storage.local.set({ userData: combinedData }, function () {
//         console.log(
//           "Combined data stored in chrome.storage.local:",
//           combinedData
//         );
//       });
//     } else {
//       console.log("Email or page data not found in chrome.storage.local.");
//     }
//   });
// }

function checkAndSendEmail(emails) {
  console.log(emails);
  // console.log(currentPage);
  chrome.storage.local.get({ extractedEmails: [] }, function (result) {
    let existingEmails = result.extractedEmails || [];
    console.log("test", existingEmails.includes(emails));

    if (!existingEmails.includes(emails[0])) {
      let updatedEmails = [...new Set([...existingEmails, ...emails])];
      chrome.storage.local.set({ extractedEmails: updatedEmails }, function () {
        sendToGS(emails[0]);
        console.log("Emails saved to local storage");
      });
    } else {
      console.log("Email has already been sent:", emails);
    }
  });
}
async function sendToGS(emails) {
  console.log("push to server");
  try {
    const data = { emails: emails };
    console.log("inside send to gs" + data);
    const res = await fetch("http://localhost:5000/postdata", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const response = await res.json();
    console.log(response);
  } catch (error) {
    console.error("Error sending data to Google Sheets:", error);
  }
}
setTimeout(function () {
  console.log("Window is going to be closed");
  window.close();
}, 8000);
// chrome.runtime.onMessage.addListener(function (message) {
//   console.log(message);
//   if (message.clearStorageClicked !== undefined) {
//     clearStorage(message.clearStorageClicked);
//   }
// });
