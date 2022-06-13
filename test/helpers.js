import {TextOperation} from '../src/text-operation.js'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const {exit} = require('process')

// Gey keys from the env var 
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


// Setup firebase and start actual tests
firebase.initializeApp(JSON.parse(firebaseConfig));


export {firebase}


export const helpers = (function() {

  var helpers = { };
  helpers.randomInt = function(n) {
    return Math.floor(Math.random() * n);
  };

  helpers.randomString = function(n) {
    var str = '';
    while (n--) {
      if (Math.random() < 0.15) {
        str += '\n';
      } else {
        var chr = helpers.randomInt(26) + 97;
        str += String.fromCharCode(chr);
      }
    }
    return str;
  };

  var attrNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  var attrValues = [-4, 0, 10, 50, '0', '10', 'a', 'b', 'c', true, false];

  helpers.randomAttributes = function(allowFalse) {
    var attributes = { };
    var count = helpers.randomInt(3);
    for(var i = 0; i < count; i++) {
      var name = attrNames[helpers.randomInt(attrNames.length)];
      var value = attrValues[helpers.randomInt(attrValues.length - (allowFalse ? 0 : 1))];
      attributes[name] = value;
    }

    return attributes;
  };

  helpers.randomAttributesArray = function(n) {
    var attributes = Array(n);
    for(var i = 0; i < n; i++) {
      attributes[i] = helpers.randomAttributes();
    }
    return attributes;
  };

  helpers.randomOperation = function(str, useAttributes) {
    var operation = new TextOperation();
    var left;
    while (true) {
      left = str.length - operation.baseLength;
      if (left === 0) { break; }
      var r = Math.random();
      var l = 1 + helpers.randomInt(Math.min(left - 1, 20));
      if (r < 0.2) {
        operation.insert(helpers.randomString(l), (useAttributes ? helpers.randomAttributes() : { }));
      } else if (r < 0.4) {
        operation['delete'](l);
      } else {
        operation.retain(l, (useAttributes ? helpers.randomAttributes(/*allowFalse=*/true) : { }));
      }
    }
    if (Math.random() < 0.3) {
      operation.insert(1 + helpers.randomString(10));
    }
    return operation;
  };

  // A random test generates random data to check some invariants. To increase
  // confidence in a random test, it is run repeatedly.
  helpers.randomTest = function(n, func) {
    return function () {
      while (n--) {
        func();
      }
    };
  };

  function randomElement (arr) {
    return arr[helpers.randomInt(arr.length)];
  }

  return helpers;
})();
