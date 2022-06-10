const fs = require('fs')
const { exit } = require('process')


// Get firebase keys from env var
const firebaseConfig = process.env.FIREBASE_CONFIG
try {
  JSON.parse(firebaseConfig)
}catch(e){
  console.log(`ERROR: no firebase keys/invalid keys provided. Please setup the FIREBASE_CONFIG env var properly. 
For example, run something like (replace with your own keys): 

export FIREBASE_CONFIG='{
  "apiKey": "AHdS3A657ufbgfnhnhH8wtXGCzPFqBWYccsdfdfXSas",
  "databaseURL": "https://my-database-default-rtdb.europe-west1.firebasedatabase.app"
}'

Current key:
${firebaseConfig}

Parsing error:
${e}
`)
  exit(1)
}

// Write keys to a generated file
fs.writeFileSync(__dirname  + '/specs/firebase-config.js', `
// Initialize the Firebase SDK
var config = ${firebaseConfig};
`)


module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    browsers: ["ChromeHeadlessNoSandbox"],

    // See:
    // https://docs.travis-ci.com/user/chrome
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    preprocessors: {
      "../lib/*.js": "coverage"
    },

    plugins: [
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-coverage",
      "karma-spec-reporter",
      "karma-failed-reporter"
    ],

    reporters: ["spec", "failed", "coverage"],
    coverageReporter: {
      reporters: [
        {
          type: "lcovonly",
          dir: "coverage",
          subdir: "."
        },
        {
          type: "text-summary"
        }
      ]
    },

    browserNoActivityTimeout: 60000,

    files: [
      "../node_modules/codemirror/lib/codemirror.js",
      "../node_modules/firebase/firebase.js",
      "./vendor/ace-1.2.5.js",

      "../lib/utils.js",
      "../lib/span.js",
      "../lib/text-op.js",
      "../lib/text-operation.js",
      "../lib/annotation-list.js",
      "../lib/cursor.js",
      "../lib/firebase-adapter.js",
      "../lib/rich-text-toolbar.js",
      "../lib/wrapped-operation.js",
      "../lib/undo-manager.js",
      "../lib/client.js",
      "../lib/editor-client.js",
      "../lib/ace-adapter.js",
      "../lib/monaco-adapter.js",
      "../lib/constants.js",
      "../lib/entity-manager.js",
      "../lib/entity.js",
      "../lib/rich-text-codemirror.js",
      "../lib/rich-text-codemirror-adapter.js",
      "../lib/formatting.js",
      "../lib/text.js",
      "../lib/line-formatting.js",
      "../lib/line.js",
      "../lib/parse-html.js",
      "../lib/serialize-html.js",
      "../lib/text-pieces-to-inserts.js",
      "../lib/headless.js",
      "../lib/firepad.js",

      "./specs/firebase-config.js",
      "./specs/helpers.js",
      "./specs/*.spec.js"
    ]
  });
};
