window.onload = () => {
  const textArea = document.getElementById("content");

  textArea.addEventListener("input", (event) => {
    const contentLength = textArea.value.length;
    console.log(contentLength);
    const remaincharater = document.getElementById("remain-character");
    remaincharater.innerText = `${200 - contentLength} characters left `;
  });
};
$(document).ready(() => {
    const pathname = window.location.search;
    console.log(pathname);
  $.ajax({
    url: `get-create${pathname}`,
    type: 'GET',
    success: (data) => {},
    error: (err) => {
      console.log(err);
    }
  });
});
