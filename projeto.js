let login_screen = document.querySelector(".login_screen");
let appear_after_login = document.querySelector(".appear_after_login");
let input = document.querySelector("input");
let login_name = input.value;
let section = document.querySelector("section");
let old_data = [];
let store_data = [];
let sum = 0;
let choose = document.querySelector(".choose");
let back_black = document.querySelector(".back_black");
let listOfMessages = [];
let how_tosend = 'message';
let dontDoIt = [];
let itens_selected = [];
let number = 0;


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
   setInterval(putNewMessages, 3000);
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

    old_data = new_data

    let element = document.querySelector(".new" + sum);
    if(element !== null){
    element.scrollIntoView();
    }
        }
}

function printNewData(list){
    sum++
    for(let i = 0; i < list.length; i++){
        if(list[i].type === "status"){
            section.innerHTML += `
            <div class="main_message ${list[i].type} new${sum}">(${list[i].time}) <b>${list[i].from}</b> ${list[i].text}</div>
        `
        }else if(list[i].type === "message"){
            section.innerHTML += `
            <div class="main_message ${list[i].type} new${sum}">(${list[i].time}) <b>${list[i].from}</b> para <b>${list[i].to}</b>: ${list[i].text}</div>
        `
        }else if(list[i].type === "private_message"){
            section.innerHTML += `
            <div class="main_message ${list[i].type} new${sum}">(${list[i].time}) <b>${list[i].from}</b> reservadamente para <b>${list[i].to}</b>: ${list[i].text}</div>
        `
        }  
    }
}

function gettingInformations(){
    let participant = document.querySelector(".participant");

    participant.innerHTML = '';
    
    request = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    request.then(function(it){
        let participants = it.data;
        
        for(let i = 0; i < participants.length; i++){
            participant.innerHTML = participant.innerHTML + `
                <div class="it" onclick = "chooseParticipant('${participants[i].name}')"><ion-icon name="person-circle-outline"></ion-icon> <p>${participants[i].name}</p><ion-icon name="checkmark-circle" class="${participants[i].name} hide""></ion-icon></div>
            `
        }
    })
}

function chooseParticipant(participant_name){
    let write = document.querySelector("textarea").value;
    let selected = document.querySelector("." + participant_name);

        selected.classList.remove('hide');

        itens_selected.push(selected);

        message_write = {
            from: login_name,
            to: participant_name,
            text: write,
            type: how_tosend,
        }

    listOfMessages.push(message_write);

    if(listOfMessages.length >= 2){
        for(let i = 0; i < itens_selected.length; i++){
            itens_selected[i].classList.add('hide')
        }
        listOfMessages = [];
        itens_selected = [];
    }
    number++;
    console.log(listOfMessages)
}

function appearOptions(){
    choose.classList.remove('hide');
    back_black.classList.remove('hide')
}

function withdrawBackBlack(){
    choose.classList.add('hide');
    back_black.classList.add('hide')
}

function choosingPublicOrPrivated(wish){
    wishInDom = document.querySelector('.' + wish);
    wishInDom.classList.remove('hide');
    how_tosend = wish;
    if(document.querySelector(".privated_message") === wishInDom){
        document.querySelector(".message").classList.add('hide');
        document.querySelector(".privated_message").classList.remove('hide');
    }else{
        document.querySelector(".message").classList.remove('hide');
        document.querySelector(".privated_message").classList.add('hide');
    }
}

function sendMessages(){
    if(number === 0){
        listOfMessages[0] = {
            from: login_name,
            to: 'Todos',
            text: document.querySelector('textarea').value,
            type: how_tosend,
        }
        request = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", listOfMessages[0]);
        request.then(function(answer){
            console.log(answer);
        })
        request.catch(function(answer){
            console.log(answer)
        })
    }else{
    newrequest = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", listOfMessages[0]);
    newrequest.then(function(newanswer){
        console.log(newanswer);
    })
    newrequest.catch(function(newanswer){
        console.log(newanswer)
    })
    }
}

clickEnter();
setInterval(continueOn, 5000);
setInterval(gettingInformations(), 10000);

console.log(listOfMessages[0])