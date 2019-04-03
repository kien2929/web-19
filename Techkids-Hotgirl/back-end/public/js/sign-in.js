function validatePassword(inputPassword){
    return inputPassword.length > 4;
}
$(document).ready(()=>{
    let email,password;
    $("#inputPassword").change(function(){
        password = $(this).val();
        console.log(password);
        if(validatePassword(password)){
            $(".nof-pwd").text('valid password');
            $(".nof-pwd").css({color : "#64FE2E"});
        }
        else {
            $(".nof-pwd").text('invalid password');
            $(".nof-pwd").css({color : '#FE2E2E'});
        }
    });
    $("#inputEmail").change(function(){
        email = $(this).val().trim();
    console.log(email);
    })

    $("#submit").click(()=>{
        $.ajax({
            url : '/api/auth/login',
            type : 'POST',
            data : {
                email : email,
                password : password
            },
            success : (data)=>{
                console.log(data);
                if(data.success == false) {
                    $(".nof-error").text(data.message);
                    $(".nof-error").css({color : '#FE2E2E'});
                }
                else {
                    window.location.href = '/posts';
                }
            },
            error : (error)=>{
                throw error;
            }
        });
    });
});