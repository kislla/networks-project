class TrieNode {
    constructor(char) {
        this.char = char; // to store the current character
        this.validWord = false; // if the current character is at the end of a whole word
        this.parent = null; // parent of the current node
        this.children = []; // children nodes
        this.action = null;
    }
}

class Trie {
    static addAll(list) {
        const trie = new Trie();

        list.forEach(trie.add.bind(trie));
        return trie;

    }
    constructor() {
        this.root = new TrieNode('');
        this.nodes = 0; // stores number of nodes,
        this.depth = 0; // stores the depth of the tree
    }

    add(word, action) {
        let current = this.root; // The searching pointer starts at the root.
        for (let i = 0; i < word.length; i += 1) {
            const ch = word[i];
            let found = false;
            // Iterating through the children nodes of the current node
            for (let j = current.children.length; j--;) {
                const child = current.children[j];
                if (child.char === ch) {
                    found = true;
                    // If we find a matching character, move the pointer to the matching child
                    current = child;
                    this.depth += 1
                    break;
                }
            }
            // If we can't find the character in the child node list, create a new node, and add it into the list
            if (!found) {
                // if (current.children.length == 0) this.depth += 1; // no siblings on the current node
                this.nodes += 1;
                current.children.push(new TrieNode(ch)); // add a child node 

                const newNode = current.children[current.children.length - 1];
                newNode.parent = current;
                // Move the pointer to the newly created node
                current = newNode;
                this.depth += 1
            }
        }
        // After the above operations, the pointer should be at the end of a word


        let found = current.parent.children.find(child => child.action) // check if the current node has a sibling with the same action
        if ( found && found.action == action) {
            console.log('ACTION ALREADY FOUND ON A SIBLING');
            this.depth -= 1;
            this.nodes -= 2;
            current = current.parent // move current up to the parent
            current.children.length = 0 // remove all the children

        }
        current.action = action; // stores the action

        current.validWord = true;
        console.log(`INSERTED: ${word} and action ${current.action}, current depth is ${this.depth} with total of ${this.nodes} nodes`)
        this.depth = 0
    }

    find(word) {
        let current = this.root;
        let depth = 0, actionDepth = 0;
        let action = current.action
        for (let i = 0; i < word.length; i += 1) {
            const ch = word[i];
            let found = false;

            for (let j = current.children.length; j--;) {
                const child = current.children[j];


                if (child.char.toLowerCase() === ch.toLowerCase()) {
                    found = true;
                    depth += 1;
                    current = child;
                    if (current.action) {
                        action = current.action;
                        actionDepth = depth;
                    }

                    break;
                }
            }

            if (!found) {
                // return false;
            }
        }
        if (action) console.log(`FOUND: ${word} - action ${action} in depth ${actionDepth}`);
        return current.validWord;
    }

    // remove(word) {
    //     let current = this.root;

    //     for (let i = 0; i < word.length; i += 1) {
    //         const ch = word[i];
    //         let found = false;
    //         for (let j = current.children.length; j--;) {
    //             const child = current.children[j];
    //             if (child.char === ch) {
    //                 found = true;
    //                 current = child;
    //                 break;
    //             }
    //         }
    //         if (!found) {
    //             // If a character of a word can't be found in the children list, then we know the word is not in the Trie
    //             return;
    //         }
    //     }
    //     // After the for loop, the pointer should be at the end of the word to be deleted
    //     current.validWord = false;

