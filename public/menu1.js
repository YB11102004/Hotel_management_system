// Function to get the value of a query parameter from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Get the value of the 'totalQuantity' query parameter
const totalQuantity = getParameterByName('totalQuantity');

// Now you can use the totalQuantity variable to access the total quantity value
document.getElementById('grandTotal').textContent = 'Total Price: ' + totalQuantity;

// Submit button click event listener
document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    // Validate form fields
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    let valid = true;

    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        valid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    // Validate contact number
    if (contact === '') {
        document.getElementById('contactError').textContent = 'Contact number is required';
        valid = false;
    } else {
        document.getElementById('contactError').textContent = '';
    }

    // If form is valid, submit the form
    if (valid) {
        alert('Thank you! Your order has been received! It will take around 15 minutes.');
        // Optionally, you can submit the form here using AJAX or redirect to another page
        // document.getElementById('orderForm').submit();
    }
});