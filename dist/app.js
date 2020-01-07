"use strict";
// const fs = require('fs');
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const speechToText = new SpeechToTextV1({
//   authenticator: new IamAuthenticator({
//     apikey: 'MlzaaqF6pyfFaDvhmaFbYcoqiIST0t6xqYovgzF-Myio'
//   }),
//   url:
//     'https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/574d8075-b9c7-4ca1-9768-588e875f1e93'
// });
// let params = {
//   objectMode: true,
//   contentType: 'audio/ogg',
//   model: 'es-MX_NarrowbandModel',
//   keywords: ['Test'],
//   keywordsThreshold: 0.5,
//   maxAlternatives: 3
// };
// // Create the stream.
// let recognizeStream = speechToText.recognizeUsingWebSocket(params);
// // Pipe in the audio.
// fs.createReadStream('./assets/test3.ogg').pipe(recognizeStream);
// /*
//  * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
//  *
//  * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
//  * file and produce it on the console.
//  *
//  * WHEN USED ALONE, the following line pipes just the final transcript to
//  * the named file but produces numeric values rather than strings on the
//  * console.
//  */
// // recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
// /*
//  * WHEN USED ALONE, the following line produces just the final transcript
//  * on the console.
//  */
// // recognizeStream.setEncoding('utf8');
// // Listen for events.
// recognizeStream.on('data', function(event: any) {
//   onEvent('Data:', event);
// });
// recognizeStream.on('error', function(event: any) {
//   onEvent('Error:', event);
// });
// recognizeStream.on('close', function(event: any) {
//   onEvent('Close:', event);
// });
// // Display events on the console.
// function onEvent(name: any, event: any) {
//   console.log(name, JSON.stringify(event, null, 2));
// }
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Imports the Google Cloud client library
        const speech = require('@google-cloud/speech');
        const fs = require('fs');
        // Creates a client
        const client = new speech.SpeechClient();
        // The name of the audio file to transcribe
        const fileName = './assets/test.ogg';
        // Reads a local audio file and converts it to base64
        const file = fs.readFileSync(fileName);
        const audioBytes = file.toString('base64');
        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
            content: audioBytes
        };
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US'
        };
        const request = {
            audio: audio,
            config: config
        };
        // Detects speech in the audio file
        const [response] = yield client.recognize(request);
        const transcription = response.results
            .map((result) => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
    });
}
main().catch(console.error);
