const fs = require('fs')
const {Trie} = require('./trie')
const {ConvertMe} = require('./ip2bin');

try {
    // read contents of the file
    //const data = fs.readFileSync('/Users/edwardk/Desktop/JS/networks_project/prefix_table/input', 'UTF-8');
    const data = fs.readFileSync( process.argv[2],'UTF-8');
    // split the contents by new line
    const lines = data.split(/\r?\n/);

    var trie = new Trie() 

    lines.forEach((line) => {
        const actions = line.split(' ');
         console.log(actions)
         const parsedIP = ConvertMe(actions[1])
        if(actions[0].toLowerCase() == 'add'){
            trie.add(parsedIP.subnet,actions[2])
        }
        else if(actions[0].toLowerCase() == 'find'){
            trie.find(parsedIP.subnet)
        }
        else if(actions[0].toLowerCase() == 'remove'){
            trie.remove(parsedIP.subnet,actions[2])
        }
    });
    //fs.writeFileSync('outputTrie.json', util.inspect(trie,{depth:Infinity}))
} catch (err) {
    console.error(err);
}