window.onload = () => {
  // Số kí tự đã nhập trong textArea
  const textArea = document.getElementById("content");
  textArea.addEventListener("input", (event) => {
    const contentLength = textArea.value.length;
    const remaincharater = document.getElementById("remain-character");
    remaincharater.innerText = `${200 - contentLength} characters left `;
  });

  document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("create question");
    //get question content
    const form = document.getElementById("create-form");
    const questionContent = form.content.value;
    if (!questionContent) {
      document.getElementById("error-mess").innerText = "Please input!";
    } else {
      document.getElementById("error-mess").innerText = "";
      document.getElementById("success-mess").innerText = "Send success!";
      $.ajax({
        url: "/create-question",
        type: "POST",
        data: {
          content: questionContent
        },
        success: (data) => {},
        error: (error) => {}
      });
    }
  });
};
$(document).ready(() => {
  console.log(window.location);
  const pathname = window.location.search;
  console.log(pathname);
  $.ajax({
    url: `get-create${pathname}`,
    type: "GET",
    success: (data) => {},
    error: (err) => {
      console.log(err);
    }
  });
});
