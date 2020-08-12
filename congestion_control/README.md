# Networks Final Project  - Part 2

# The nature of congestion

One of the central questions in computer networks is how to deal with congestion. As we studied congestion in packet networks is unavoidable if we want to exploit network resources efficiently. During the lecturers, we considered congestion control whose logic is implemented on end hosts. This type of congestion control was based on implicit network feedback - loss. This is the so-called end-2-end design principle that does not assume any knowledge about how switches are implemented. While the end-2-end design principle is nice, additional performance requirements as for low-latency applications require support in buffer management. In this case the congestion control is a composition of control logic implemented on end hosts and buffer management policies implemented inside switches. In this question we explore the performance of two different buffer management policies: Early-Deadline-First (EDF) and Bounded-delay we will define them shortly. As we studied each buffer management policy, managing a single queue is defined by admission policy defining which packets can be admitted and processing policy that defines in which order the buffered packets are processed.


## Inputs

we assume that each packet p is prepended with a​ **packet slack** ​`s(p)` defining a maximal offset in time when a packet should be transmitted and a ​**packet​ ​value** ​`v(p)`. You can assume that packets with expired slack are automatically removed from the queue.

## Model

We consider a single queue buffering architecture. Time is slotted. Each time slot consists of two phases:

1.   Arrival phase​ where the admission policy decides which packets are admitted and
    
2.   Processing phase​ where a single packet p (chosen by the processing policy) is transmitted out and its value `v(p)` is added to the total transmitted value; The slack values of all remaining in the queue packets are decreased by one. All packets with the zero remaining slack are removed without added value to the final objective.

## Input

Each line in the input file contains arrivals in tuples (amount, slack, value).  
For example: (5,3,6) (2,4,1) (6,2,4)  during this time slot arriving 5 packets whose slack is 3 and the value is 6, etc. 
Each packet bundle (tuple) is contained within parentheses `()`.
Each packet bundle is separated by a space char `' '`.
Each time slot is separated by a new line `\n`.
**Input_file example:**
>(2,3,6) (3,4,1)
(2,4,5)

## How to run the program

Make sure you have  NodeJS and NPM installed, you can grab them from [here](https://nodejs.org/en/).
1.	run `npm -v` in your terminal to validate your installation.
2.	`cd` to the **congestion_control** folder
3.	run `npm i`
4.	for BD policy run `node bd.js <BUFFER_SIZE> <INPUT_FILE_PATH>` (E.g: `node bd.js 4 smaple_input`)
5.	for EDF policy run `node edf.js <BUFFER_SIZE> <INPUT_FILE_PATH>` (E.g: `node edf.js 4 smaple_input`)

## Expected Output
**BD**
> Arrived packets: 8
 Dropped packets: 4
 Transmitted packets: 4
 Total transmitted values: 22

**EDF**
> Arrived packets: 8
 Dropped packets: 4
 Transmitted packets: 4
 Total transmitted values: 17
