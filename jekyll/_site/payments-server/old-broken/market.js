'use strict';
//////////////// Stripe Nodjs Functions
var stripe = require("stripe")("sk_test_6IzNAMveoW3fSKghkeE4LvKA");


///////////// FIrbase Nodejs Functions
// var client = require('firebase-tools');
var firebase = require('firebase');
var firebaseAdmin = require("firebase-admin");
var firebaseFunctions = require('firebase-functions');
// var lawntologyDB = firebase.database('lawntology-3aed2');
var serviceAccount = require("./lawntology-3aed2-firebase-adminsdk-6hbcu-c0d6966b03.json");
var refreshToken;


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://lawntology-3aed2.firebaseio.com"
});


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebaseAdmin.database();
var ref = db.ref("users");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});



// var usersRef = firebase.database(lawntologyDB).ref("users");

var cus_id;

// console.log(usersRef);
//
// client.use({
//   'project': 'lawntology-3aed2',
//   "name": "rest-read",
//   "path": [],
//
//
// }).then(function(data) {
//   console.log(data);
// }).catch(function(err) {
//   console.log(err);
//   // handle error
// });



// client.database().get('/users').then(function(data) {
//   console.log(data);
// }).catch(function(err) {
//   console.log(err);
//   // handle error
// });

// client.deploy({
//   project: 'myfirebase',
//   token: process.env.FIREBASE_TOKEN,
//   cwd: '/path/to/project/folder'
// }).then(function() {
//   console.log('Rules have been deployed!')
// }).catch(function(err) {
//   // handle error
// });
