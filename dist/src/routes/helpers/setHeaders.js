export default function setHeaders(res) {
    res.set("Access-Control-Allow-Origin", "https://herokuapp.com");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
}
