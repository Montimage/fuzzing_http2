const Http2Fuzzer=require('./http2fuzzer');


function main(){
    const args = process.argv.slice(2);
    if(args.length!=4){
      console.log(args)
      console.log("Insert ip - port - number of requests - http method");
      process.exit(1);
    }
    const [ip, port, numberOfRequests ] = args.slice(0,3);
    var index=0
    var httpMethod=args[3];
    var httpPostPath= ["/npcf-am-policy-control/v1/policies","/nudm-sdm/v2/imsi-460020301001001/sdm-subscriptions","/nausf-auth/v1/ue-authentications"];
    var httpGetPath=["/nudm-sdm/v2/imsi-460020301001001?dataset-names=AM,SMF_SEL"];
    var httpDeletePath=["/npcf-am-policy-control/v1/policies/PolAssoId31",'/nudm-sdm/v2/imsi-460020301001001/sdm-subscriptions/delete'];
    var httpPutPath=[' /nausf-auth/v1/ue-authentications/imsi-460020301001001/5g-aka-confirmation','/nudm-uecm/v1/imsi-460020301001001/registrations/amf-3gpp-access'];
    const http2Fuzzer= new Http2Fuzzer(ip,port,numberOfRequests)
    const client=http2Fuzzer.connectToServer();

    console.log("Http method",httpMethod);
    switch(httpMethod.toUpperCase()){
        case('POST'):
             index = Math.floor(Math.random() * httpPostPath.length);
             http2Fuzzer.requestFuzz(client,'POST',httpPostPath[index]);
             break;
        case("GET"):
            index = Math.floor(Math.random() * httpGetPath.length);
             http2Fuzzer.requestFuzz(client,'GET',httpGetPath[index]);
             break;
        case("PUT"):
             index = Math.floor(Math.random() * httpPutPath.length);
             http2Fuzzer.requestFuzz(client,'PUT',httpPutPath[index]);
             break;
        case ("DELETE"):
            index = Math.floor(Math.random() * httpDeletePath.length);
            http2Fuzzer.requestFuzz(client,'DELETE',httpDeletePath[index]);
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