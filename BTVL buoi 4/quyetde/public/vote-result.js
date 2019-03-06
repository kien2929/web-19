$(document).ready(()=>{
    const pathname = window.location.pathname;
    const questionId = pathname.split('/')[pathname.split('/').length-1];

    $.ajax({
        url:`/get-question-by-id?questionId=${questionId}`,
        type:'GET',
        success: (data)=> {
            console.log(data);
            if(data.id){
                document.getElementById('question-content').innerText=data.content;
                document.getElementById('total-votes').innerText=`Total Votes: ${data.yes +data.no}`;
                const yesPer=data.yes/(data.yes+data.no)*100;
                const noPer=100-yesPer;
                document.getElementById('yes-per').innerText=`Yes: ${yesPer.toFixed(2)}`
                document.getElementById('no-per').innerText=`No: ${noPer.toFixed(2)}`
            }else{
                document.getElementById('question-content').innerText='Question not found';
            }
        },
        error:(error)=>{
            console.log(error);
        },
        
    })
});