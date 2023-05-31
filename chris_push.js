const { createClient} = require ("redis");
const { stdin: input, stdout: output, exit } = require('process');
const { createInterface } = require('readline/promises');
const cli = createInterface({ input, output });
const client = createClient( {
    url:'redis://chris:123456@127.0.0.1:6379/0'
});


function handleCommand(cmd) {
    switch(cmd) {
        case '.exit' :
            cli.close();
            console.log('Bye !');
            exit(0);
            break;
        default:
            console.log('Unknown command :/');
            break;
    }
}
async function co_redis() {
    await client.connect();


    while(true) {
        const message = await cli.question("saisissez votre message  ");

        const startswithdot = /^\./.test(message);
        if(startswithdot) {
            handleCommand(message);
        } else {
            await client.publish('aden', message);
        }
    }

}
co_redis();
