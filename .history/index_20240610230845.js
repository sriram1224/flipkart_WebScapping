import axios from "axios";

(async () => {
    const url = "https://www.amazon.in/s?k=phones";
    const res = await axios.get(url);
    console.log(res.data);
    
}) ();