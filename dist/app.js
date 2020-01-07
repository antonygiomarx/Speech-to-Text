"use strict";
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
        apikey: 'MlzaaqF6pyfFaDvhmaFbYcoqiIST0t6xqYovgzF-Myio'
    }),
    url: 'https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/574d8075-b9c7-4ca1-9768-588e875f1e93'
});
var params = {
    objectMode: true,
    contentType: 'audio/ogg',
    model: 'es-MX_NarrowbandModel',
    keywords: ['Hola'],
    keywordsThreshold: 0.5,
    maxAlternatives: 3
};
// Create the stream.
var recognizeStream = speechToText.recognizeUsingWebSocket(params);
// Pipe in the audio.
fs.createReadStream('./assets/test3.ogg').pipe(recognizeStream);
/*
 * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
 *
 * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
 * file and produce it on the console.
 *
 * WHEN USED ALONE, the following line pipes just the final transcript to
 * the named file but produces numeric values rather than strings on the
 * console.
 */
// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
/*
 * WHEN USED ALONE, the following line produces just the final transcript
 * on the console.
 */
// recognizeStream.setEncoding('utf8');
// Listen for events.
recognizeStream.on('data', function (event) {
    onEvent('Data:', event);
});
recognizeStream.on('error', function (event) {
    onEvent('Error:', event);
});
recognizeStream.on('close', function (event) {
    onEvent('Close:', event);
});
// Display events on the console.
function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
}
