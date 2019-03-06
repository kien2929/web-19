$(document).ready(() => {
  let idQuestion = {};
  getRandomQuestion(idQuestion);
});
// $('#yes').click(){
//     if(1){

//     }
// }
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
