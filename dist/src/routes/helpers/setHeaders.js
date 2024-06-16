export default function setHeaders(res) {
    res.set("Access-Control-Allow-Origin", "https://api-dwuk-banking-app-2c5a96dde0e1.herokuapp.com");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
}
