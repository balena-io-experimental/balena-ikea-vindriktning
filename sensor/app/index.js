#!/bin/env node
const SERIAL_PORT = process.env.SERIAL_PORT || '/dev/ttyS0';
const BAUDRATE = parseInt(process.env.BAUDRATE) || 9600;
const BYTE_LENGTH = parseInt(process.env.BYTE_LENGTH) || 20;
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length')
const PM = require(__dirname + '/pm1006.js');
const debug = require('debug')('sensor');
const express = require('express');
const app = express();
const port = new SerialPort(SERIAL_PORT, {
    baudRate: BAUDRATE
})
const parser = port.pipe(new ByteLength({ length: BYTE_LENGTH }));

let sensorRead;

parser.on('data', (data) => {
    const result = PM.read(data);
    debug(`received PM2.5 reading: ${result}`)
    sensorRead = result;
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send(sensorRead);
})

app.listen(80)