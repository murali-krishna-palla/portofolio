/* ==============================================
   EMAILJS CONTACT FORM HANDLER
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS with YOUR public key (get from emailjs.com)
  if (window.emailjs && typeof window.emailjs.init === 'function') {
    try {
      window.emailjs.init("Nw9kTxHCCrVShjnQ3");
    } catch (err) {
      console.error('EmailJS init failed:', err);
    }
  } else {
    console.error('EmailJS library not loaded.');
  }

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!window.emailjs || typeof window.emailjs.send !== 'function') {
        // Show error toast if EmailJS failed to load
        const errorToast = document.createElement('div');
        errorToast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #ff4d4d;
          color: #050001;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 50000;
          animation: slideIn 0.3s ease-out;
        `;
        errorToast.textContent = '✗ Email service not available. Please try again later.';
        document.body.appendChild(errorToast);
        setTimeout(() => {
          errorToast.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => errorToast.remove(), 300);
        }, 4000);
        return;
      }
      
      // Get form values
      const name = document.getElementById('f-name').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const subject = document.getElementById('f-subject').value.trim();
      const message = document.getElementById('f-message').value.trim();
      
      // Prepare template parameters
      const templateParams = {
        to_email: "pmuralikrishna520@gmail.com", // Your email
        from_email: email,
        subject: subject,
        name: name,
        message: message + "\n\nReply to: " + email,
        time: new Date().toLocaleString()
      };
      
      // Get submit button for feedback
      const submitBtn = contactForm.querySelector('.btn');
      const originalText = submitBtn.innerHTML;
      
      try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Send email via EmailJS
        const response = await emailjs.send(
          "service_cnuyejp",        // Gmail service
          "template_tb7mc4x",       // Portfolio Contact Form template
          templateParams
        );
        
        // Success
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.cssText = 'border-color:#00ff00;color:#00ff00;background:rgba(0,255,0,0.1);';
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #00ff00;
          color: #050001;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 50000;
          animation: slideIn 0.3s ease-out;
        `;
        toast.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        document.body.appendChild(toast);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
          toast.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => toast.remove(), 300);
        }, 4000);
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.cssText = '';
        }, 2000);
        
      } catch (error) {
        console.error('Error sending email:', error);
        
        // Error state
        submitBtn.innerHTML = '<span>Failed!</span><i class="fas fa-times"></i>';
        submitBtn.style.cssText = 'border-color:#ff4d4d;color:#ff4d4d;background:rgba(255,77,77,0.1);';
        
        // Show error toast
        const errorToast = document.createElement('div');
        errorToast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #ff4d4d;
          color: #050001;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 50000;
          animation: slideIn 0.3s ease-out;
        `;
        errorToast.textContent = '✗ Failed to send message. Please try again.';
        document.body.appendChild(errorToast);
        
        setTimeout(() => {
          errorToast.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => errorToast.remove(), 300);
        }, 4000);
        
        // Reset button
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.cssText = '';
        }, 2000);
      }
    });
  }
});

// Add slide animations for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
