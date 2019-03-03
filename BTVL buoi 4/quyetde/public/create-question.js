window.onload =()=>{
    // find element
    const textArea = document.getElementById('content');
    //.add event listener()

    textArea.addEventListener('input',(event)=>{
        const contentLength = textArea.value.length;
        console.log(contentLength);
        const remaincharater = document.getElementById('remain-character');
        remaincharater.innerText=`${200-contentLength} characters left `;
    });
};