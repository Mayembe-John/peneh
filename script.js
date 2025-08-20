// Mobile menu toggle
document.getElementById('mobile-menu')?.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-list').classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navList = document.querySelector('.nav-list');
            const mobileMenu = document.getElementById('mobile-menu');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// WhatsApp Form Submission
document.getElementById('serviceRequestForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const form = e.target;
    const formData = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        service: form.service.value,
        message: form.message.value.trim()
    };

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.service) {
        alert('Please fill in all required fields: Name, Phone, and Service');
        return;
    }

    // Format the WhatsApp message
    let whatsappMessage = `*NEW SERVICE REQUEST FROM PENEH WEBSITE*%0A%0A`;
    whatsappMessage += `*Name:* ${formData.name}%0A`;
    whatsappMessage += `*Phone:* ${formData.phone}%0A`;
    if (formData.email) whatsappMessage += `*Email:* ${formData.email}%0A`;
    whatsappMessage += `*Service Needed:* ${formData.service}%0A`;
    if (formData.message) whatsappMessage += `*Additional Details:*%0A${formData.message}%0A`;
    whatsappMessage += `%0A_Please respond to this inquiry at your earliest convenience_`;

    // Create WhatsApp URL
    const whatsappNumber = '260972324035';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in a new tab
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Focus the new window if possible
    if (newWindow) {
        newWindow.focus();
    }
    
    // Show confirmation message
    alert('Your request is ready to send! A WhatsApp window will open with your details. Please click send to submit your request.');
    
    // Reset the form
    form.reset();
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});
