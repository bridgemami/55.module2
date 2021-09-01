const http = require("http");
const fs = require('fs').promises;

const requestListner = function (req, res) {
    console.log(req.url);
    if (req.url === "/") {
    fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            res.writeHead(200);
            res.end(contents);
        });
} 
else {
  fs.readFile(__dirname + "/data.json")
  .then(contents => {
    res.setHeader("Content-Type", "application/json; charset=UTF-8");
    res.writeHead(200);
    res.end(contents);
  });
}
};

const server= http.createServer(requestListner);
const host = "0.0.0.0";
const port = "8080";
server.listen(port, host, () => {console.log(`Server is running on http://${host}:${port}`);});
