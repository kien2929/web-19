
window.onload = () =>{
    const textArea = document.getElementById('create');
    
    textArea.addEventListener('submit',(event) => {
        event.preventDefault();
        const name1 = document.getElementById('1');
        const name2 = document.getElementById('2');
        const name3 = document.getElementById('3');
        const name4 = document.getElementById('4');
        console.log(name1.value);

        $.ajax({
            url: `/create?player1=${name1.value}&player2=${name2.value}&player3=${name3.value}&player4=${name4.value}`,
            type: 'GET',
            success: (data)=>{
            },
            error: (error)=> {
                throw error;
            }
        });
        window.location.href = '/playgame';

    })
}