const path=require ('path');
var crypto = require("crypto");
const http2 = require('http2');

class Http2Fuzzer{

    ip;
    port;
    numberOfRequests;
    constructor(ip, port,numberOfRequests) {
      
        this.ip = ip;  
        this.port = port;
        this.numberOfRequests=numberOfRequests;
      }
      connectToServer(){
        let address= 'http://'.concat(this.ip).concat(':').concat(this.port).concat('/');
        const client = http2.connect(address);
          return client;
      }
      generateRandomUrl(url) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;\'///:",.<>/?\\';
        
        const length = Math.floor(Math.random() * 20) + 4;

        let randomString = '';
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log("Generated String ",randomString);
        const n = Math.floor(Math.random() * url.length);
        const firstPart = url.substr(0, n);
        return firstPart.concat(randomString);

      }

      requestFuzz(client,method,path){
        console.log(method,' ', path)
        
        for (let i = 0; i <  this.numberOfRequests ; i++) {
            var urlGenerated=this.generateRandomUrl(path);

            console.log(`Making request ${i + 1}... with this path: `,urlGenerated);
            const req = client.request({
                   ':method': method,         
                   ':path': urlGenerated
              });
              req.on('response', (headers) => {
                 console.log(headers[':status']);
               });
               req.on('end', () => {
                 client.close();
               });
               req.end();
            }
        

      } 

}
module.exports=Http2Fuzzer;