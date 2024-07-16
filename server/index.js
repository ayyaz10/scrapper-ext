const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// so we get form encoded data
app.use(express.urlencoded({ extend: true }));

app.post("/postdata", async (req, res) => {
  console.log(req.body);
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();
  const spreadsheetId = process.env.SHEET_ID;

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[req.body.emails]],
    },
  });

  res.send(getRows.data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
