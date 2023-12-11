function addRow() {
    try {
        const table = document.querySelector('.datatable');
        const newRow = table.insertRow();
        const cells = [];

        for (let i = 0; i < 6; i++) {
            cells[i] = newRow.insertCell(i);
            let input = document.createElement('input');
            if (i === 4 || i === 5) {
                input.type = (i === 4) ? 'date' : 'checkbox';
            } else {
                input.type = 'text';
            }
            cells[i].appendChild(input);
        }

        //Save the updated order to local storage
        saveOrder();
    } catch (error) {
        console.log("Error adding row:", error);
    }
}

function calculateTotalRevenue() {
    const table = document.querySelector('.datatable');
    const rows = Array.from(table.rows).slice(1); //Exclude the header row
    let totalRevenue = 0;

    rows.forEach(row => {
        const price = parseFloat(row.cells[3].getElementsByTagName('input')[0].value);
        const isPaid = row.cells[5].getElementsByTagName('input')[0].checked;

        if (!isNaN(price) && isPaid) {
            totalRevenue += price;
        }
    });

    //Display the total revenue
    document.getElementById('totalRevenue').innerText = `Total Revenue: $${totalRevenue.toFixed(2)}`;
}

function sortTableByFirstName() {
    sortTable(0); //Sorting by the first column(index 0)
}

function sortTableByLastName() {
    sortTable(1); //Sorting by the second column(index 1)
}

function sortTableByDate() {
    sortTable(4); //Sorting by the fifth column(index 4)
}

function sortTable(columnIndex) {
    const table = document.querySelector('.datatable');
    const rows = Array.from(table.rows).slice(1); //Exclude the header row

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].getElementsByTagName('input')[0].value;
        const bValue = b.cells[columnIndex].getElementsByTagName('input')[0].value;

        // Compare values based on their types
        if (!isNaN(aValue) && !isNaN(bValue)) {
            return parseFloat(aValue) - parseFloat(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    //Clear existing rows in the table
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    //Add sorted rows back to the table
    rows.forEach(row => table.appendChild(row));

    //Save the updated order to local storage
    saveOrder();
}

function saveOrder() {
    try {
        const table = document.querySelector('.datatable');
        const ordersList = [];

        // Iterate through rows and cells to collect data
        for (let i = 1; i < table.rows.length; i++) {
            const order = {
                'firstname': table.rows[i].cells[0].getElementsByTagName('input')[0].value,
                'lastname': table.rows[i].cells[1].getElementsByTagName('input')[0].value,
                'amount': table.rows[i].cells[2].getElementsByTagName('input')[0].value,
                'price': table.rows[i].cells[3].getElementsByTagName('input')[0].value,
                'date': table.rows[i].cells[4].getElementsByTagName('input')[0].value,
                'paid': table.rows[i].cells[5].getElementsByTagName('input')[0].checked
            };
            ordersList.push(order);
        }

        //Save the data to local storage
        localStorage.setItem("orders", JSON.stringify(ordersList));

        //Recalculate and display the total revenue
        calculateTotalRevenue();
    } catch (error) {
        console.log("Error saving order:", error);
    }
}

function loadOrders() {
    try {
        //Retrieve existing orders from local storage or initialize an empty array
        const ordersList = JSON.parse(localStorage.getItem("orders")) || [];

        //Log the retrieved orders
        console.log("Orders List:", ordersList);

        //Clear existing rows in the table
        const table = document.querySelector('.datatable');
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        //Loop through the orders and add them to the table
        for (let i = 0; i < ordersList.length; i++) {
            addRow();

            //Retrieve the last added row
            const lastRow = table.rows[i + 1];

            //Input the values in the last row
            lastRow.cells[0].getElementsByTagName('input')[0].value = ordersList[i].firstname;
            lastRow.cells[1].getElementsByTagName('input')[0].value = ordersList[i].lastname;
            lastRow.cells[2].getElementsByTagName('input')[0].value = ordersList[i].amount;
            lastRow.cells[3].getElementsByTagName('input')[0].value = ordersList[i].price;
            lastRow.cells[4].getElementsByTagName('input')[0].value = ordersList[i].date;

            //For the 'Paid?' column in the 6th column
            lastRow.cells[5].getElementsByTagName('input')[0].checked = ordersList[i].paid;
        }

        //Recalculate and display the total revenue
        calculateTotalRevenue();
    } catch (error) {
        console.error("Error loading orders:", error);
    }
}

//Load stored orders on page load
window.onload = function () {
    loadOrders();
};
