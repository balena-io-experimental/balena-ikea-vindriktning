const fs = require('fs');
const assert = require('assert');
const debug = require('debug')('test')
const pm = require(__dirname + '/../pm1006.js');

function getByteArray(filePath) {
    let fileData = fs.readFileSync(filePath, "hex");
    return Buffer.from(fileData, "hex");
}

describe('Parser', function () {
    describe('Check PM2.5', function () {
        it('should average that matches expected result', function () {
            let result
            for (let index = 0; index < 7; index++) {
                const data = getByteArray(__dirname + `/data/sample_${index}.hex`)
                result = pm.read(data, pm.PM25);
                debug(result);
            }
            assert.equal(result, 78.6);
        });
    });
    describe('Check PM1.0', function () {
        it('should average that matches expected result', function () {
            let result
            for (let index = 0; index < 7; index++) {
                const data = getByteArray(__dirname + `/data/sample_${index}.hex`)
                result = pm.read(data, pm.PM1);
                debug(result);
            }
            assert.equal(result, 936);
        });
    });
    describe('Check PM10', function () {
        it('should average that matches expected result', function () {
            let result
            for (let index = 0; index < 7; index++) {
                const data = getByteArray(__dirname + `/data/sample_${index}.hex`)
                result = pm.read(data, pm.PM10);
                debug(result);
            }
            assert.equal(result, 1);
        });
    });
});

