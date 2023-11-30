var cookieData = [];

function displayTableData() {
    // Fetch data from the server using jQuery.ajax
    $.ajax({
        type: "GET",
        url: "getdata.php",
        success: function (data) {
            cookieData = JSON.parse(data);
            renderTable();
        },
        error: function (error) {
            console.log("Error fetching data:", error);
        }
    });
}

function addOnClick() {
    var firstname = document.getElementById('First-Name').value;
    var lastname = document.getElementById('Last-Name').value;
    var design = document.getElementById('Design').value;
    var cookieAmount = document.getElementById('Cookie-Amount').value;
    var price = document.getElementById('Price').value;
    var date = document.getElementById('Date').value;

    if (validateForm()) {
        // Use jQuery.ajax to send data to the server
        $.ajax({
            type: "POST",
            url: "save_data.php",
            data: {
                firstname: firstname,
                lastname: lastname,
                design: design,
                cookieAmount: cookieAmount,
                price: price,
                date: date
            },
            success: function (response) {
                console.log(response); // Log the server response
                displayTableData(); // Refresh the table on successful save
                clearItems(); // Clear the form
            },
            error: function (error) {
                console.error('Error:', error); // Log the error
                alert('An error occurred. Please try again.'); // Display an alert for errors
            }
        });
    }
}

function removeRow(index) {
    // Make an AJAX call to remove data from the server
    var idToRemove = cookieData[index].id; // Assuming you have an 'id' field in your data
    $.ajax({
        type: "POST",
        url: "removedata.php",
        data: {
            id: idToRemove
        },
        success: function (response) {
            console.log(response); // Log the server response
            displayTableData(); // Refresh the table on successful removal
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
}

fetch('save_data.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(data => {
    console.log(data);
    displayTableData();
    clearItems();
})
.catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
});


// Fetch and display data on page load
displayTableData();
