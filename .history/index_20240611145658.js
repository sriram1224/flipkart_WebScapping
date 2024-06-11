const { get } = require('axios');
const cheerio = require('cheerio');

(async () => {
    const url = "https://www.amazon.in/s?k=phones";
    try {
        const res = await get(url);
        console.log(res.data);
        const html = res.data;
        const $ = cheerio.load(html);
    }
    catch (error) {
        console.log(error);
    }

}) ();