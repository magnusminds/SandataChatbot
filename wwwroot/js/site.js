var domo = window.domo;
var datasets = window.datasets;
const promptBtn = document.querySelector('#prompt-btn');
const selectedDataset = document.querySelector('#datasets');
const executeBtn = document.querySelector('#execute-btn');
const resultBox = document.querySelector('#result');
var token;
var tokenGenerateTime;

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}
);
document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

promptBtn.addEventListener('click', async () => {

    console.log(selectedDataset.value, "selectedDataset.value");
    debugger;
    $("#loader").show();

    var dataset = $('#datasets').val();
    var question = $('#question').val();
    var instance = 'Main'

    //------------------------------Final----------------------------// 
    var apiUrl = 'https://app.rd.us-east-1.sandata.com/domo/testapi';

    // Define the JSON data
    var jsonData = {
        "dataset": dataset,
        "question": question,
        "instance": "Main"
    };

    // Make a POST request to the API

    //------------------------------Final----------------------------//  


    //Automatic Responce
    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function (data) {
            debugger;
            if (data.body.error != undefined) {
                $("#loader").hide();
                $("#popuptext").html("Please try a different question or try again");
                $(".popup").show();
                $(".outputdata").html('');
                $('#question').html('');
            } else {

                $("#loader").hide();
                const columns = data.body.columns;
                const rows = data.body.rows;
                const table = $("<table></table>").attr("border", "2");

                // Create header row
                const headerRow = $("<tr></tr>");
                for (let column of columns) {
                    const th = $("<th></th>").text(column);
                    headerRow.append(th);
                }
                table.append(headerRow);

                // Create data rows
                for (let row of rows) {
                    const tr = $("<tr></tr>");
                    for (let value of row) {
                        const td = $("<td></td>").text(value);
                        tr.append(td);
                    }
                    table.append(tr);
                }
                // Append table to outputdata element
                $(".outputdata").css("display", "flex");
                $(".outputdata").html(table);
            }
        },


        error: function (xhr, status, error) {
            debugger
            $("#loader").hide();
            $("#popuptext").html("Internal server error");
            $(".popup").show();
        }

    });
    $(".popup-close").click(function () {
        $("#popuptext").html("");
        $(".popup").hide();
    });
});