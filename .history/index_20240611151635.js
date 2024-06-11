const { get } = require('axios');
const cheerio = require('cheerio');
const xlsx  = require('xlsx');
(async () => {
    const url = "https://www.amazon.in/s?k=phones";
    try {
        const res = await get(url);
        
        const html = res.data;
        const $ = cheerio.load(html);
        const data = [];
        data.push(['Name', 'Price', 'Rating', 'Number of Ratings']);


        const phones = $('[data-component-type="s-search-result"]');
        phones.each((_, elem) => {
            const container = $(elem)
            const title = container.find('h2').text();
            const price = container.find('.a-price-whole').text();
            const rating = container.find('.a-icon-star-small').text();
            const numberOfRatings = container.find('span.a-size-base.s-underline-text').text();
            data.push([title, price, rating, numberOfRatings]);

        });

    }
    catch (error) {
        console.log(error);
    }

}) ();