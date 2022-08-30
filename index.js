// load the core node http module
const http = require('http');

// load the core node filesystem (fs) module, using js promises instead of callbacks
// a promise represents eventual completion of asynch operation and its result
const fs = require('fs').promises;

// create a function to respond to http requests
// special variable __dirname has absolute path of where node code is running
// if fs.readFile() successful, it returns data 
// use then() method to handle success - contents parameter contains HTML file data
const requestListener = function (myRequest, myResponse) {
    // output request url
  console.log(myRequest.url);

  if (myRequest.url === "/") {
    // check request url, if root, return html file
    //special variable __dirname has absolute path of where node code is running
    fs.readFile (__dirname + "/page.html"  ).then( contents => {
     // set http response header entry
      myResponse.setHeader("Content-Type", "text/html; charset= UTF-8");
      // return 200 OK http status code
      myResponse.writeHead(200);
      // send back file contents + close response
      myResponse.end(contents);
    } 
   )
  }
  else {
    // if request url not root, return json file
    fs.readFile (__dirname + "/data.json"  ).then( contents => {
    // set http response header entry
      myResponse.setHeader("Content-Type", "application/json; charset= UTF-8");
  // return 200 OK http status code
    myResponse.writeHead(200);
      myResponse.end(contents);}
   )
  } 
}
//create an http server instance
const server = http.createServer(requestListener);

// define the TCP port and IP address to tell our http server to listen to
const host = "0.0.0.0";
// repl.it is going to override this from localhost to your workspace webview host URL
const port = "8080";
//repl.it is going to override this to use port 443(SSL https)
// call the listen () method to start listening to http requests
server.listen(
  port, host, () => {
    console.log('Server is running');
  }
)
