const { get } = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');

(async () => {
    const url = "https://www.flipkart.com/search?q=phones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
    try {
        const res = await get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        const html = res.data;
        const $ = cheerio.load(html);
        const data = [];
        data.push(['Name', 'Price', 'Rating', 'Number of Ratings']);

        const phones = $('.s1Q9rs'); // Updated selector to match phone titles

        phones.each((_, elem) => {
            const container = $(elem);
            const title = container.attr('title') || container.text(); // Get title from attribute or text
            const price = container.closest('.IRpwTa').find('._30jeq3').text(); // Adjusted selector for price
            const rating = container.closest('.IRpwTa').find('._3LWZlK').text(); // Adjusted selector for rating
            const numberOfRatings = container.closest('.IRpwTa').find('._2_R_DZ span').first().text(); // Adjusted selector for number of ratings
            data.push([title, price, rating, numberOfRatings]);
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
