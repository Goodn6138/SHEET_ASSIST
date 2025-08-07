function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("AI Assistant")
    .addItem("Reverse Message", "openReverseDialog")
    .addToUi();
}

function openReverseDialog() {
  const html = HtmlService.createHtmlOutputFromFile("UI")
    .setWidth(400)
    .setHeight(250);
  SpreadsheetApp.getUi().showModalDialog(html, "Reverse Text");
}

function reverseMessageFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const cell = sheet.getActiveCell();
  const userMessage = cell.getValue();

  const url = "https://your-fastapi-app.onrender.com/echo-reverse"; // Replace with your actual Render URL

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ message: userMessage }),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    return result.reversed || "Invalid response from server";
  } catch (e) {
    return "Error: " + e.message;
  }
}

