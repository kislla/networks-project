//  const { inputPorcess } = require('./policies')
const fs = require('fs')
const edf = async () => {

    let arrived = 0, dropped = 0, transmitted = 0, totalArrivalVal = 0
    const data = await inputPorcess()
    const queueSize = parseInt(process.argv[2])
    // const data = [
    //     [
    //         { amount: 2, slack: 3, value: 6 },
    //         { amount: 3, slack: 4, value: 1 }
    //     ],
    //     [{ amount: 3, slack: 4, value: 5 }]
    // ]
    // const queueSize = 4
    const queue = []
    // console.log(queueSize)
    // console.log(data)
    data.forEach(timeSlot => {
        for (const packetBundle of timeSlot) {
            for (let i = 0; i < packetBundle.amount; i++) { //
                arrived += 1
                queue.sort((a, b) => (b.slack - a.slack)) // sort buffer queue by descending slack size

                if (queue.length < queueSize) { // if queue is not full
                    queue.push({ slack: packetBundle.slack, value: packetBundle.value })
                }
                else {
                    queue.sort((a, b) => b.slack - a.slack)  // sort buffer queue by descending slack size

                    if (packetBundle.slack > queue[queue.length - 1].slack) {
                        let drop = queue.pop() // remove min slack
                        dropped += 1 // add to dropped counter
                        queue.push({ slack: packetBundle.slack, value: packetBundle.value }) // push 
                        queue.sort((a, b) => b.slack - a.slack)  // sort buffer queue by descending slack size
                    }
                    else { //arriving packet slack is lower the the min slack in queue
                        dropped += 1
                    }
                }
            }

        }// end of arrival phase

        queue.forEach(packet => {// reduce the slack in all packets in  the queue by 1
            packet.slack -= 1
            if (packet.slack <= 0) queue.pop()
        })
        // console.log(queue)
        let toTransmit = queue.pop()  //pop the lowest slack from the queue and transmit it : transmitted ++ , totalArrivalVal += pop.value
        transmitted += 1
        if (toTransmit) totalArrivalVal += toTransmit.value
    })
  
    while (queue.length != 0) {
        
        
        queue.forEach(packet => {
            packet.slack -= 1
            if (packet.slack <= 0){
                queue.pop()
                dropped+=1
            } 
        })
        toTransmit = queue.pop()
        if(toTransmit){
            transmitted += 1;
            totalArrivalVal += toTransmit.value;
        }
        
        
    }
    
    console.log(` Arrived packets: ${arrived}\n`, `Dropped packets: ${dropped}\n`, `Transmitted packets: ${transmitted}\n`, `Total transmitted values: ${totalArrivalVal}`)
}


const inputPorcess = async () => {
     const filepath = process.argv[3]
    // const filepath = 'smaple_input'
    const input = await fs.readFileSync(filepath, 'UTF-8')
    const lines = input.split(/\r?\n/); // split file to array of lines

    const timeSlots = []
    // const timeSlot = []

    lines.forEach(async line => {
        const arrivals = line.split(' ')
        const timeSlot = []
        // console.log("arrivals: " + arrivals)
        arrivals.forEach(arrival => {
            const packetBundel = arrival.match(/\d/g) // extract the packet data from a budnle
            // console.log(packetBundel)
            timeSlot.push({
                amount: parseInt(packetBundel[0]),
                slack: parseInt(packetBundel[1]),
                value: parseInt(packetBundel[2])
            })
        })
        timeSlots.push(timeSlot)
    })

    // console.log(timeSlots)
    return timeSlots
}
edf()