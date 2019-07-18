
(function($){
  $(function(){

    $('.button-collapse').sideNav();


    function writeFormData(submissionDate, company, email, firstname,  lastname, phone, zipcodes, database) {

        database.ref('christinaswyersliving/referrals').push({
          date: submissionDate,
          company: company,
          email:  email,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          zipcodes: zipcodes
        }, function(error) {
              if (error) {
                alert('Form Submission Failed, Please try again.');
                clearForm();
              } else {
                console.log( 'Data saved successfully!' );
                clearForm();
              }
          });
    }
    function clearForm(){
      $("#referral-form input").val('');
      clearTokens();
    }

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    function formSubmit(database){
     console.log('called form Submit');
     var validator = $("#referral-form input");
     var listArray = [];


     for (var i = 0; i < validator.length; i++) {
       listArray.push(validator[i].classList)
       // console.log( validator[i].classList );
     }
     console.log(listArray.values);

      var $form = $("#referral-form");
      var data = getFormData($form);
      var date = new Date();
      var submissionDate = date.toString();
      // console.log(submissionDate);
      // console.log( data );

      setTimeout(function () {
        writeFormData(submissionDate, data.company, data.email, data.firstname,  data.lastname, data.phone, data.zipcodes, database );
      }, 800);
   }

    $( document ).ready(function() {
        console.log( "ready!" );

        // Your web app's Firebase configuration
        var firebaseConfig = {
          apiKey: "AIzaSyDvpDVvXH5NGZRrq7FkyUUDQU6agIG0aNw",
          authDomain: "referralbusiness-6e88b.firebaseapp.com",
          databaseURL: "https://referralbusiness-6e88b.firebaseio.com",
          projectId: "referralbusiness-6e88b",
          storageBucket: "",
          messagingSenderId: "19726957108",
          appId: "1:19726957108:web:6dc53d1a7cd62650"
        };

        // // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Get a reference to the database service
        var database = firebase.database();
       $('.form-submit').on( 'click', function(){
            formSubmit(database)
       });

    });


  }); // end of document ready
})(jQuery); // end of jQuery name space
