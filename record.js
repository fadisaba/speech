(function() {
    let childProcess = require("child_process");
    childProcess.spawn = require('cross-spawn');
})();
const record = require('node-record-lpcm16');
var fs = require('fs');

var file = fs.createWriteStream('test.wav', { encoding: 'binary' });

record.start().pipe(file);

// Stop recording after three seconds and write to file
setTimeout(function () {
    record.stop()
}, 10000);