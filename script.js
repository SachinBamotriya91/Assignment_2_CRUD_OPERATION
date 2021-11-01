var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["studentId"] = document.getElementById("studentId").value;
    formData["fullName"] = document.getElementById("fullName").value;
    formData["stream"] = document.getElementById("stream").value;
    formData["percentage"] = document.getElementById("percentage").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.studentId;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fullName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.stream;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.percentage;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a style="color:blue" onClick="onEdit(this)">Edit</a>
                       <a style="color:red" onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("stream").value = "";
    document.getElementById("percentage").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("stream").value = selectedRow.cells[2].innerHTML;
    document.getElementById("percentage").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.studentId;
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.stream;
    selectedRow.cells[3].innerHTML = formData.percentage;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    var letters = /^[A-Za-z]+$/;
    var id=/^[0-9]3/;
    var percetage=/^[0-9]{2}/;
    var mobile=/^[6-9]\d{9}$/;
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}


function search(){
    var input, filter, table, tr, td, i, txtValue,searchBy;
  input = document.getElementById("myInput").value.toUpperCase();
  table = document.getElementById("employeeList");
  tr = table.getElementsByTagName("tr");
  searchBy=document.getElementById("search").value;
  for (i = 0; i < tr.length; i++) {
    if(searchBy==0)
    {
        td = tr[i].getElementsByTagName("td")[0];
        document.getElementById("myInput").placeholder="Search By ID";
    }
    else if(searchBy==1)
    {
        td = tr[i].getElementsByTagName("td")[1];
        document.getElementById("myInput").placeholder = "Search By Name..";
    }
    else if(searchBy==2){
        td = tr[i].getElementsByTagName("td")[2];
        document.getElementById("myInput").placeholder="Search By Stream";
    }
    else if(searchBy==3){
        td = tr[i].getElementsByTagName("td")[3];
        document.getElementById("myInput").placeholder="Search By percentage";
    }


    if (td) {
      txtValue =td.innerText;
      if (txtValue.toUpperCase().indexOf(input) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

