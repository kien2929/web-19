$(document).ready(()=>{
    let idQuestion={};
    getRandomQuestion(idQuestion);


})
function getRandomQuestion(idQuestion){
    $.ajax({
        url:'/get-radom-question',
        type:'GET',
        success: (data)=> {
                document.getElementById('question-content').innerText=data.content;
                idQuestion.id = data.id ;
        },
        error:(error)=>{
            console.log(error);
        }   
    })
}