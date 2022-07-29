var postAPI = "http://localhost:3030/single";

document.querySelector(".btn-upload").addEventListener("click", () => {
  var input = document.querySelector(".image").files[0];
  var name = document.querySelector(".name").value;
  upload(input, name);
});

function upload(image, name) {
  var formData = new FormData();
  formData.append("image", image);
  formData.append("name", name);
  fetch(postAPI, {
    method: "POST",
    body: formData,
  });
}
