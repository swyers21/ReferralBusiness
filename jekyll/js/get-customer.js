
  var stripe = require("stripe")("sk_test_6IzNAMveoW3fSKghkeE4LvKA");

    stripe.customers.list(
      { email: 'creativeautomaton@gmail.com' },
      function(err, customers) {
        // asynchronously called
        console.log("customers: ", JSON.stringify(customers));
        console.log(err);
        console.log(customers);
      }
    );

_testcb(){

}
