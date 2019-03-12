$(document).ready(() => {
  let idQuestion = {};
  getRandomQuestion(idQuestion);

  $("#createques").click(() => {
    $.ajax({
      url: ``,
      type: "GET",
      success: () => {},
      error: (err) => {
        console.log(err);
      }
    });
  });

  $("#yes").click(() => {
    $.ajax({
      url: `get-vote?questionId=${idQuestion.id}&vote=yes`,
      type: "GET",
      success: (data) => {
        window.location.href = `/result/${idQuestion.id}`
      },
      error: (err) => {
        console.log(err);
      }
    });
  });

  $("#no").click(() => {
    $.ajax({
      url: `get-vote?questionId=${idQuestion.id}&vote=no`,
      type: "GET",
      success: (data) => {
        window.location.href = `/result/${idQuestion.id}`;
      },
      error: (err) => {
        console.log(err);
      }
    });
  });
  $('#other-question').click(()=>{
    window.location.reload();
  })
  $('#question-result').click(()=>{
    window.location.href = `/result/${idQuestion.id}`;
  })
  $('#create-question').click(()=>{
    window.location.href = "/create-question";
  })
});
function getRandomQuestion(idQuestion) {
  $.ajax({
    url: "/get-random-question",
    type: "GET",

    success: (data) => {
      document.getElementById("question-content").innerText = data.content;
      idQuestion.id = data._id;
    },
    error: (error) => {
      console.log(error);
    }
  });
}
