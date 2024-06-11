import axios from "axios";

(async () => {
    const url = "https://www.amazon.in/s?k=phones";
    try {
        const res = await axios.get(url);
    console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }

}) ();