const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {
    const url = "https://www.flipkart.com/search?q=phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the product listings to load
        await page.waitForSelector('.tUxRFH', { timeout: 60000 });

        // Extract phone data from the page
        const data = await page.evaluate(() => {
            const rows = [];
            rows.push(['Phone Name', 'Price', 'Rating', 'Number of Reviews']);

            // Select all product listing elements
            const productElements = document.querySelectorAll('.tUxRFH');

            productElements.forEach(element => {
                const phoneName = element.querySelector('.KzDlHZ') ? element.querySelector('.KzDlHZ').innerText.trim() : '';
                const price = element.querySelector('.Nx9bqj _4b5DiR') ? element.querySelector('.Nx9bqj _4b5DiR').innerText.trim() : '';
                const rating = element.querySelector('.XQDdHH') ? element.querySelector('.XQDdHH').innerText.trim() : '';
                const numberOfReviews = element.querySelector('._2_R_DZ span:nth-child(2)') ? element.querySelector('._2_R_DZ span:nth-child(2)').innerText.trim() : '';

                if (phoneName && price && rating && numberOfReviews) {
                    rows.push([phoneName, price, rating, numberOfReviews]);
                }
            });

            return rows;
        });

        console.log(`Number of phones found: ${data.length - 1}`);
        console.log(data);

        // Create an Excel file from the data
        const worksheet = xlsx.utils.aoa_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Phones');
        xlsx.writeFile(workbook, 'Flipkart_Phones.xlsx');

        await browser.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        process.exit(1);
    }
})();
