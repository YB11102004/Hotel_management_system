document.addEventListener("DOMContentLoaded", function() {
    // Get the "Book Now" button element
    var bookNowBtn = document.getElementById("booknowbtn");

    // Add event listener to the "Book Now" button
    bookNowBtn.addEventListener("click", function() {
        // Redirect to the booknow.html page
        window.location.href = "/book";
    });
});

function calculateTotal() {
    console.log("Calculating total...");
    var roomTypeSelect = document.getElementById("Room_type");
    var numRoomsInput = document.getElementById("num_rooms");
    var checkInDateInput = document.getElementById("Check_In_Date");
    var checkOutDateInput = document.getElementById("Check_Out_Date");
    var totalPaymentParagraph = document.getElementById("amount");

    var selectedOption = roomTypeSelect.options[roomTypeSelect.selectedIndex];
    var roomPrice = parseFloat(selectedOption.value); // Parse room price as a float
    var numRooms = parseInt(numRoomsInput.value); // Parse number of rooms as an integer

    var checkInDate = new Date(checkInDateInput.value);
    var checkOutDate = new Date(checkOutDateInput.value);

    // Calculate the number of nights the guest will stay
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var numberOfNights = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay));

    // Check if the dates are valid and the number of nights is positive
    if (isNaN(numberOfNights) || numberOfNights <= 0) {
        totalPaymentParagraph.textContent = "Rs.0";
    } else {
        // Calculate the total price based on room price, number of rooms, and number of nights
        var totalPrice = roomPrice * numRooms * numberOfNights;

        // Update the total payment displayed on the form with the currency symbol "Rs."
        totalPaymentParagraph.textContent = "Rs." + totalPrice.toFixed(2);
    }
}

function validateForm() {
    var name = document.getElementById("name").value.trim();
    var phoneNumber = document.getElementById("phone").value.trim();
    var creditCardNumber = document.getElementById("credit_card").value.trim();
    var cvv = document.getElementById("cvv").value.trim();
    var termsChecked = document.getElementById("terms").checked;
    var checkInDate = new Date(document.getElementById("Check_In_Date").value); // Convert check-in date to a Date object
    var checkOutDate = new Date(document.getElementById("Check_Out_Date").value); // Convert check-out date to a Date object
    var currentDate = new Date(); // Get the current date
    var aadharCardInput = document.getElementById("Aadhar_no").value.trim();
  

    // Name validation
    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Please enter a valid name.");
        return false;
    } else if (checkOutDate <= checkInDate) {
        alert("Check-out date must be after the check-in date.");
        return false;
    } else if (checkInDate <= currentDate) { // Check if the check-in date is before the current date
        alert("Check-in date must be after the current date.");
        return false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    } else if (!/^\d{16}$/.test(creditCardNumber)) {
        alert("Please enter a valid 16-digit credit card number.");
        return false;
    } else if (!/^\d{3}$/.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return false;
    } else if (!/^\d{12}$/.test(aadharCardInput)) {
        alert("Please enter a valid Aadhar card number (12 digits).");
        //aadharCardInput.focus();
        return false;
      } 
    else if (!termsChecked) {
        alert("Please agree to the terms and conditions.");
        return false;
    } else {
        return true;
    }
}
