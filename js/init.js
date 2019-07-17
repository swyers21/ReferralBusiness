
(function($){
  $(function(){

    $('.button-collapse').sideNav();

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }
    function storeData(data){
      console.log(data);
    }

    function formSubmit(){
     console.log('called form Submit');
      var $form = $("#referral-form");
      var data = getFormData($form);
      // getTags();
      // console.log( tags.getTags() );
      storeData(data);
   }


    $( document ).ready(function() {
        console.log( "ready!" );

       $('.form-submit').on( 'click', function(){
            formSubmit()
       });

    });


  }); // end of document ready
})(jQuery); // end of jQuery name space
