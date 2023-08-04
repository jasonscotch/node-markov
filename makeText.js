const fs = require('fs');
const markovMachine = require("./markov")
const process = require('process');
const axios = require('axios');

function createText(text) {
    let mm = new markovMachine.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            createText(data);
        } 
    })
}

async function makeWebText(url) {
    try {
        let res = await axios.get(url);
        createText(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

let option = process.argv[2];
let entry = process.argv[3];

if (option === 'file') {
    makeText(entry);
} 
else if (option === 'url') {
    if (isValidURL(entry) === true) {
        makeWebText(entry);
    } else {
        console.log(`Error fetching ${url}`); 
    }
} else {
    console.log(`Not sure what you want me to do with this... ${option}`);
    process.exit(1);
}

