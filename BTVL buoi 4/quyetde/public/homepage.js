$(document).ready(() => {
  let idQuestion = {};
  getRandomQuestion(idQuestion);



  $("#yes").click(() => {
    $.ajax({
      url: `get-vote?questionId=${Number(idQuestion.id)}&vote=yes`,
      type: "GET",
      success: () => {},
      error: (err) => {
        console.log(err);
      }
    });
  });


  $("#no").click(() => {
    $.ajax({
      url: `get-vote?questionId=${Number(idQuestion.id)}&vote=no`,
      type: "GET",
      success: () => {},
      error: (err) => {
        console.log(err);
      }
    });
  });

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
  
});
function getRandomQuestion(idQuestion) {
    $.ajax({
      url: "/get-random-question",
      type: "GET",

      success: (data) => {
        document.getElementById("question-content").innerText = data.content;
        idQuestion.id = data.id;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
