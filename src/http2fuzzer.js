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
        let address= 'https://'.concat(this.ip).concat(':').concat(this.port).concat('/');
        const client = http2.connect(address,{
          requestCert: false, // put true if you want a client certificate, tested and it works
          rejectUnauthorized: false
          });
          return client;
      }
      generateRandomUrl(url) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;\'///:",.<>/?\\'+'\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u1F00-\u1FFF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBF';
        
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