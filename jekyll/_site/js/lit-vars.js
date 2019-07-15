 import {html, render} from '/js/lit-html/lit-html.js';
    
  var userId = firebase.auth().currentUser.uid;
  var userDB = firebase.database().ref('users/' + userId);
     var all;
  var d = {address: 'jhfgjhgjhg'}; 
    
   let listener = {
      handleEvent(e) { 
        var d = {address: 'click that shit'};  
        const result = myTemplate(d);
         render(result, el);
         console.log(d);
      } 
    }; 
    console.log(d);


    // Declare a template
    let myTemplate = (d) => html` 
        <button @click=${listener}>Click Me!</button>  
        <span> ${d.address} </span>
    `;   
 
    let el = document.querySelector('#box'); 
 

 // Render the template  
    const result = myTemplate(d);
    render(result, el);

