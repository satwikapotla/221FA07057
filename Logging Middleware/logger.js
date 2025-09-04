require('dotenv').config();
const axios=require('axios');
const AUTH_TOKEN=process.env.AUTH_TOKEN;
const LOG_API_URL='http://20.244.56.144/evaluation-service/logs';
const ALLOWED_STACKS=["backend","frontend"];
const ALLOWED_LEVELS=["debug","warn","error","fatal"];
const ALLOWED_PACKAGES=["cache","controller","cron job","domain","repository","route","service","component","hook","page","state","style","auth","config","middleware","utils"];
async function Log(stack,level,pkg,message){
if(!ALLOWED_STACKS.includes(stack)){
console.error(`[Logger Error] Invalid stack: "${stack}"`);
return;
}
if(!ALLOWED_LEVELS.includes(level)){
console.error(`[Logger Error] Invalid level: "${level}"`);
return;
}
if(!ALLOWED_PACKAGES.includes(pkg)){
console.error(`[Logger Error] Invalid package: "${pkg}"`);
return;
}
if(!message||typeof message!=='string'){
console.error(`[Logger Error] Message must be a non-empty string.`);
return;
}
const headers={'Authorization':`Bearer ${AUTH_TOKEN}`,'Content-Type':'application/json'};
const body={stack:stack,level:level,package:pkg,message:message};
try{
const response=await axios.post(LOG_API_URL,body,{headers});
console.log(`[Logger Info] Log sent successfully. LogID: ${response.data.logID}`);
}catch(error){
console.error('[Logger Error] Failed to send log to server.');
if(error.response){
console.error(`  - Status: ${error.response.status}`);
console.error(`  - Data: ${JSON.stringify(error.response.data)}`);
}else{
console.error(`  - Error: ${error.message}`);
}
}
}
module.exports={Log};