// const fs = require('fs');
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

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

// Imports the Google Cloud client library
// const fs = require('fs');
// const speech = require('@google-cloud/speech');

// // Creates a client
// const client = new speech.SpeechClient();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// const filename = './assets/test.ogg';
// const encoding = 'LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'es-ES';

// const config = {
//   encoding: encoding,
//   sampleRateHertz: sampleRateHertz,
//   languageCode: languageCode
// };
// const audio = {
//   content: fs.readFileSync(filename).toString('base64')
// };

// const request = {
//   config: config,
//   audio: audio
// };

// // Detects speech in the audio file

// const [response] = await client.recognize(request);
// const transcription = response.results
//   .map((result: any) => result.alternatives[0].transcript)
//   .join('\n');
// console.log(`Transcription: `, transcription);

//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\antony.hernandez\Documents\GitHub\Speech-to-Text\379007511876-fj9dbhuem3lct4bm9gkfa5kh920am4vl.apps.googleusercontent.com_secreto_cliente.json"

async function syncRecognize() {
  // [START speech_transcribe_sync]
  // Imports the Google Cloud client library
  const fs = require('fs');
  const speech = require('@google-cloud/speech');

  // Creates a client
  const client = new speech.SpeechClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const filename = './assets/test3.ogg';
  const encoding = 'OGG_OPUS';
  const sampleRateHertz = 16000;
  const languageCode = 'es-ES';
  const WordConfidence = true;

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableWordConfidence: WordConfidence
  };
  const audio = {
    content: fs.readFileSync(filename).toString('base64')
  };

  const request = {
    config: config,
    audio: audio
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);

  /* Transcription*/
  const transcription = response.results
    .map((result: any) => result.alternatives[0].transcript)
    .join('\n');
  const confidence = response.results
    .map((result: any) => result.alternatives[0].confidence)
    .join(`\n`);
  console.log(`Transcription: ${transcription} \nConfidence: ${confidence}`);

  console.log(`Word-Level-Confidence:`);
  const words = response.results.map((result: any) => result.alternatives[0]);
  words[0].words.forEach((a: any) => {
    console.log(` word: ${a.word}, confidence: ${a.confidence}`);
  });
  // [END speech_transcribe_sync]
}
syncRecognize();
