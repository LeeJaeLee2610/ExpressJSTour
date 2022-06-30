var getAPI = "http://localhost:3030/students/getStudents";
var postAPI = "http://localhost:3030/students/postStudent";
var deleteAPI = "http://localhost:3030/students/deleteStudent";
var putAPI = "http://localhost:3030/students/putStudent";
var getStudentAPI = "http://localhost:3030/students/getStudentByID";

doGet(renderStudent);

function doGet(callback) {
  fetch(getAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function doPost() {
  var name = document.querySelector(".name").value;
  var gpa = parseFloat(document.querySelector(".gpa").value);
  var id = parseInt(document.querySelector(".id").value);
  var formData = {
    name: name,
    gpa: gpa,
    id: id,
  };
  var options = {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  fetch(postAPI, options)
    .then(function (response) {
      response.json();
    })
    .then(() => {
      alert("Da them");
      window.location.reload();
    });
}

function doDelete(_id) {
  const options = {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(deleteAPI + "/" + _id, options).then(() => {
    alert("Da Xoa");
    window.location.reload();
  });
}

function doPut(_id) {
  data = {
    name: document.querySelector(".nameUpdate").value,
    gpa: document.querySelector(".gpaUpdate").value,
  };
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(putAPI + "/" + _id, options)
    .then((res) => res.json())
    .then(() => {
      console.log("Da PUT");
      window.location.reload();
    });
}

function getStudentByID(_id) {
  console.log(getStudentAPI + "/" + _id);
  fetch(getStudentAPI + "/" + _id)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".studentByID").innerHTML = `
        <input type="text" class="nameUpdate" value='${data.name}'/>
        <input type="text" class="gpaUpdate" value="${data.gpa}"/>
        <button onClick="doPut('${data._id}')">Update</button>
      `;
    });
}

function renderStudent(students) {
  const listS = document.querySelector(".list-students");
  var htmls = students.map((student) => {
    return `
        <li class=${student.id}>
          <span>${student.name}</span><br>
          <span>${student.gpa}</span><br>
          <button onClick="getStudentByID('${student._id}')">Update</button>
          <button onClick="doDelete('${student._id}')">Delete</button>
        </li>
    `;
  });
  listS.innerHTML = htmls.join("");
}
