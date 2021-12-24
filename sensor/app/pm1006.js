const debug = require('debug')('pm1006')

class Pm1006 {
    PM25 = 0;
    PM1 = 1;
    PM10 = 2;

    constructor() {
        this.buffer = [];
        this.d1 = [];
        this.d2 = [];
        this.d3 = [];
        this.samples = [this.d1, this.d2, this.d3];
    }

    average(samples) {
        debug(samples)
        const sum = samples.reduce((a, b) => a + b, 0);
        const avg = (sum / samples.length) || 0;
        return avg;
    }

    convert(buffer) {
        const d1 = ((buffer[5] << 8) | buffer[6]) & 65535; // PM2.5
        const d2 = ((buffer[9] << 8) | buffer[10]) & 65535; // PM1.0
        const d3 = ((buffer[13] << 8) | buffer[15]) & 65535; // PM10
        debug(d1, d2, d3)
        return [d1, d2, d3]
    }

    checkHeader(buffer) {
        return ((buffer[0] == 22) && (buffer[1] == 17) && (buffer[2] == 11));
    }

    checksum(buffer) {
        let sum = 0;
        for (let byte of buffer) {
            sum += byte;
            sum = (sum & 255);
        }
        return (sum === 0);
    }

    addToSamples(reading, samples) {
        if (samples.length >= 5) {
            samples.pop()
        }
        samples.unshift(reading)
    }

    read(buffer, source = this.PM25) {
        debug(buffer)
        if (this.checkHeader(buffer) != true) {
            debug('invalid header');
        }
        if (this.checksum(buffer) != true) {
            debug('invalid payload');
        }
        const data = this.convert(buffer);
        for (let index = 0; index < data.length; index++) {
            this.addToSamples(data[index], this.samples[index]);
        }
        const result = this.average(this.samples[source])
        return (Math.round(result * 10) / 10)
    }
}

module.exports = new Pm1006();