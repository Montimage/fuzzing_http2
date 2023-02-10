const Http2Fuzzer=require('./Http2Fuzzer');


function main(){
    const args = process.argv.slice(2);
    if(args.length!=4){
      console.log(args)
      console.log("Insert ip - port - number of requests - http method");
      process.exit(1);
    }
    const [ip, port, numberOfRequests ] = args.slice(0,3);
    var httpMethod=args[3];
    
    const http2Fuzzer= new Http2Fuzzer(ip,port,numberOfRequests)
    const client=http2Fuzzer.connectToServer();
    
    console.log("Http method",httpMethod);
    switch(httpMethod.toUpperCase()){
        case('POST'):
             http2Fuzzer.postFuzz(client);
             break;
        case("GET"):
             http2Fuzzer.getFuzz(client);
             break;
        case("PUT"):
             http2Fuzzer.putFuzz(client);
             break;
        case ("DELETE"):
            http2Fuzzer.deleteFuzz(client);
            break;
        default:
            console.log("Insert a valid http2 method: POST - GET - DELETE - PUT");
            process.exit(1);
  



    }
    
}
function testFuzz(){
    try{
        ip=localhost;
        port=2;
        numberOfRequests=23;
        const http2Fuzzer= new Http2Fuzzer(ip,port,numberOfRequests)
        http2Fuzzer.postFuzz(null);
    }
    catch(error ){
        console.error(error.message);
    }
}
main();