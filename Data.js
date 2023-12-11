// Function to save the order to local storage
function saveOrder() {
    try {
        // Retrieve existing orders from local storage or initialize an empty array
        const ordersList = JSON.parse(localStorage.getItem("orders")) || [];

        // Get input values
        const fname = document.getElementById("firstname").value;
        const lname = document.getElementById("lastname").value;
        const amount = document.getElementById("amount").value;
        const price = document.getElementById("price").value;
        const date = document.getElementById("date").value;

        // Create a new order object
        const newOrder = {
            firstname: fname,
            lastname: lname,
            amount: amount,
            price: price,
            date: date
        };

        // Add the new order to the array
        ordersList.push(newOrder);

        // Log the order list before saving
        console.log("Orders List before saving:", ordersList);

        // Save the updated array back to local storage
        localStorage.setItem("orders", JSON.stringify(ordersList));
    } catch (error) {
        // Use console.log instead of console.error
        console.log("Error saving order:", error);
    }
}

    function addRow() {
        var table = document.querySelector('.datatable');
        var newRow = table.insertRow();
        var cells = [];

        for (let i = 0; i < 5; i++) {
            cells[i] = newRow.insertCell(i);
            if (i !== 2 && i !== 3) {
                let input = document.createElement('input');
                input.type = (i === 4) ? 'date' : 'text';
                cells[i].appendChild(input);
            }
        }

        var fname = document.getElementById('firstname').value;
        var lname = document.getElementById('lastname').value;
        var amount = document.getElementById('amount').value;
        var price = document.getElementById('price').value;
        var date = document.getElementById('date').value;

        cells[0].getElementsByTagName('input')[0].value = fname;
        cells[1].getElementsByTagName('input')[0].value = lname;
        cells[2].innerHTML = amount;
        cells[3].innerHTML = price;
        cells[4].getElementsByTagName('input')[0].value = date;

        document.getElementById('firstname').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('price').value = '';
        document.getElementById('date').value = '';

        // Save the order to local storage
        saveOrder();
    }

    function loadOrders() {
        // Retrieve existing orders from local storage or initialize an empty array
        const ordersList = JSON.parse(localStorage.getItem("orders")) || [];
    // Log the retrieved orders
    console.log("Orders List:", ordersList);
            // Loop through the orders and add them to the table
            for (let i = 0; i < ordersList.length; i++) {
                addRow();
                document.getElementById('firstname').value = ordersList[i].firstname;
                document.getElementById('lastname').value = ordersList[i].lastname;
                document.getElementById('amount').value = ordersList[i].amount;
                document.getElementById('price').value = ordersList[i].price;
                document.getElementById('date').value = ordersList[i].date;
            }
    }
    
