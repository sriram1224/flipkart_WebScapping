const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

const fetchData = async (url, retries = 3) => {
    while (retries > 0) {
        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
            await page.goto(url, { waitUntil: 'networkidle2' });

            const data = await page.evaluate(() => {
                const data = [];
                data.push(['Name', 'Price', 'Rating', 'Number of Ratings']);

                const phones = document.querySelectorAll('.tUxRFH'); // Update selector to match phone containers

                phones.forEach((elem) => {
                    const title = elem.querySelector('.KzDlHZ')?.textContent || 'N/A'; // Title selector
                    const price = elem.querySelector('.Nx9bqj._4b5DiR')?.textContent || 'N/A'; // Price selector
                    const rating = elem.querySelector('.XQDdHH')?.textContent || 'N/A'; // Rating selector
                    const numberOfRatings = elem.querySelector('Wphh3N span')?.textContent || 'N/A'; // Number of ratings selector

                    // Ensure we only add rows with title and price
                    if (title && price) {
                        data.push([title, price, rating, numberOfRatings]);
                    }
                });

                return data;
            });

            await browser.close();
            return data;
        } catch (error) {
            retries -= 1;
            console.error(`Request failed. Retries left: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        }
    }

    throw new Error('Failed to fetch data after multiple attempts');
};

(async () => {
    const url = "https://www.flipkart.com/search?q=phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
    try {
        const data = await fetchData(url);

        const workbook = xlsx.utils.book_new();
        const sheet = xlsx.utils.aoa_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, sheet, 'Flipkart Phones');
        xlsx.writeFile(workbook, 'FlipkartPhones.xlsx');
        console.log('File created');

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})();
