let login_screen = document.querySelector(".login_screen");
let appear_after_login = document.querySelector(".appear_after_login");
let input = document.querySelector("input");
let login_name = input.value;

function getMesseges(){
    request = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    request.then(function(answer){
        console.log(answer.data)
    })
}

function takeName(){
    list_name = [];
    login_name = input.value;
    let data_person = {
        name: login_name
        }
    let request = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", data_person);
    request.then(doLogin);
    request.catch(chooseOtherName)
}

function doLogin(answer){
    if(answer.data){
        login_screen.classList.add("hide");
        appear_after_login.classList.remove("hide");
    }
}

function chooseOtherName(answer){
    alert("Escholha outro nome!")
}

function continueOn(){
    data_person = {
        name: login_name
    }
    let itsOn = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", data_person);
    itsOn.then(function (){
        console.log("tudo certo!")
    })
  
}

function clickEnter(){
        document.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                const first_button = document.querySelector(".first_button");
                first_button.click();
            }
        })
}

clickEnter();
setInterval(continueOn, 5000);
getMesseges();

/*0: {from: 'umNomeAleatórioAí', to: 'Todos', text: 'sai da sala...', type: 'status', time: '04:24:15'}*/