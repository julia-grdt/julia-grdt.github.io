jQuery(document).ready(function($) {
	var stripe = Stripe('pk_live_MGUOGsdhVYRXiYZIo4IJijSg');

	'use strict';

	function registerElements(elements, exampleName) {
  		var formClass = '.' + exampleName;
	  var example = document.querySelector(formClass);

	  var form = example.querySelector('form');
	  var error = form.querySelector('.error');
	  var errorMessage = error.querySelector('.message');

	  function enableInputs() {
	    Array.prototype.forEach.call(
	      form.querySelectorAll(
	        "input[type='text'], input[type='email'], input[type='tel']"
	      ),
	      function(input) {
	        input.removeAttribute('disabled');
	      }
	    );
	  }

	  function disableInputs() {
	    Array.prototype.forEach.call(
	      form.querySelectorAll(
	        "input[type='text'], input[type='email'], input[type='tel']"
	      ),
	      function(input) {
	        input.setAttribute('disabled', 'true');
	      }
	    );
	  }

	  function triggerBrowserValidation() {
	    // The only way to trigger HTML5 form validation UI is to fake a user submit
	    // event.
	    var submit = document.createElement('input');
	    submit.type = 'submit';
	    submit.style.display = 'none';
	    form.appendChild(submit);
	    submit.click();
	    submit.remove();
	  }

	  // Listen for errors from each Element, and show error messages in the UI.
	  var savedErrors = {};
	  elements.forEach(function(element, idx) {
	    element.on('change', function(event) {
	      if (event.error) {
	        error.classList.add('visible');
	        savedErrors[idx] = event.error.message;
	        errorMessage.innerText = event.error.message;
	      } else {
	        savedErrors[idx] = null;

	        // Loop over the saved errors and find the first one, if any.
	        var nextError = Object.keys(savedErrors)
	          .sort()
	          .reduce(function(maybeFoundError, key) {
	            return maybeFoundError || savedErrors[key];
	          }, null);

	        if (nextError) {
	          // Now that they've fixed the current error, show another one.
	          errorMessage.innerText = nextError;
	        } else {
	          // The user fixed the last error; no more errors.
	          error.classList.remove('visible');
	        }
	      }
	    });
	  });

	  // Listen on the form's 'submit' handler...
	  $('#sno-donate-modal').on('click', '#sno-donate-form-submit', function(e) {
		    e.preventDefault();

		    // Trigger HTML5 validation UI on the form if any of the inputs fail
		    // validation.
		    var plainInputsValid = true;
		    Array.prototype.forEach.call(form.querySelectorAll('input'), function(
		      input
		    ) {
		      if (input.checkValidity && !input.checkValidity()) {
		        plainInputsValid = false;
		        return;
		      }
		    });
		    if (!plainInputsValid) {
		      triggerBrowserValidation();
		      return;
		    }

		    var name = $('#sno-donate-name').val();
         	var email = $('#sno-donate-email').val();
         	if (!name.trim()) {
         		error.classList.add('visible');
		        errorMessage.innerText = "Please enter your full name."
		        return
         	}
         	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         	if (!email.trim() || !regex.test(email)) {
         		error.classList.add('visible');
		        errorMessage.innerText = "Please enter a valid email address."
		        return
         	}
         	var donation_amount = $('#donation-amount').val();
     		if (donation_amount == -1) {
     			donation_amount = $('#custom-donation-amount').val().replace('$', '');
     			if (!donation_amount) {
	     			error.classList.add('visible');
			        errorMessage.innerText = "Please enter a donation amount."
			        return
     			}
     		}
     		var agree_to_terms = $('#sno-donate-agree').is(':checked');
     		if (!agree_to_terms) {
     			error.classList.add('visible');
		        errorMessage.innerText = "Please agree to the terms of service."
		        return
     		}

		    // Show a loading screen...
		    $('.sno-donate-submit-form').hide();
   			$('.sno-donate-submitting').show();

		    // Disable all inputs.
		    disableInputs();

		    // Gather additional customer data we may have collected in our form.		   
		    var additionalData = {
		      name: name,
		      email: email
		    };

		    // Use Stripe.js to create a token. We only need to pass in one Element
		    // from the Element group in order to create a token. We can also pass
		    // in the additional customer data we collected in our form.
		    stripe.createToken(elements[0], additionalData).then(function(result) {
		      // Stop loading!
		      example.classList.remove('submitting');

		      if (result.token) {
		        // If we received a token, show the token ID.
		        var token = result.token.id;

         		var donation_amount = $('#donation-amount').val();
         		if (donation_amount == -1) {
         			donation_amount = $('#custom-donation-amount').val().replace('$', '');
         		} else {
         			donation_amount = donation_amount[0]
         		}

         		var name = $('#sno-donate-name').val();
         		var email = $('#sno-donate-email').val();
         		var anonymous = $('#sno-donate-anonymous').is(':checked');


    	      	var data = {
    	  			action: 'submit_donation',
    	  			name: name,
    	  			email: email,
    	  			amount: donation_amount,
    	  			anonymous: anonymous,
    	  			token: token
    	  		};
    	  				
    	  		jQuery.post(ajax_object.ajax_url, data, function(response) {
    	  			$('.sno-donate-submitting').hide();
    	  			resp = JSON.parse(response)
    	  			if (resp.success) {
    	  				$('.sd-goal-progress').width(resp.goal_progress_percent);
    	  				$('.sd-goal-contributed-amount').html('$' + resp.goal_progress_amount);
    	  				$('.sno-donate-success').show();
    	  			} else {
    	  				$('.sno-donate-failure').show();
    	  			}
    	  		}).fail(function() {
				    $('.sno-donate-submitting').hide();
				    $('.sno-donate-failure').show();			
				});

		    } else {
		        // Otherwise, un-disable inputs.'
		        enableInputs();
		        error.classList.add('visible');
		        errorMessage.innerText = result.error.message
		        $('.sno-donate-submitting').hide();
		        $('.sno-donate-submit-form').show();
   				
		      }
		    });
		  });
	}

	  var elements = stripe.elements({
	    fonts: [
	      {
	        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
	      },
	    ],
	    // Stripe's examples are localized to specific languages, but if
	    // you wish to have Elements automatically detect your user's locale,
	    // use `locale: 'auto'` instead.
	    locale: window.__exampleLocale
	  });

	  var card = elements.create('card', {
	    iconStyle: 'solid',
	    style: {
	    	base: {
	    		fontSize: '16px',
	    		lineHeight: '30px',
	    		backgroundColor: '#fafafa',
	    	}
	    }
	  });
	  card.mount('#sno-donate-card');

	  registerElements([card], 'sno-donate-submit-form');

	$('.sno-donate-open-button').click(function() {
		$('#sno-donate-modal').fadeIn();
	});

	$('#donation-amount').change(function() {
		let value = $(this).val()
		if (value == -1) {
			$('.sno-donate-custom-amount').slideDown();
		} else {
			$('.sno-donate-custom-amount').slideUp();
		}
		if( !$('.sd-cc-row').is(':visible') ) {
			$('.sd-cc-row').slideDown();
			$('.sd-terms-row').slideDown();
			$('.sno-donate-button-wrap').slideDown();
		}

	});

	$('#custom-donation-amount').change(function() {
		let value = $(this).val().replace('$', '');
		var error = false;
		var error_message = '';
		if (!$.isNumeric(value)) {
			error = true
			error_message = "Please enter a valid donation amount."
		}
		if (value < 10) {
			error = true
			error_message = "Donation amount must be at least $10.00"
		}
		if (error) {
			$(this).val('');
 			$('.sno-donate-submit-form .error').addClass('visible');
	        $('.sno-donate-submit-form .error .message').html(error_message);
		    return;
		}

		$('.sno-donate-submit-form .error').removeClass('visible');
	    $('.sno-donate-submit-form .error .message').html("");
		
		value = '$' + parseFloat(value).toFixed(0);
		$(this).val(value);
	})

	$('#sno-donate-form-close').click(function() {
		$('#sno-donate-modal').css('display', 'none');
	});
	
	$('body').on('click', '#sno-donate-modal', function(e) {
		if(e.target !== e.currentTarget) return;
		$(this).fadeOut();
	});
   
});