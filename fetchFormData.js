var postAPI = "http://localhost:3030/single";

function doPost() {
  var input = document.querySelector(".image");

  var data = new FormData();
  data.append("file", input.files[0]);
  data.append("user", "hubot");

  fetch(postAPI, {
    method: "POST",
    body: data,
  });
}
