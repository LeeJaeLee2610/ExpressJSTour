var getAPI = "http://localhost:3030/students/getStudents";
var postAPI = "http://localhost:3030/students/postStudent";
var deleteAPI = "http://localhost:3030/students/deleteStudent";
var putAPI = "http://localhost:3030/students/putStudent";
var getStudentAPI = "http://localhost:3030/students/getStudentByID";
var searchAPI = "http://localhost:3030/search";
var testSession = "http://localhost:3030/students/test";

function test1() {
  fetch(testSession)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      document.querySelector(".test").innerHTML = data.student
        .map((item) => {
          return `
          <div>${item.name}</div>
        `;
        })
        .join("");
      console.log(data);
    });
}

test1();
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
      setTimeout(() => {
        alert("POST");
        window.location.reload();
      }, 1000);
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
    setTimeout(() => {
      alert("Delete");
      window.location.reload();
    }, 1000);
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
      setTimeout(() => {
        alert("PUT");
        window.location.reload();
      }, 1000);
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
          <div>
            <span>${student.name}</span>
            <span>${student.gpa}</span></div>
          <div class="btn">
            <button onClick="getStudentByID('${student._id}')">Update</button>
            <button onClick="doDelete('${student._id}')">Delete</button>
          </div>
        </li>
    `;
  });
  console.log(students);
  listS.innerHTML = htmls.join("");
}

var search_input = document.querySelector(".searchByName");

search_input.addEventListener("input", handleChange);

document.querySelector(".about").innerHTML = `<span>Khong co gi</span>`;

function handleChange(e) {
  if (e.target.value == "") {
    document.querySelector(".about").innerHTML = `<span>Khong co gi</span>`;
  } else {
    fetch(`${searchAPI}?name=${e.target.value}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        handleSearch(data);
      });
  }
  console.log(`${searchAPI}?name=${e.target.value}`);
}

function handleSearch(data) {
  const search = document.querySelector(".about");
  var htmls = data.search.map((item) => {
    return `<span>${item.name}</span><br />`;
  });
  search.innerHTML = htmls.join("");
}

// const images = [];
// fetch("https://picsum.photos/v2/list")
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     console.log(res);
//   });
