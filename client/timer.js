console.log("Hello from timer.js"); // Initial log to check if the script runs

// window.onload = () => {
//   setTimeout(() => {
//     findStopButton();
//     console.log("Function executed after 30 seconds");
//   }, 10800000); //  3 hours delay (3 * 60 * 60 * 1000 milliseconds)
// };

function findStopButton() {
  console.log("Inside findStopButton function"); // Log inside function to ensure it's called
  const buttons = document.querySelectorAll("button"); // Changed to select button elements
  console.log("Number of buttons found:", buttons.length); // Log the number of buttons found

  for (let button of buttons) {
    console.log("Button text:", button.textContent); // Log each button's text content
    if (button.textContent.trim().toLowerCase() === "stop") {
      button.click();
      console.log("Stop button clicked");
      return; // Exit after clicking the button
    }
  }
  console.log("Stop button not found");
}
