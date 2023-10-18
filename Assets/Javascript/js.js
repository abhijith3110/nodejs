function employeebtn() {
  const btn = document.getElementsByClassName("add-employee-form")[0];
  const overlay = document.getElementsByClassName("overlay")[0];
  btn.style.display = "block";
  overlay.style.display = "block";
}
function close_form() {
  var close_btn = document.getElementsByClassName("add-employee-form")[0];
  close_btn.style.display = "none";
  const overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "none";
}

function btn_active(empID) {
  let btn_active = document.getElementById("btn-active");
  btn_active.innerHTML = `<div class="task-btn" id="taskbtn">
      <button class="task-btun"  onclick="viewEmployee('${empID}')" ><i class="fa-solid fa-eye"></i>View Details</button>
      <button class="task-btun" onclick="edit_employee('${empID}')" ><i class="fa-solid fa-user-pen"></i>Edit</button>
      <button class="task-btun" onclick="open_delete_employee('${empID}')"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>`;
  btn_active.style.display = "block";

  const moreOptionToggles = document.querySelectorAll(".more-btn");
  moreOptionToggles.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      const buttonRect = event.target.getBoundingClientRect();
      btn_active.style.top = buttonRect.top - 170 + "px";
      btn_active.style.display =
        btn_active.style.display === "none" || btn_active.style.display === ""
          ? "block"
          : "none";
      event.stopPropagation();
    });
  });

  // Function to close the menu
  function closeMenu() {
    btn_active.style.display = "none";
    document.removeEventListener("mousedown", handleOutsideClick);
  }
  //------------- Function to handle click outside the menu-------------------
  function handleOutsideClick(event) {
    if (!btn_active.contains(event.target)) {
      closeMenu();
    }
  }
  document.addEventListener("mousedown", handleOutsideClick);
}

