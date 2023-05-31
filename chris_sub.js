const { createClient} = require ("redis");
const client = createClient( {
    url:'redis://chris:123456@127.0.0.1:6379/0'
});


async function co_redis() {

    await client.connect();
    const  listener = (message, channel) => console.log(message, channel)
    await client.subscribe('aden', listener)
    await client.disconnect();



}
co_redis();
