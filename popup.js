// popup.js

document.getElementById('scrapeBtn').addEventListener('click', () => {
  const sheetName = document.getElementById('sheetName').value.trim();
  const statusDiv = document.getElementById('status');

  if (!sheetName) {
    statusDiv.textContent = 'Please provide the Sheet Tab Name.';
    return;
  }

  statusDiv.textContent = 'Scraping data...';

  // Execute content script to scrape data
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      statusDiv.textContent = 'No active tab found.';
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' }, async (scrapeResponse) => {
      if (chrome.runtime.lastError) {
        // console.error('Runtime Error:', chrome.runtime.lastError);
        statusDiv.textContent = 'Error Scraping: ' + chrome.runtime.lastError.message;
        return;
      }

      if (!scrapeResponse || !scrapeResponse.data) {
        statusDiv.textContent = 'Error Scraping: No data received.';
        return;
      }

      const persons = scrapeResponse.data;
      if (persons.length === 0) {
        statusDiv.textContent = 'No data found.';
        return;
      }

      // Send data to the backend server
      const serverUrl = 'https://pitchbook-scraper-server.onrender.com/append-data'; // Replace with your server's URL if deployed

      try {
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sheetName,
            data: persons
          })
        });

        const result = await response.json();

        if (response.ok) {
          statusDiv.textContent = 'Data successfully appended to Google Sheets!';
        } else {
          statusDiv.textContent = 'Error appending to spreadsheet: ' + (result.error || 'Unknown error.');
        }
      } catch (error) {
        statusDiv.textContent = 'Fetch error: ' + error.message;
      }
    });
  });
});
