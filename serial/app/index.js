#!/bin/env node
const SERIAL_PORT = process.env.SERIAL_PORT || '/dev/ttyS0';
const BAUDRATE = parseInt(process.env.BAUDRATE) || 9600;
const BYTE_LENGTH = parseInt(process.env.BYTE_LENGTH) || 16;
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length')
const port = new SerialPort(SERIAL_PORT, {
    baudRate: BAUDRATE
})
const parser = port.pipe(new ByteLength({ length: BYTE_LENGTH }));
let burstIdx = 0;
parser.on('data', (data) => {

    switch (burstIdx) {
        case 0:
            console.log(`received PM2.5 reading:`);
            console.log(data);
            burstIdx++
            break;
        case 4:
            console.log(data);
            burstIdx = 0;
            break;

        default:
            console.log(data);
            burstIdx++
            break;
    }
})
port.on('open', () => {
    console.log('serialport connection open');
})
port.on('close', () => {
    console.log('serialport connection closed');
})

process.on('SIGINT', () => {
    port.close();
    process.exit(0);
})