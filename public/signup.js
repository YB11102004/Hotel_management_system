const pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");


// Function to validate login form
function validateLoginForm() {
    // Get form inputs
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value.trim();
    var emailError = document.getElementById('loginEmailError');
    var passwordError = document.getElementById('loginPasswordError');

    // Reset error messages
    emailError.innerHTML = '';
    passwordError.innerHTML = '';

    // Validate email
    if (email === '') {
        emailError.innerHTML = 'Email is required';
        return false;
    } else if (!isValidEmail(email)) {
        emailError.innerHTML = 'Enter a valid email address';
        return false;
    }

    // Validate password
    if (password === '') {
        passwordError.innerHTML = 'Password is required';
        return false;
    } else if (password.length < 6) {
        passwordError.innerHTML = 'Password must be at least 6 characters long';
        return false;
    }

    // If all validations pass, submit the form and redirect to /hotel
window.location.href = 'http://localhost:3000/hotel';
return true;

}
// Function to validate signup form
function validateSignupForm() {
    // Get form inputs
    var email = document.getElementById('signupEmail').value.trim();
    var password = document.getElementById('signupPassword').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    var emailError = document.getElementById('signupEmailError');
    var passwordError = document.getElementById('signupPasswordError');
    var confirmPasswordError = document.getElementById('confirmPasswordError');

    // Reset error messages
    emailError.innerHTML = '';
    passwordError.innerHTML = '';
    confirmPasswordError.innerHTML = '';

    // Validate email
    if (email === '') {
        emailError.innerHTML = 'Email is required';
        return false;
    } else if (!isValidEmail(email)) {
        emailError.innerHTML = 'Enter a valid email address';
        return false;
    }

    // Validate password
    if (password === '') {
        passwordError.innerHTML = 'Password is required';
        return false;
    } else if (password.length < 6) {
        passwordError.innerHTML = 'Password must be at least 6 characters long';
        return false;
    }

    // Validate confirm password
    if (confirmPassword === '') {
        confirmPasswordError.innerHTML = 'Confirm Password is required';
        return false;
    } else if (confirmPassword !== password) {
        confirmPasswordError.innerHTML = 'Passwords do not match';
        return false;
    }

    /// If all validations pass, submit the form and redirect to /hotel
window.location.href = 'http://localhost:3000/hotel';
return true;

}

// Email validation function
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toggle password visibility
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })

    })
})

// Toggle between login and signup forms
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // Prevent default link behavior

        const forms = document.querySelector(".forms");
        forms.classList.toggle("show-signup"); // Toggle between login and signup forms
    })
})