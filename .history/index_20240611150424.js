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
            const title = $(elem).find('h2').text();
            const price = $(elem).find('.a-price-whole').text();
            console.log(title, price);
        });

    }
    catch (error) {
        console.log(error);
    }

}) ();