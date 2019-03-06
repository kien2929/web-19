$(document).ready(() => {
  let idQuestion = {};
  getRandomQuestion(idQuestion);
});
function getRandomQuestion(idQuestion) {
  $.ajax({
    url: '/get-random-question',
    type: 'GET',
    
    success: (data) => {
        // console.log(data);
      if (data) {
        document.getElementById('question-content').innerText = data.content;
        idQuestion.id = data.id;
      } else {
        document.getElementById('question-content').innerText = 'data-content';
      }
    },
    error: (error) => {
      console.log(error);
    }
  });
}