    //     let stop = false;
    //     while (!stop) {
    //         if (
    //             current.children.length === 0 && !current.validWord && current.parent) {
    //             // Operate on the parent nodes at every level upwards
    //             const { parent } = current;
    //             const childIndex = parent.children.indexOf(current);
    //             const end = parent.children.length - 1;
    //             // Swap the position of the current node and the node at the end of the list.
    //             [parent.children[childIndex], parent.children[end]] = [ parent.children[end], parent.children[childIndex]];
    //             // Now, the node to be deleted should be at the end of the list, we just need to pop it out
    //             parent.children.pop();
    //             this.nodes -=1;   // reduce the counter of nodes in trie
    //             // Move the pointer upwards
    //             current = parent;
    //             if(current.children.length==0) this.depth -=1; // reduce the counter of depth in trie
    //         } else {
    //             stop = true;
    //             console.log(`REMOVED: ${word} current depth is ${this.depth} with total of ${this.nodes} nodes`)
    //         }
    //     }
    // }
    remove(word, action) {
        let current = this.root;
        let actionDepth = 0

        for (let i = 0; i < word.length; i += 1) {
            const ch = word[i];
            let found = false;
            for (let j = current.children.length; j--;) {

                const child = current.children[j];
                if (child.char === ch) {
                    actionDepth += 1;
                    found = true;

                    current = child;
                    break;
                }
            }
            if (!found) {
                // If a character of a word can't be found in the children list, then we know the word is not in the Trie
                console.log(`${word} is not in the trie`)
                return;
            }
        }
        // After the for loop, the pointer should be at the end of the word to be deleted
        current.validWord = false;
        if (current.action == action) {
            //console.log(`action ${current.action} found in depth ${actionDepth}`)
            current.action = null
        }

        let stop = false;
        while (!stop) {

            if (
                current.children.length === 0 && !current.validWord && current.parent) {
                // Operate on the parent nodes at every level upwards
                const { parent } = current;
                const childIndex = parent.children.indexOf(current);
                const end = parent.children.length - 1;
                // Swap the position of the current node and the node at the end of the list.
                [parent.children[childIndex], parent.children[end]] = [parent.children[end], parent.children[childIndex]];
                // Now, the node to be deleted should be at the end of the list, we just need to pop it out
                parent.children.pop();
                this.nodes -= 1;   // reduce the counter of nodes in trie
                // Move the pointer upwards
                current = parent;
                if (current.children.length == 0) this.depth -= 1; // reduce the counter of depth in trie
            } else {
                stop = true;
                console.log(`REMOVED: ${word} - action ${action} in depth ${actionDepth} with total of ${this.nodes} nodes`)
            }
        }
    }
    search(input) {
        // inputMirror is not required. I just want the output to match the input exactly.
        // Otherwise, if you input Fa, the returned text would be fa
        const inputMirror = [];
        let current = this.root;
        for (let i = 0; i < input.length; i += 1) {
            const ch = input.charAt(i);
            let found = false;
            for (let j = current.children.length; j--;) {
                const child = current.children[j];
                if (child.char.toLowerCase() === ch.toLowerCase()) {
                    found = true;
                    current = child;
                    inputMirror.push(child.char);
                    break;
                }
            }
            if (!found) {
                return [];
            }
        }
        // After the above operations, the pointer should be at the node corresponding
        // to the last input character
        const match = []; // to store all matching words
        const tracker = []; // keep track of found character nodes
        function traverse(node) {
            tracker.push(node.char);
            if (node.validWord) {
                const temp = inputMirror.slice(0, input.length - 1);
                temp.push(...tracker);
                match.push(temp.join(''));
            }
            // Recursively call all children nodes
            node.children.forEach(traverse);
            // The function that comes last to the recursion stack will be the first to execute the following command.
            //Since we are at the end of a Trie, we start to empty the tracker at every level upwards.
            // For example, when you type in fa, after matching the word 'fabric',
            // the tracker will contain ['b', 'r', 'i', 'c', 'k'].
            // Starting from 'k', we pop out every character upwards, so that when we start to match the word 'face', the tracker is empty.
            tracker.pop();
        }
        traverse(current);
        return match;
    }
}

// var trie = new Trie()
// trie.add('111', 'A')
// trie.add('10', 'B')
// trie.add('1010', 'C')
// trie.add('10101', 'D')
// trie.add('1110', 'E')

// trie.add('1011','B')
// trie.add('1010','A')
// trie.add('000','C')
// trie.add('001','C')
// trie.find('00000000')
// trie.remove('00', 'C')

module.exports = { Trie }