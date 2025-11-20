// Home Page mobile menu toggle
document.addEventListener('DOMContentLoaded', function(){
  const mobileBtn = document.getElementById('mobile-menu');
  const menu = document.querySelector('.navbar__menu');
 
  if(!mobileBtn || !menu) return;
 
  mobileBtn.addEventListener('click', function(){
    mobileBtn.classList.toggle('is-active');
    menu.classList.toggle('active'); 
  });
 
  // Close mobile menu when clicking a link
  menu.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=>{
      if(window.innerWidth <= 960){
        mobileBtn.classList.remove('is-active');
        menu.classList.remove('active'); 
      }
    });
  });
 
});

// Destinations Page 
     document.addEventListener('DOMContentLoaded', function () {
        const bookingForm = document.getElementById('booking-form');
        const openPaymentModalButton = document.getElementById('openPaymentModalButton');
        const paymentForm = document.getElementById('payment-form');
        
        // Check if elements exist
        if (!bookingForm || !openPaymentModalButton || !paymentForm) {
            console.error("Required form elements not found.");
            return;
        }

        //  modals
        const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

        // BOOKING FORM validation (before showing Payment Modal)
        openPaymentModalButton.addEventListener('click', function(event) {
            event.preventDefault();

            if (bookingForm.checkValidity() === false) {
                // Validation failed: Show feedback and error modal
                bookingForm.classList.add('was-validated');
                errorModal.show();
                console.log("Booking Validation failed.");
            } else {
                // Validation successful: Open the Payment Modal
                bookingForm.classList.remove('was-validated'); 
                
                // Update modal content
                const selectedResort = bookingForm.querySelector('select').value;
                const resortNameElement = document.getElementById('payment-resort-name');
                if (resortNameElement) {
                    resortNameElement.textContent = selectedResort;
                }

                paymentModal.show();
            }
        });
        
        // --- Payment Form Submission  ---
        if (paymentForm) {
            paymentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Use checkValidity() to see if native HTML validation passes
                if (paymentForm.checkValidity() === false) {
                    // *** VALIDATION FAILED ***
                    event.stopPropagation();
                    
                    // 1. Show Bootstrap's validation feedback
                    paymentForm.classList.add('was-validated');

                    // 2. Show the custom error modal (the "alert" replacement)
                    errorModal.show();
                    
                    console.log("Payment validation failed.");

                } else {
                    // *** VALIDATION SUCCESSFUL (Simulate Payment) ***
                    paymentForm.classList.remove('was-validated'); 
                    paymentModal.hide();
                    document.getElementById('payment-success').classList.remove('d-none');
                    console.log("Payment simulated successfully. In a real app, the API call would happen here.");
                }
            });
        }
    });



    //  to escape user text 
    function escapeHtml(s){
      return String(s).replace(/[&<>"]/g, function(m){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m];
      });
    }

function attachDetailToggles(){
  const buttons = document.querySelectorAll('.toggle-details');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-target');
      const panel = document.getElementById(id);
      if (!panel) return;
      
      if (panel.cleanupFunc) {
        panel.removeEventListener('transitionend', panel.cleanupFunc);
      }
      
      const open = panel.classList.contains('open');

      if (open){
        // CLOSE
        
        // 1. Set max-height
        panel.style.maxHeight = panel.scrollHeight + 'px'; 
        void panel.offsetHeight; 

        // 2. Start the closing transition
        panel.style.maxHeight = '0px'; 
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        panel.setAttribute('aria-hidden','true');
        
        // 3. Cleanup
        panel.cleanupFunc = function(){
          if (!panel.classList.contains('open')) {
            panel.style.maxHeight = null;
          }
          panel.removeEventListener('transitionend', panel.cleanupFunc);
        };
        panel.addEventListener('transitionend', panel.cleanupFunc, {once: true});
        
      } else {
        // OPEN 

        // 1. First, set maxHeight 
        panel.style.maxHeight = '0px';
        panel.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        panel.setAttribute('aria-hidden','false');

        setTimeout(() => {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }, 10);
      }
    }, {passive:false});
  });
}


// Contact Us Page
    // Custom Validation Function to check all fields on submission
    function validateForm(event) {
      const form = document.querySelector('.needs-validation');
      let isValid = true;

      // 1. Check all standard required fields
      if (!form.checkValidity()) {
        event.preventDefault(); 
        event.stopPropagation();
        isValid = false;
      }
      
      // 2. Custom check for the required radio button group
      const radioGroup = document.getElementById('radio-group-updates');
      const radioButtons = document.getElementsByName('updates');
      let radioChecked = Array.from(radioButtons).some(radio => radio.checked);
      const radioFeedback = document.getElementById('radio-feedback');
      
      if (!radioChecked) {
          radioGroup.classList.add('is-invalid'); 
          radioFeedback.classList.remove('d-none'); 
          isValid = false;
      } else {
          radioGroup.classList.remove('is-invalid');
          radioFeedback.classList.add('d-none');
      }

      // Add Bootstrap's visual validation styles to the form
      form.classList.add('was-validated');

      if (isValid) {
        // Form is valid - ready to submit
        return true;
      } else {
        // Form is invalid - block submission
        return false;
      }
    }
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    // Check if the element exists before attaching listeners
    if (phoneInput) {
        // Use the 'input' event for real-time filtering as the user types or pastes
        phoneInput.addEventListener('input', function(event) {
            let value = event.target.value;

            // 1. Remove any non-digit characters (including spaces, dashes, parentheses)
            
            value = value.replace(/\D/g, '');

            // 2. Enforce a maximum of 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            
            event.target.value = value;
            
            
        });
    }
});