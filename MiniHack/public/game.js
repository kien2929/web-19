$(document).ready(() => {
    let a=1;
    document.getElementById(`player1-round${a}-score`).addEventListener("input", (e) => {
        const form = document.getElementById(`player1-round${a}-score`);
        const score1 = Number(form.content);
        if (!score1) {
            console.log("aaa");
            document.getElementById("p1s").innerText =score1;
        }else{
            document.getElementById("p1s").innerText ="";
        }

        
    })
    $("#add-button").click(()=>{
        const round = `<div class="row">
        <div class="colum">Round ${a+=1}</div>
        <div class="colum">
            <div class="form-group" id="player1-round${a+=1}-score">
                <input type="email" class="form-control">
              </div></div>
        <div class="colum"><div class="form-group" id="player2-round${a+=1}-score">
            <input type="email" class="form-control">
              </div>
            </div>
        <div class="colum">
            <div class="form-group" id="player3-round${a+=1}-score">
                <input type="email" class="form-control">
              </div></div>
        <div class="colum">
            <div class="form-group" id="player4-round${a+=1}-score">
                <input type="email" class="form-control">
              </div>
            </div>
        </div>`;
    $("#table").append(round);
    });
    
})