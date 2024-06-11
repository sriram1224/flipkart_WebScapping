const { get } = require('axios');
const cheerio = require('cheerio');

(async () => {
    const url = "https://www.amazon.in/s?k=phones";
    try {
        const res = await get(url);
        
        const html = res.data;
        const $ = cheerio.load(html);
        const phones = $('[data-component-type="s-search-result"]');
        phones.each((_, elem) => {
            const container = $(elem)
            const title = container.find('h2').text();
            const price = container.find('.a-price-whole').text();
            const rating = container.find('.a-icon-star-small').text();
            const numberOfRatings = container.find('.a-size-base').text();
            console.log(,title, price, rating, numberOfRatings);
        });

    }
    catch (error) {
        console.log(error);
    }

}) ();