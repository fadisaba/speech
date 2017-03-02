(function() {
    let childProcess = require("child_process");
    childProcess.spawn = require('cross-spawn');
})();
var childProcess=require('child_process');
const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'canvas-eon-147223';

// Instantiates a client
const speech = Speech({
    projectId: projectId,
    keyFilename: 'try-apis-e73f4e06a044.json'
});

// The encoding of the audio file, e.g. 'LINEAR16'
 const encoding = 'LINEAR16';

// The sample rate of the audio file, e.g. 16000
 const sampleRate = 16000;

const request = {
    config: {
        encoding: encoding,
        sampleRate: sampleRate
    }
};



// Create a recognize stream
const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data', (data) => process.stdout.write(data.results));

// Start recording and send the microphone input to the Speech API

var audioProcess = childProcess.spawn("sox", ["-d", "--type", "flac", "--channels", "1", "--bits", "16", "--rate", "16000", "-"]);

audioProcess.stdout.on("data", function (data) {
    console.log('recognize2');
    recognizeStream(data);
});

audioProcess.stdout.on("error", function (data) {
    if (err == null) {
        return;
    }
    console.error(err.toString());
    process.exit(1);
});

/*record.start({
    sampleRate: sampleRate,
    threshold: 0
})
    .pipe(recognizeStream);*/

console.log('Listening, press Ctrl+C to stop.');