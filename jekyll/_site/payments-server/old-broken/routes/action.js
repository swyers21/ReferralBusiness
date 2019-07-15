var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');

///////////// Stripe API Nodejs Functions
var stripe = require("stripe")("sk_test_6IzNAMveoW3fSKghkeE4LvKA");


///////////// Firbase Nodejs Functions
// var client = require('firebase-tools');
// var firebase = require('firebase');
// var firebaseAdmin = require("firebase-admin");
// var firebaseFunctions = require('firebase-functions');
// // var lawntologyDB = firebase.database('lawntology-3aed2');
// var serviceAccount = require("./lawntology-3aed2-firebase-adminsdk-6hbcu-c0d6966b03.json");
// var refreshToken;
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://lawntology-3aed2.firebaseio.com"
// });
var router = express.Router();
var app = express(); 

// const webhookSecret = 'whsec_zIajnEazinWxvjwXBmYwaCSw13gSSTXp';

if (process.env.http_proxy) {
  const ProxyAgent = require('https-proxy-agent');
  stripe.setHttpAgent(new ProxyAgent(process.env.http_proxy));
}
router.use(require('body-parser').raw({type: '*/*'}));
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.post('/created', function(request, response) {
  response.send(200);
  // const event_json = JSON.parse(request.body);
  // console.log('Success', event.id);
  // console.log('response: ');
  // console.log(response);

  console.log('request: ');
  console.log(request.body.data);
  // return request.body.data;


  // Event was 'constructed', so we can respond with a 200 OK
  // response.status(200).send('Signed Webhook Received: ' + event.id);
  // response.status(200).send('Signed Webhook Received');
});

function logResponseBody(req, res, next) {
  var oldWrite = res.write,
      oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
    console.log(req.path, body);

    oldEnd.apply(res, arguments);
  };
  next()
}

router.use(logResponseBody);

// Firebase Customer Invoices
router.get('/firebase/invoices/:id', function( req, res, next) {
  if (req.params.id === '0') next('router')
    // otherwise pass control to the next middleware function in this stack
    else next()
  },
  function (req, res, next) {
        // console.log(req.params.id);
        var path = 'users/' + req.params.id + '/invoices/';
        var db = firebaseAdmin.database();
        var ref = db.ref(path);
        ref.once("value", function(snapshot) {
            return res.json(
                snapshot.val()
            );
        });
      // invoicesRef.push({
      //         name: 'test'
      // });

});

// Firebase Add Customer Wallet Source
router.get('/firebase/wallet/:uid/:token', function( req, res, next) {
  if (req.params.uid === '0') next('router')
    // otherwise pass control to the next middleware function in this stack
    else next()
  },
  function (req, res, next) {
      // console.log(req.params.id);
      var path = 'users/' + req.params.uid;
      var db = firebaseAdmin.database();
      var ref = db.ref(path);

      var walletRef = ref.child("wallet");
      walletRef.update(req.params.token);

      response.send(200);
});

// Firebase Customer Profile
router.get('/firebase/profile/:id', function(req, res) {
  // console.log(req.params.id);
  var path = 'users/' + req.params.id + '/profile';
  var db = firebaseAdmin.database();
  var ref = db.ref(path);
  ref.once("value", function(snapshot) {
      res.json(
          snapshot.val()
      );
  });
});
// Firebase Customer Stripe
router.get('/firebase/stripe/:id', function(req, res) {
  // console.log(req.params.id);
  var path = 'users/' + req.params.id;
  var db = firebaseAdmin.database();
  var ref = db.ref(path);
  stripe.invoices.list(
    {
      // customer: req.params.id,
      customer: 'cus_CpgBQ5rN24Ppf7',
      // limit: 3
    },
    function(err, invoices) {
      // asynchronously called
      console.log(invoices);
      console.log(err);
      if(invoices != null){
          var stripeRef = ref.child("stripe");
          var invoicesRef = ref.child("invoices");
          stripeRef.update(invoices);
          invoicesRef.update(invoices.data);
          res.json( invoices);
      }
      if(invoices == null) {
          response.send(200);
      }
    }
  );
});

