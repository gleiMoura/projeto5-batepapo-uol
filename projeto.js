let login_screen = document.querySelector(".login_screen");
let appear_after_login = document.querySelector(".appear_after_login");
let input = document.querySelector("input");
let login_name = input.value;
let section = document.querySelector("section");
let old_data = [];
let store_data = [];

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

   putMessages();
   setInterval(putNewMessages, 3000)
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

function putMessages(){
    section.innerHTML = "";

    request = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    request.then(getMessages);

    function getMessages(answer){
    let new_data = answer.data;
    printData(new_data);
    }
}

function printData(list){
    for(let i = 0; i < list.length; i++){
        if(list[i].type === "status"){
            section.innerHTML += `
            <div class="main_message ${list[i].type}">(${list[i].time}) <b>${list[i].from}</b> ${list[i].text}</div>
        `
        }else if(list[i].type === "message"){
            section.innerHTML += `
            <div class="main_message ${list[i].type}">(${list[i].time}) <b>${list[i].from}</b> para <b>${list[i].to}</b>: ${list[i].text}</div>
        `
        }else if(list[i].type === "private_message"){
            section.innerHTML += `
            <div class="main_message ${list[i].type}">(${list[i].time}) <b>${list[i].from}</b> reservadamente para <b>${list[i].to}</b>: ${list[i].text}</div>
        `
        }  
    }
}

function putNewMessages(){
    request = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    request.then(getMessages);

    function getMessages(answer){
    let new_data = answer.data;
   
    const arr3 = new_data.filter( x => { 
        return JSON.stringify(old_data).indexOf(JSON.stringify(x)) < 0;
    });
    
    printNewData(arr3);

    old_data = new_data;
        }
}

function printNewData(list){
    for(let i = 0; i < list.length; i++){
        if(list[i].type === "status"){
            section.innerHTML += `
            <div class="main_message ${list[i].type} new>(${list[i].time}) <b>${list[i].from}</b> ${list[i].text}</div>
        `
        }else if(list[i].type === "message"){
            section.innerHTML += `
            <div class="main_message ${list[i].type} new">(${list[i].time}) <b>${list[i].from}</b> para <b>${list[i].to}</b>: ${list[i].text}</div>
        `
        }else if(list[i].type === "private_message"){
            section.innerHTML += `
            <div class="main_message ${list[i].type} new">(${list[i].time}) <b>${list[i].from}</b> reservadamente para <b>${list[i].to}</b>: ${list[i].text}</div>
        `
        }  
    }
}


clickEnter();
setInterval(continueOn, 5000);
/*0: {from: 'umNomeAleatórioAí', to: 'Todos', text: 'sai da sala...', type: 'status', time: '04:24:15'}*/

/** */