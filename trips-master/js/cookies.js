document.getElementById('firstname').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('lastname').focus();
    }
});

document.getElementById('lastname').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('email').focus();
    }
});

document.getElementById('email').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('message').focus();
    }
});

// Submit form with Enter in message field (using Shift+Enter for new line)
document.getElementById('message').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('submitBtn').click();
    }
});

// Form validation and submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!validateName(firstName)) {
        alert('Please enter a valid first name (letters and spaces only)');
        document.getElementById('firstname').focus();
        return;
    }

    if (!validateName(lastName)) {
        alert('Please enter a valid last name (letters and spaces only)');
        document.getElementById('lastname').focus();
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address (info@domain.com)');
        document.getElementById('email').focus();
        return;
    }

    if (message === "") {
        alert("Please write a message before sending, don't leave it blank.");
        document.getElementById('message').focus();
        return;
    }

    // Set cookies
    setCookie("Name", firstName, 7);
    setCookie("Lastname", lastName, 7);
    setCookie("Email", email, 7)

    //remove the session storage when message was send successfully
    sessionStorage.removeItem('message');

    // Show success message and reset form
    alert(`Thank you for your message, ${lastName}! We will get back to you soon.`);
    this.reset();
});

// Validation functions
function validateName(name) {
    return /^[A-Za-z\s'-]+$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Cookie handling
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());}


// Load cookies when page loads
window.onload = function (){
    document.getElementById('firstname').value = getCookie('Name') || '';
    document.getElementById('lastname').value = getCookie('Lastname') || '';
    document.getElementById('email').value = getCookie('Email') || '';

    // Restore feedback on page reload
    let tempMessage = sessionStorage.getItem('message');
    if (tempMessage) {
        document.getElementById('message').value = tempMessage;
    }
};


// store feedback on session storage
document.getElementById('message').addEventListener('input', function() {
    sessionStorage.setItem('message', this.value);
});


