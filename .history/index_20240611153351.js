const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url, retries = 3) => {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    };

    while (retries > 0) {
        try {
            const res = await axios.get(url, { headers });
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 500) {
                retries -= 1;
                console.error(`Request failed with status code 500. Retries left: ${retries}`);
                await sleep(2000); // Wait for 2 seconds before retrying
            } else {
                throw error;
            }
        }
    }

    throw new Error('Failed to fetch data after multiple attempts');
};

(async () => {
    const url = "https://www.flipkart.com/search?q=phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
    try {
        const html = await fetchData(url);

        const $ = cheerio.load(html);
        const data = [];
        data.push(['Name', 'Price', 'Rating', 'Number of Ratings']);

        const phones = $('.tUxRFH'); // Update selector to match phone containers

        phones.each((_, elem) => {
            const container = $(elem);
            const title = container.find('.KzDlHZ').text(); // Title selector
            const price = container.find('.Nx9bqj _4b5DiR').text(); // Price selector
            const rating = container.find('.XQDdHH').text(); // Rating selector
            const numberOfRatings = container.find('Wphh3N span').first().text(); // Number of ratings selector
            if (title && price) { // Ensure we only add rows with title and price
                data.push([title, price, rating, numberOfRatings]);
            }
           
        });

        const workbook = xlsx.utils.book_new();
        const sheet = xlsx.utils.aoa_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, sheet, 'Flipkart Phones');
        xlsx.writeFile(workbook, 'FlipkartPhones.xlsx');
        console.log('File created');

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})();
