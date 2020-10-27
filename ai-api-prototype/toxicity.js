require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

async function result(text) {
    // The minimum prediction confidence.
    const threshold = 0.9;

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.

    // console.log(text);
    const sentences = [text];
    let model = await toxicity.load(threshold);
    let res = await model.classify(sentences);
    return res;
}


exports.result = result;