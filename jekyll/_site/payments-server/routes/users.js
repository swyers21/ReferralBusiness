var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


///////////// Stripe API Nodejs Functions
var stripe = require("stripe")("sk_test_6IzNAMveoW3fSKghkeE4LvKA");

/* GET customer listing. */
router.get('/is-customer/:email', function(req, res, next) {
  // res.send(req.params);
  stripe.customers.list(
    { email: req.params.email },
    function(err, customer) {
        if(err){
          res.send('No customer in stripe ');
        }
        if(customer){
          var customer = customer.data[0];
          // asynchronously called
          // console.log(customers);
          res.send(customer);
        }
    }
  );
});

/* GET customer listing. */
router.get('/create-customer/:email', function(req, res, next) {
    // res.send(req.params);
    stripe.customers.create({
      description: 'Customer for ' + req.params.email,
      source: "tok_amex" // obtained with Stripe.js
    }, function(err, customer) {
      // asynchronously called
      res.send(customer);
    });
});

/* GET customer listing. */
router.get('/get-invoices/:id', function(req, res, next) {
    // res.send(req.params);
    stripe.invoices.list(
      { id: req.params },
      function(err, invoices) {
        res.send(invoice);
      }
);
});




module.exports = router;
