// Wait for the DOM to be ready
 jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zñáéíóúüA-ZÑÁÉÍÓÚ.\s]+$/i.test(value);  
}, "Campo incorrecto");
jQuery.validator.addMethod("lettersonly1", function(value, element) {
  return this.optional(element) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
}, "Campo incorrecto");

$(document).ready(function(){

  jQuery.validator.addMethod("noSpace", function(value, element) { 
      return value == '' || value.trim().length != 0;  
    }, "Campo incorrecto");

  $('#email-val').keypress(function( e ) {
    if(e.which === 32) 
        return false;
});
});
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"

  $("form[name='myForm']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      fild1: {lettersonly: true,
        required: true,
        
        // Specify that email should be validated
        // by the built-in "email" rule
        minlength: 3,
        maxlength: 25,
        noSpace: true
      },
      fild2: {
        required: true, email: true, minlength:10, lettersonly1:true},                                                                                                  

      fild3: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        minlength: 7,
        maxlength: 10
      },
      fild4: {
        required: true,
        minlength: 10,
        maxlength: 10
      },
      fild5: {required: true, minlength: 1}
      
    },
    // Specify validation error messages
    messages: {
      fild1: { required: "Campo obligatorio", minlength: "Campo incorrecto", maxlength: "Campo incorrecto"}, 
      fild2: { required: "Campo obligatorio", email: "Campo incorrecto", minlength: "Campo incorrecto"}, 
      fild3: {
        required: "Campo obligatorio",
        minlength: "Campo incorrecto",
        maxlength: "Campo incorrecto"
      },
      fild4: {required: "Campo obligatorio",minlength: "Campo incorrecto",maxlength: "Campo incorrecto"},
      fild5: {required: "seleccione la casilla de verificación", minlength: "seleccione la casilla de verificación"}

    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });


  
});