// Stripe actions urls
// https://dashboard.stripe.com/test/customers/cus_EM6FGeRXXkLUSe
//get stripe customer information


router.get('/testing/', function (req, res) {
  res.send('index','Hello World!')
})

router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  console.log(req.params.id);
  stripe.customers.retrieve(
    req.params.id,
    function(err, customer) {
      // asynchronously called
      console.log(customer);
      console.log(err);
      // console.log(customerData);
  });
  next()
  // render a regular page
})

//create stripe customer
router.get('/create-customer/:email', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.email === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  var email = req.params.email;
  email = email.slice(0, -1);
  console.log(email);
    stripe.customers.create({
      email: email,
      description: 'Customer for '+ email,
      source: "tok_visa"
    }, function(err, customer) {
          var cus_id = customer.id
          console.log(customer.id);
          stripe.customers.retrieve( cus_id,
            function(err, customer) {
              console.log(customer);
            }
          );
    });
  next()
  // render a regular page
})

//get stripe customer information
router.get('/delete/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  console.log(req.params.id);
  stripe.customers.del(
    req.params.id,
    function(err, customer) {
      // asynchronously called
      console.log(customer);
      console.log(err);
      // console.log(customerData);
  });
  next()
  // render a regular page
})

router.get('/get-customers2/', cors(), function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.email === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
    var email = req.params.email;
    console.log(res);
  // email = email.slice(0, -1);
  // console.log(email);
  stripe.customers.list(
    { limit: 3 },
    function(err, customers) {
      // asynchronously called
    }
  );

  next()
  // render a regular page
})


router.get('/get-customer/:email', cors(), function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.email === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
    var email = req.params.email;
    console.log(res);
  // email = email.slice(0, -1);
  // console.log(email);
  // stripe.customers.list({
  //   email: email
  // }, function(err, customer) {
  //   // asynchronously called
  //   console.log(customer);
  //   console.log(err);
  // });

  next()
  // render a regular page
})

//get stripe customer invoices
router.get('/create-charge/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  console.log(req.params.id);
  stripe.charges.create({
    customer: 'cus_CeXwQasnaWEVTJ',
    amount: 66600,
    currency: "usd",
    source: req.params.id, // obtained with Stripe.js
    description: "Charge for test card " + req.params.id
  }, function(err, charge) {
    console.log(charge);
    console.log(err);
  });
  next()
  // render a regular page
})
//get stripe customer invoices
router.get('/add-customer-source/:token/:email', function (req, res, next) {
  //  Multiple params code
  // '/add-customer-source/:uid/:customerid/:token'
  // var path = 'users/' + req.params.uid;
  // var db = firebaseAdmin.database();
  // var ref = db.ref(path);

  if (req.params.customerid === '0') next('route')
  else next()
}, function (req, res, next) {
  console.log(req.params.email);
  console.log(req.params.token);

  var email = req.params.email;
  email = email.slice(0, -1);

  stripe.customers.create({
        email: email,
        source: req.params.token
    }, function(err, customer) {
      console.log(customer);
      console.log(err);
    }
  );

  // stripe.customers.update("cus_CeXwQasnaWEVTJ", {
  //   source: req.params.id
  // }, function(err, customer) {
  //   console.log(charge);
  //   console.log(err);
  // });
  next()
  // render a regular page
})


//get stripe single invoice by invoice ID
router.get('/invoice/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  console.log(req.params.id);
  stripe.invoices.retrieve(
    req.params.id,
    function(err, invoice) {
      // asynchronously called
      console.log(invoice);
      console.log(err);
      // console.log(customerData);
  });
  next()
  // render a regular page
})

//get stripe customer invoices
router.get('/invoices/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  console.log(req.params.id);

  stripe.invoices.list(
    {
      customer: req.params.id,
      limit: 3
    },
    function(err, invoices) {
      // asynchronously called
      console.log(invoices);
      console.log(err);
    }
  );
  next()
})

module.exports = router;
