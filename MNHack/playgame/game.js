let temp =1;

function setround(){
    const itemLink = 
        `<div class="row container-fluid mb-1">
        <div class="col-4 my-2">Round${temp}</div>
        <div class="col-2">
                <input id="socrePlayer1Round${temp}" class="form-control mr-sm-2 my-2" >
        </div>    
        <div class="col-2">
                <input id="socrePlayer2Round${temp}" class="form-control mr-sm-2 my-2" >
        </div>
        <div class="col-2">
                <input id="socrePlayer3Round${temp}" class="form-control mr-sm-2 my-2" >
        </div>
        <div class="col-2">
                <input id="socrePlayer4Round${temp}" class="form-control mr-sm-2 my-2" >
        </div>
    </div>
        `
        $('#round').append(itemLink);
        temp+=1;
}

function getscoreoneround(){
    const score1 = document.getElementById(`socrePlayer1Round${temp-2}`).value;
    const score2 = document.getElementById(`socrePlayer2Round${temp-2}`).value;
    const score3 = document.getElementById(`socrePlayer3Round${temp-2}`).value;
    const score4 = document.getElementById(`socrePlayer4Round${temp-2}`).value;
    $.ajax({
        url : `/savescore?score1=${score1}&score2=${score2}&score3=${score3}&score4=${score4}&round=${temp-2}`,
        type : 'GET',
        success : (data)=>{
            console.log('success');
        },
        error : (error)=>{}
    })
}

function gettotalscore(){
    $.ajax({
        url: '/totalscore',
        type: 'GET',
        success : (data)=>{
            document.getElementById('sumscore').innerText=`Sum of Score(${data.total1+data.total2+data.total3+data.total4})`;
            document.getElementById('total1').innerText = `${data.total1}`;
            document.getElementById('total2').innerText = `${data.total2}`;
            document.getElementById('total3').innerText = `${data.total3}`;
            document.getElementById('total4').innerText = `${data.total4}`;
        },
        error : (err)=>{},
    })
}

window.onload = ()=>{

    setround();
    gettotalscore();
    $.ajax({
        url : '/startgame',
        type: 'GET',
        success : (data)=>{
            document.getElementById('player1').innerText = `${data.namePlayer1}`;
            document.getElementById('player2').innerText = `${data.namePlayer2}`;
            document.getElementById('player3').innerText = `${data.namePlayer3}`;
            document.getElementById('player4').innerText = `${data.namePlayer4}`;
        },
        error : (err)=>{}
    });

    document.getElementById('addround').addEventListener('click', () => {
        setround();
        getscoreoneround();
        gettotalscore();
    });
}