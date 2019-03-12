$(document).ready(()=>{
    const pathname = window.location.pathname;
    const questionId = pathname.split('/')[pathname.split('/').length-1];

    $.ajax({
        url:`/get-question-by-id?questionId=${questionId}`,
        type:'GET',
        success: (data)=> {
            console.log(data);
            if(data._id){
                document.getElementById('question-content').innerText=data.content;
                document.getElementById('total-votes').innerText=`Total Votes: ${data.yes +data.no}`;
                if(data.yes+data.no==0){
                    const yesPer=0;
                    const noPer=0;
                    document.body.innerHTML = document.body.innerHTML.replace(/yeswidth/g, '0');
                    document.body.innerHTML = document.body.innerHTML.replace(/nowidth/g, '0');
                }else{
                    const yesPer=data.yes/(data.yes+data.no)*100;
                    const noPer=100-yesPer;
                    document.getElementById('yes-per').innerText=`Yes: ${yesPer.toFixed(2)}% `
                    document.getElementById('no-per').innerText=`No: ${noPer.toFixed(2)}%`
                    document.body.innerHTML = document.body.innerHTML.replace(/yeswidth/g, `${yesPer.toFixed(0)}%`);
                    document.body.innerHTML = document.body.innerHTML.replace(/nowidth/g, `${noPer.toFixed(0)}%`);
                }
                
            }else{
                document.getElementById('question-content').innerText='Question not found';
            }
        },
        error:(error)=>{
            console.log(error);
        },
        
    })
});