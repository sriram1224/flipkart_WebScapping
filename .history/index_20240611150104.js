const { get } = require('axios');
const cheerio = require('cheerio');

(async () => {
    const url = "https://www.amazon.in/s?k=phones";
    try {
        const res = await get(url);
        
        const html = res.data;
        const $ = cheerio.load(html);
        const phones = $('.data-component-type="s-search-result"');
        console.log(phones.length);

    }
    catch (error) {
        console.log(error);
    }

}) ();