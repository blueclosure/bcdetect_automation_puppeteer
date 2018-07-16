var WebSocketClient = require('ws');
try{
var wsclient = new WebSocketClient('wss://127.0.0.1:1115' , {
  rejectUnauthorized: false
});

wsclient.on('open', function open() {
  wsclient.send('{"action":"registerAlert"}');
});

wsclient.on('message', function(data, flags) {
  console.log("New Notification",JSON.parse(data));
  
});
wsclient.on('error',function(e){
  console.error("[II] Will not be able to get real time notifications",e);
})
}catch(e){
  console.error("[II] Will not be able to get real time notifications",e);
}