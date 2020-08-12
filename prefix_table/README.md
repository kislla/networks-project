# Packet classifier - Longest Prefix Match

An IP lookup table based on a binary trie implementation. 
The implementation  supports three operations: 

 1. ADD:  Insertion of an IP prefix with a given action to the trie.
 2. REMOVE: Removal of an IP prefix with a given action from the trie.
 3. FIND: Finds the longest prefix match for a given IP prefix, returns an action should this be found.

This program supports both a naive approach to the problem and an optimised implementation which improves both runtime and space consumption.
## Input

An input file should be formatted with the following rules:

 - Each line consists of **OPERATION, IP address** and **ACTION**. (Find operation only gets 2 arguments)
 - The line params are separated by a space char `' '`.
 - Each operation should be added as a new line to the input file.

**Input file example:**
>ADD 255.255.255.0/24 A
>FIND 255.255.255.255
>REMOVE 255.255.255.0/24 A

## Expected Output

    [ 'ADD', '255.255.255.0/24', 'A' ]
    INSERTED: 111111111111111111111111 and action: A current depth is 24 with total of 24 nodes
    [ 'FIND', '255.255.255.255' ]
    FOUND: 11111111111111111111111111111111 - action A in depth 24
    [ 'REMOVE', '255.255.255.0/24', 'A' ]
    REMOVED: 111111111111111111111111 - action A in depth 24 with total of 0 nodes


## How to run the program

Make sure you have  NodeJS and NPM installed, you can grab them from [here](https://nodejs.org/en/).
1.	run `npm -v` in your terminal to validate your installation.
2.	`cd` to the **prefix_table** folder
3.	run `npm i`
4.	For the naive version run `node prefix_table.js <INPUT_FILE_PATH>` (E.g: `node prefix_table.js input`)
5.	for the optimised version run  `node prefix_table_opt.js <INPUT_FILE_PATH>` (E.g: `node prefix_table_opt.js input`)