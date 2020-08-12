 function ConvertMe(ip) {
    // const address = {
    //     'str': process.argv[3],
    //     'slash': parseInt(process.argv[3].split('\/')[1]),
    //     'ip': process.argv[3].split('\/')[0],
    //     'subnet': ''

    // }
    // console.log(ip)
    const address = {
        'str': ip,
        'slash': parseInt(ip.split('\/')[1]),
        'ip': ip.split('\/')[0],
        'subnet': ''

    }
    const action = process.argv[2]
    const router = process.argv[4]
    // console.log(action, address, router)
    var s = ip;
    var subnetBits = s.split("\/")
    var split = subnetBits[0].split("\.");
    
    var binaryResult = "";
    var decimalResult = "";

    for (const octet of split) {
        // console.log(octet)
        if (octet.length > 0 && octet <= 255) {
            number = parseInt(octet)
            switch (number.toString(2).length) {
                case 1:
                    binaryResult += "0000000" + number.toString(2);
                    break;
                case 2:
                    binaryResult += "000000" + number.toString(2);
                    break;
                case 3:
                    binaryResult += "00000" + number.toString(2);
                    break;
                case 4:
                    binaryResult += "0000" + number.toString(2);
                    break;
                case 5:
                    binaryResult += "000" + number.toString(2);
                    break;
                case 6:
                    binaryResult += "00" + number.toString(2);
                    break;
                case 7:
                    binaryResult += "0" + number.toString(2);
                    break;
                default:
                    binaryResult += number.toString(2);
                    break;
            }
            decimalResult = parseInt(binaryResult, 2)
        }
    }
    address['binary'] = binaryResult
    address['decimal'] = decimalResult
    // if(subnetBits.length>1){
    //     for (let i = 0; i < address.slash; i++) {
    //         address.subnet += '1'
    //     }
    //     for (let i = address.slash; i < address.binary.length; i++) {
    //         address.subnet += '0'
    //     }

    // }else{
    //     address.subnet = address.binary
    // }
    if(address.slash){
        address.subnet=address.binary.slice(0,address.slash)
    }else{ address.subnet = address.binary}
 


    // console.log(address)
    return address

}
//helper debug functions
function int2ip(ipInt) {
    return ((ipInt >>> 24) + '.' + (ipInt >> 16 & 255) + '.' + (ipInt >> 8 & 255) + '.' + (ipInt & 255));
}
function ip2int(ip) {
    return ip.split('.').reduce(function (ipInt, octet) { return (ipInt << 8) + parseInt(octet, 10) }, 0) >>> 0;
}
// ConvertMe()

module.exports = {ConvertMe}
