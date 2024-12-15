# PitchBook Scraper Extension

This Chrome extension scrapes data from PitchBook and populates a Google Sheet with the scraped data.

## Features

- Scrapes data from PitchBook.
- Populates a specified Google Sheet tab with the scraped data.

## Installation

1. Clone the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on the "Load unpacked" button and select the directory where you cloned the repository.

## Usage

1. Navigate to a PitchBook and login.
2. Click on the "People" tab and set any filters you desire.
3. Click "Search".
4. Click on the PitchBook Scraper extension icon in the Chrome toolbar.
5. Enter the name of the Google Sheet tab where you want to populate the data.
6. Click the "Scrape & Populate" button.
7. The status message will update to indicate the progress and result of the scraping and populating process.

## Files

- `popup.html`: The HTML file for the extension's popup interface.
- `popup.js`: The JavaScript file for handling the popup's functionality.
- `content.js`: The content script that scrapes data from PitchBook.
- `manifest.json`: The manifest file that defines the extension's configuration.

## Permissions

- `activeTab`: Allows the extension to access the currently active tab.
- `scripting`: Allows the extension to execute scripts in the context of web pages.
- `storage`: Allows the extension to store and retrieve data.
- `host_permissions`: Allows the extension to communicate with the backend server.
