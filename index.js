const fs = require('fs')
const axios = require('axios')
const anymatch = require('anymatch')

async function exec () {
    let array = fs.readFileSync(process.argv.slice(2)[0]).toString().replace(/\r/g, '').split('\n')
    let re = /(chrome\.google\.com\/webstore\/detail\/[a-zA-Z\-]*\/[a-z]*)/
    array.pop()
    for (let i = 0; i < array.length; i++) {
        let url = array[i]
        axios(url).catch(err => {
            console.log(url + ', request error')
        }).then((data) => {
            try {
                let result = [...data.data.match(re)][0]
                console.log(url + ', https://' + result)
            } catch (e) {
                console.log(url + ', not found')
            }
        })
        // Comment this if you don't have too much github projects, used to avoid github server detect us as scraping program
        // await sleep(1000 * Math.random())
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

exec().then()