function edit_employee(empID) {
  console.log(empID);
  const edit_btn = document.getElementById("edit-employee-form");
  const overlay = document.getElementsByClassName("overlay")[0];
  edit_btn.style.display = "block";
  overlay.style.display = "block";
  fetch(`http://localhost:5001/employee/${empID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const imagePreview = document.getElementById("image-preview");
      imagePreview.src = `http://localhost:5001/employee/${empID}/avatar`;
      document.getElementById("salutation-edit").value = data.salutation;
      document.getElementById("firstName-edit").value = data.firstName;
      document.getElementById("lastName-edit").value = data.lastName;
      document.getElementById("email-edit").value = data.email;
      document.getElementById("phone-edit").value = data.phone;
      const dobValue = data.dob;
      const [day, month, year] = dobValue.split("-");
      const formattedDob = `${year}-${month}-${day}`;
      document.getElementById("dob-edit").value = formattedDob;
      document.querySelector(
        `input[name="gender-edit"][value="${data.gender}"]`
      ).checked = true;
      document.getElementById("qualifications-edit").value =
        data.qualifications;
      document.getElementById("address-edit").value = data.address;
      document.getElementById("country-edit").value = data.country;
      document.getElementById("state-edit").value = data.state;
      document.getElementById("city-edit").value = data.city;
      document.getElementById("pin-edit").value = data.pincode;
      document.getElementById("username-edit").value = data.username;
      document.getElementById("password-edit").value = data.password;
      document.getElementById("image-preview").src = data.image;
    });

  const btnMain = document.getElementById("btn-main");
  btnMain
    .addEventListener("click", async () => {
      editEmployee(empID);
      get_emp();
      edit_btn.style.display = "none";
      overlay.style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function close_edit_form() {
  var close_btn = document.getElementById("edit-employee-form");
  close_btn.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "none";
}
function open_delete_employee(empID) {
  var delete_btn = document.getElementById("delete_employee");
  delete_btn.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "block";

  const deleteButton = document.getElementById("emp_del");
  deleteButton.addEventListener("click", () => {
    delete_employee(empID);
  });
}
function close_delete_employee() {
  var delete_btn = document.getElementById("delete_employee");
  delete_btn.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "none";
}

function addedEmployee() {
  var addedEmployee = document.getElementById("added-emp");
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "block";
}
function closeAddedEmployee() {
  var addedEmployee = document.getElementById("added-emp");
  addedEmployee.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "none";
}
function editedEmployee() {
  var addedEmployee = document.getElementById("edited-emp");
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "block";
}
function closeEditedEmployee() {
  var addedEmployee = document.getElementById("edited-emp");
  addedEmployee.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "none";
}
function deletedEmployee() {
  var addedEmployee = document.getElementById("deleted-emp");
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "block";
}
function closeDeketedEmployee() {
  var addedEmployee = document.getElementById("deleted-emp");
  addedEmployee.style.display = "none";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "none";
}

function Display(employeeData) {
  console.log(employeeData);
  const tableBody = document.getElementById("table-body");
  let temp = "";
  if (employeeData.length == 0) {
    const error = document.getElementById("userError");
    temp = error.innerHTML;
  } else {
    for (let i = 0; i < employeeData.length; i++) {
      const employee = employeeData[i];
      temp += `<tr>
      <td>#0${(currentPage - 1) * itemsPerPage + i + 1}</td>
      <td><img src="/${employee.image}">${
        employee.salutation + " " + employee.firstName + " " + employee.lastName
      }</td>
      <td>${employee.email}</td>
      <td>${employee.phone}</td>
      <td>${employee.gender}</td>
      <td>${employee.dob}</td>
      <td>${employee.country}</td>
      <td><button id="more-btn"class="more-btn" onclick=btn_active('${
        employee._id
      }')><span class="material-symbols-outlined">
                                more_horiz
                              </span></button></td>
        
                          <div id="btn-active">
                         
                          </div>
              </tr>`;
    }
  }
  tableBody.innerHTML = temp;
}

//-----FETCH-method-------------------------------------GET-method----------------------------------

let currentPage = 1;
let itemsPerPage = 4;

let selectemp = document.getElementById("selectemp");
selectemp.value = itemsPerPage;
selectemp.addEventListener("click", () => {
  itemsPerPage = selectemp.value;
  get_emp();
});

function get_emp() {
  console.log(currentPage);
  fetch(
    `http://localhost:5001/employee/?page=${currentPage}&limit=${itemsPerPage}`
  )
    .then((res) => res.json())
    .then((data) => {
      const EmployeeTotal = document.getElementById("EmployeeTotal");
      EmployeeTotal.innerHTML = `of ${data.length}`;
      console.log(data);
      const employeeData = data.data;
      const totalItems = data.length;
      const pageCount = Math.ceil(totalItems / itemsPerPage);

      renderPaginationButtons(pageCount);
      Display(employeeData);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderPaginationButtons(pageCount) {
  const paginationContainer = document.getElementById("pagination");
  let paginationHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    paginationHTML += `<button id="paginationButton${i}" class="paginationButton" onclick="changePage(${i})">${i}</button>`;
  }

  paginationContainer.innerHTML = paginationHTML;

  const activeBtn = document.getElementById(`paginationButton${currentPage}`);
  activeBtn.classList.add("active");
}

function changePage(page) {
  currentPage = page;
  get_emp();
}

get_emp();

//-------------------------------------------------POST-method----------------------------------------------

const postForm = document.getElementById("addemployee");

postForm.addEventListener("click", function (event) {
  event.preventDefault();

  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;
  const email = document.getElementById("Email").value;
  const phone = document.getElementById("Phone").value;
  const dob = document.getElementById("dob").value;
  let  gender = document.querySelector('input[name="gender"]:checked');
  if(gender){
    const genderChecked = gender.value;
    gender = genderChecked;
  }
  // Function for converting the format of date from yyyy-mm-dd to dd-mm-yyyy
  var dateofbirth = changeformat(dob);
  function changeformat(val) {
    const Array = val.split("-");
    let year = Array[0];
    let month = Array[1];
    let day = Array[2];
    let formatteddate = day + "-" + month + "-" + year;
    return formatteddate;
  }
  const qualifications = document.getElementById("Qualifications").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("pin").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const Image = document.getElementById("input-file").files[0];

  const formData = new FormData();

  formData.append("salutation", salutation);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("dob", dateofbirth);
  formData.append("gender", gender);
  formData.append("qualifications", qualifications);
  formData.append("address", address);
  formData.append("country", country);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("pincode", pincode);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("image", Image);

  console.log(formData);

  // Sending the employee data to the server
  if (validateForm()) {
    fetch("http://localhost:5001/employee", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee added:", data);
        get_emp();
        clearForm();
        close_form();
        addedEmployee();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  } else {
    validateForm();
  }
});

// -------------------------------------------DELETE-method-------------------------------------------

function delete_employee(empID) {
  fetch(`http://localhost:5001/employee/${empID}`, {
    method: "DELETE",
  });
  close_delete_employee();
  get_emp();
  deletedEmployee();
}

//--------------------------------------------PUT-method-------------------------------------------------

async function editEmployee(empID) {
  const salutation = document.getElementById("salutation-edit").value;
  const firstName = document.getElementById("firstName-edit").value;
  const lastName = document.getElementById("lastName-edit").value;
  const email = document.getElementById("email-edit").value;
  const phone = document.getElementById("phone-edit").value;
  const dobValue = document.getElementById("dob-edit").value;
  const [year, month, day] = dobValue.split("-");
  const formattedDob = `${day}-${month}-${year}`;
  document.getElementById("dob-edit").value = formattedDob;
  const gender = document.querySelector(
    'input[name="gender-edit"]:checked'
  ).value;
  const qualifications = document.getElementById("qualifications-edit").value;
  const address = document.getElementById("address-edit").value;
  const country = document.getElementById("country-edit").value;
  const state = document.getElementById("state-edit").value;
  const city = document.getElementById("city-edit").value;
  const pincode = document.getElementById("pin-edit").value;
  const username = document.getElementById("username-edit").value;
  const password = document.getElementById("password-edit").value;

  const dobformatted = `${day}-${month}-${year}`;

  const formData = new FormData();
  let uploadImage = document.getElementById("editForm-input-file").files[0];
  if (uploadImage) {
    formData.append("image", uploadImage);
  }
  formData.append("salutation", salutation);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("dob", dobformatted);
  formData.append("gender", gender);
  formData.append("qualifications", qualifications);
  formData.append("address", address);
  formData.append("country", country);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("pincode", pincode);
  formData.append("username", username);
  formData.append("password", password);

  await fetch(`http://localhost:5001/employee/${empID}`, {
    method: "PUT",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      get_emp();
      close_edit_form();
      editedEmployee();
    })
    .catch((error) => {
      console.error("Error adding employee:", error);
    });
}

// -----------------------------------------form-validation-------------------------------------------

function validateForm() {
  const errorAlerts = document.querySelectorAll(".error-alert");
  errorAlerts.forEach((alert) => (alert.style.display = "none"));

  const input_file = document.getElementById("input-file");
  const input_file_error = document.getElementById("input-file-error");
  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;
  const email = document.getElementById("Email").value;
  const phone = document.getElementById("Phone").value;
  const dob = document.getElementById("dob").value;
  let genderRadios = document.querySelectorAll('input[name="gender"]'); // Target by name attribute
  let genderError = document.getElementById("genderError"); // Corrected ID
  const qualifications = document.getElementById("Qualifications").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("pin").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[a-zA-Z'-]+$/;

  function displayError(fieldId) {
    document.querySelector(`#${fieldId} + .error-alert`).style.display = "block";
  }

  let isValid = true;

  if (input_file.value === "") {
    input_file_error.style.display = "block";
    isValid = false;
  }

  if (salutation === "Select") {
    displayError("salutation");
    isValid = false;
  }

  if (!nameRegex.test(firstName) || firstName.trim() === "") {
    displayError("FirstName");
    isValid = false;
  }

  if (!nameRegex.test(lastName) || lastName.trim() === "") {
    displayError("LastName");
    isValid = false;
  }

  if (!emailRegex.test(email) || email.trim() === "") {
    displayError("Email");
    isValid = false;
  }

  if (!phoneRegex.test(phone) || phone.trim() === "") {
    displayError("Phone");
    isValid = false;
  }

  if (dob.trim() === "") {
    displayError("dob");
    isValid = false;
  }

  if (qualifications.trim() === "") {
    displayError("Qualifications");
    isValid = false;
  }

  if (address.trim() === "") {
    displayError("address");
    isValid = false;
  }

  if (country === "Select") {
    displayError("country");
    isValid = false;
  }

  if (state === "Select") {
    displayError("state");
    isValid = false;
  }

  if (city.trim() === "") {
    displayError("city");
    isValid = false;
  }

  if (pincode.trim() === "") {
    displayError("pin");
    isValid = false;
  }

  if (username.trim() === "") {
    displayError("username");
    isValid = false;
  }

  if (password.trim() === "") {
    displayError("password");
    isValid = false;
  }

  let isGenderSelected = false;

  for (const radio of genderRadios) {
    if (radio.checked) {
      isGenderSelected = true;
      break;
    }
  }

  if (!isGenderSelected) {
    genderError.style.display = "block";
    isValid = false;
  }

  function hideErrorOnKeyPress(inputId) {
    const inputElement = document.getElementById(inputId);
    const errorAlert = document.querySelector(`#${inputId} + .error-alert`);

    inputElement.addEventListener("input", function () {
      errorAlert.style.display = "none";
    });
  }
  hideErrorOnKeyPress("salutation");
  hideErrorOnKeyPress("FirstName");
  hideErrorOnKeyPress("LastName");
  hideErrorOnKeyPress("Email");
  hideErrorOnKeyPress("Phone");
  hideErrorOnKeyPress("dob");
  hideErrorOnKeyPress("Qualifications");
  hideErrorOnKeyPress("address");
  hideErrorOnKeyPress("country");
  hideErrorOnKeyPress("state");
  hideErrorOnKeyPress("city");
  hideErrorOnKeyPress("pin");
  hideErrorOnKeyPress("username");
  hideErrorOnKeyPress("password");

  return isValid;
}


//-----------------------------------------------upload-image------------------------------------------------
const inputFileError = document.getElementById("input-file-error");
const imageLabel = document.getElementById("drop-area");
const uploadBtn = document.getElementById("uploadImgBtn");
const fileInput = document.getElementById("input-file");
const imageViewDiv = document.getElementById("img-view");
const uploadedImage = document.getElementById("uploadedImage");
const uploadIcon = document.getElementById("uploadIcon");
const uploadSpan = document.getElementById("uploadSpan");
const imgtag = document.getElementById("imgtag");

uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click(); // Trigger the hidden file input when the button is clicked
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const imageLink = URL.createObjectURL(fileInput.files[0]);
    uploadedImage.src = imageLink;
    inputFileError.style.display = "none";
    imageViewDiv.style.border = "none";
    imgtag.style.display = "none";
    uploadIcon.style.display = "none";
    uploadSpan.style.display = "none";
  } else {
    // Handle the case where no file is selected
    uploadedImage.src = ""; // Clear the image source
    imageViewDiv.style.border = "none";
  }
});

//-------------------------------------- search employee- search bar-----------------------------------------
async function searchEmployee() {
  const searchInput = document.getElementById("searchEmployee").value;
  console.log(searchInput);
  if (searchInput === "" || searchInput === undefined || searchInput === null) {
    get_emp();
  } else {
    await fetch(`http://localhost:5001/employee/search?q=${searchInput}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const employeeData = data;
        currentPage = 1;
        Display(employeeData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
}

// REDIRECT FOR VIEWEMPLOYEE----------------------------------------------

function viewEmployee(empID) {
  window.location.href = `/view-employee/${empID}`;
}

// -----------------edit employee upload image-------------------------------

const editEmployeeImageLabel = document.getElementById("editForm-drop-area");
const editEmployeeFileInput = document.getElementById("editForm-input-file");
const selectedImage = document.getElementById("image-preview");

editEmployeeFileInput.addEventListener("change", (e) => {
  e.preventDefault();
  const file = editEmployeeFileInput.files[0];

  if (file) {
    const imgLink = URL.createObjectURL(file);
    selectedImage.src = imgLink;
    selectedImage.style.width = "110px";
    selectedImage.style.height = "110px";
  } else {
    selectedImage.src = "";
  }
});

const changeButton = document.querySelector("button");
changeButton.addEventListener("click", changeImage);

function changeImage(event) {
  event.preventDefault();
  editEmployeeFileInput.click();
}

// ---------------------------------cleaerForm----------------------------------------------

function clearForm() {
  document.getElementById("salutation").value = "";
  document.getElementById("FirstName").value = "";
  document.getElementById("LastName").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Phone").value = "";
  document.getElementById("dob").value = "";

  const genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach((radio) => {
    radio.checked = false;
  });

  document.getElementById("Qualifications").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pin").value = "";
}
