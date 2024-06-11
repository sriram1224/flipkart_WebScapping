
```markdown
# Flipkart Phones Scraper

This repository contains a Node.js script that scrapes phone details from Flipkart and saves the data to an Excel file.

## Features

- Scrapes phone name, price, rating, and number of ratings from Flipkart.
- Saves the scraped data into an Excel file (`FlipkartPhones.xlsx`).

## Prerequisites

- [Node.js](https://nodejs.org/) (v12.x or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sriram1224/flipkart_WebScrapping.git
    cd flipkart_WebScrapping
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

To run the script and scrape the data, execute the following command:

```bash
node index.js
```

The script will open a headless browser, navigate to Flipkart, and scrape the phone data. The data will be saved into an Excel file named `FlipkartPhones.xlsx` in the same directory.

## Configuration

You can configure the URL to scrape by modifying the `url` variable in `index.js`:

```javascript
const url = "https://www.flipkart.com/search?q=phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
```

## Error Handling

The script includes basic error handling and retry logic. If a request fails, it will retry up to 3 times before throwing an error.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless Chrome Node.js API.
- [xlsx](https://github.com/SheetJS/sheetjs) - A library for parsing and writing Excel spreadsheets.

## Troubleshooting

If you encounter issues, try the following steps:

- Ensure that you have the correct version of Node.js installed.
- Check your internet connection.
- Review the console output for any error messages.

For further assistance, feel free to open an issue on GitHub.

```

