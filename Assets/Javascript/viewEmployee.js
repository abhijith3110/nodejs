function retrieveAndUseIdFromUrl(url) {
  const regex = /\/view-employee\/([^/]+)$/;
  const match = url.match(regex);
  if (match) {
    const id = match[1];
    return id;
  } else {
    console.error("Id not found in the URL");
  }
}

const employeeid = retrieveAndUseIdFromUrl(window.location.href);
//-------------------function to calculate age of the employee----------------------------

function age(dob) {
  const currentDate = new Date();
  const [date, month, year] = dob.split("-");
  const yearsDiff = currentDate.getFullYear() - year;
  return yearsDiff;
}
console.log(employeeid);
view_Employee(employeeid);
function view_Employee(_employeeid) {
  fetch(`http://localhost:5001/employee/${_employeeid}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById(
        "employee-heading"
      ).innerHTML = `<div class="user-pic">
                    <img src="/${
                      data.image
                    }" alt="" style="border-radius: 50%;">
                  </div>
                  <div class="employee-details-row">
                    <h4>${data.salutation}${
        data.firstName + " " + data.lastName
      }</h4>
                    <P>${data.email}</P>
                  </div>
              </div>
              <div class="row">
                <div class="input-section col-md-4">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Gender</p>
                      <h5>${data.gender}</h5>
                    </div>
                  </div>
                </div>
                <div class="input-section col-md-4">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Age</p>
                      <h5>${age(data.dob)}</h5>
                    </div>
                  </div>
                </div>
                <div class="input-section col-md-4">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Date of Birth</p>
                      <h5>${data.dob}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="input-section col-md-6">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Mobile Number</p>
                      <h5>${data.phone}</h5>
                    </div>
                  </div>
                </div>
                <div class="input-section col-md-6">
                  <div class="card-box">
                    <div class="card-body-box">
                      <p>Qualifications</p>
                      <h5>${data.qualifications}</h5>
                    </div>
                  </div>
                </div>
                <!-- row.3 -->
                <div class="row">
                  <div class="input-section col-md-6 box_add">
                    <div class="card-box">
                      <div class="card-body-box">
                        <p>Address</p>
                        <h5>${data.address}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="input-section col-md-6 box_add">
                    <div class="card-box" style="padding-bottom: 17px;">
                      <div class="card-body-box">
                        <p>Username</p>
                        <h5>${data.username}</h5>
                      </div>
                    </div>
                  </div>
                  <!-- row.4 -->
                  <div class="row">
                    <div class="input-section col-md-12 mt-4 mb-3">
                      <button type="button" class="btn btn-danger btn-main" onclick="open_delete_employee(employeeid)">Delete</button>
                      <button type="button" class="btn btn-primary btn-filled btn-main" id="editEmployee" onclick="edit_employee(employeeid)">Edit Details</button>
                    </div>
                  </div>
                </div>
              </div>`;
      const empName = document.getElementById("empName");
      empName.innerHTML = `Dashboard /${
        data.firstName + " " + data.lastName}/ ${data.email}`;
    });
}
//reDirecting to the home page
function homeEmployee() {
  window.location.href = `/home`;
}

const empDel = document.getElementById("emp_del");
empDel.addEventListener("click", () => {
  close_delete_employee();
  delete_employee(employeeid);
  deletedEmployee();
});

// delete-method---------------
function delete_employee(employeeid) {
  fetch(`http://localhost:5001/employee/${employeeid}`, {
    method: "DELETE",
  });
  deletedEmployee();
}

function deletedEmployee() {
  var addedEmployee = document.getElementById("deleted-emp");
  addedEmployee.style.display = "block";
  var overlay_close = document.getElementsByClassName("overlay")[0];
  overlay_close.style.display = "block";
}


const viewEdited = document.getElementById("btn-main");
viewEdited.addEventListener("click",()=>{
  editEmployee(employeeid);
  location.reload();
});
