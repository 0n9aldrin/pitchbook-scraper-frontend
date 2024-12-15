// content.js

// Log to verify that the content script is loaded
console.log('PitchBook Scraper: Content script loaded.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeData') {
    console.log('PitchBook Scraper: Received scrapeData message.');

    const persons = [];
    const maxRows = 300;

    for (let i = 0; i < maxRows; i++) {
      const row = i;
      const position = document.querySelector(`#search-results-data-table-row-${row}-cell-3`)?.innerText.trim() || '';
      const company = document.querySelector(`#search-results-data-table-row-${row}-cell-4`)?.innerText.trim() || '';
      const nameText = document.querySelector(`#search-results-data-table-row-${row}-cell-7`)?.innerText.trim() || '';
      const email = document.querySelector(`#search-results-data-table-row-${row}-cell-10`)?.innerText.trim() || '';

      if (!email) continue; // Stop if no email found

      const nameParts = GetName(nameText);

      const person = {
        // title: nameParts.title,
        firstName: nameParts.firstName,
        lastName: nameParts.lastName,
        email,
        position,
        company
      };

      persons.push(person);
    }

    console.log('PitchBook Scraper: Scraped persons:', persons);
    sendResponse({ data: persons });
  }
});

// Helper function to parse the name
function GetName(text) {
  const parts = text.split(' ').slice(0, 3);
  return {
    title: parts[0] || '',
    firstName: parts[1] || '',
    lastName: parts[2] || ''
  };
}
