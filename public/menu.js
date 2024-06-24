function increment(button) {
    var input = button.parentNode.querySelector('input');
    input.value = parseInt(input.value) + 1;
  }

  function decrement(button) {
    var input = button.parentNode.querySelector('input');
    input.value = parseInt(input.value) - 1 >= 0 ? parseInt(input.value) - 1 : 0;
  }

  function orderNow() {
    var quantities = document.querySelectorAll('.quantity input');
    var totalItems = 0;

    quantities.forEach(function(quantity) {
      totalItems += parseInt(quantity.value);
    });

    if (totalItems === 0) {
      alert("Oops! Nothing added.");
    } else {
      var message = "You have ordered:\n";
      quantities.forEach(function(quantity, index) {
        if (parseInt(quantity.value) > 0) {
          message += quantity.parentNode.previousElementSibling.textContent.trim() + ": " + quantity.value + "\n";
        }
      });
      alert(message+"THANK YOU !!");
      function extractQuantitiesById() {
        // Initialize an empty object to store quantities
        var quantitiesById = {};
        
        // Select all menu items using a query selector
        var menuItems = document.querySelectorAll('.menu-item');
        
        // Loop through each menu item
        menuItems.forEach(function(item) {
          // Get the ID of the menu item by accessing its h3 tag and retrieving the id attribute
          var itemId = item.querySelector('h3').id;
          
          // Get the quantity input value
          var quantity = parseInt(item.querySelector('.quantity input').value);
          
          // Store the quantity in the object with the item ID as the key
          quantitiesById[itemId] = quantity;
        });
        
        return quantitiesById;
      }
      
      // Example usage
      var quantities = extractQuantitiesById();
      const table=[
        {item:'Samosa',Qty:30*quantities['Samosa']},
        {item:'Pani-Puri',Qty:20*quantities['Pani-Puri']},
        {item:'Paneer-Pakora',Qty:40*quantities['Paneer-Pakora']},
        {item:'Vadapav',Qty:50*quantities['Vadapav']},
        {item:'Chole',Qty:100*quantities['Chole']},
        {item:'Dal',Qty:120*quantities['Dal']},
        {item:'Lachcha',Qty:110*quantities['Lachcha']},
        {item:'Palak',Qty:120*quantities['Palak']},
        {item:'Rasmalai',Qty:80*quantities['Rasmalai']},
        {item:'Mango',Qty:70*quantities['Mango']},
        {item:'Jalebi',Qty:20*quantities['Jalebi']},
        {item:'Gulab',Qty:40*quantities['Gulab']},
        {item:'Butter',Qty:30*quantities['Butter']},
        {item:'Lemon',Qty:70*quantities['Lemon']},
        {item:'Fruit',Qty:100*quantities['Fruit']},
        {item:'Lassi',Qty:40*quantities['Lassi']},
        {item:'Aam',Qty:100*quantities['Aam']}
      ]
      let totalQuantity = 0;
      table.forEach((item) => {
          totalQuantity += item.Qty;
      });
      // console.log("Total Price:", totalQuantity);
      const queryString = 'totalQuantity=' + encodeURIComponent(totalQuantity);
      const newUrl = '/menu1' + '?' + queryString;
      window.location.href = newUrl;
    }
  }