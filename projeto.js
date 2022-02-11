let input = document.querySelector("input");
let login_screen = document.querySelector(".login_screen");
let appear_after_login = document.querySelector(".appear_after_login")

function takeName(){
    let login_name = input.value;
    let data_person = {
        name: login_name
    }
    let request = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", data_person);
    request.then(doLogin);
}


function doLogin(answer){
    if(answer.data){
        login_screen.classList.add("hide");
        appear_after_login.classList.remove("hide");
    }
    console.log(answer.data)
}
