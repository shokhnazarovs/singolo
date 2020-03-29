//Active MENU
///////////////////////////////////////////////////////
function menuUpdate(){

    let ser = document.getElementById("our_services");
    console.log(ser.offsetTop);
    console.log(ser.offsetHeight);
    console.log(window.scrollY);

    let menuBtn = document.querySelectorAll(".bar a");

    for(let i=0; i<menuBtn.length; i++){
        menuBtn[i].classList.remove("selected");
    }

    let yPos = window.scrollY;

    if(yPos < 300){
        menuBtn[0].classList.add('selected');
    } else if(yPos < 1000){
        menuBtn[1].classList.add('selected');
    } else if(yPos < 1700){
        menuBtn[2].classList.add('selected');
    } else if(yPos < 2400){
        menuBtn[3].classList.add('selected');
    } else {
        menuBtn[4].classList.add('selected');
    }
}


document.addEventListener('scroll', menuUpdate);

//Slider Carousel
/////////////////////////////////////////////////////
let next = document.querySelector(".right");
let prev = document.querySelector(".left");
let widthEl = document.querySelector('.encloser');

function slideRight(){
    let w = parseInt(window.getComputedStyle(widthEl, null).getPropertyValue("width"));
    let pos1 = 0;
    let pos2 = w;
    let slider = document.getElementsByClassName('slider__wrapper');

    let id = setInterval(frame, 1);

    function frame() {
        if (pos1 >= w) {
            clearInterval(id);
            slider[0].innerHTML = slider[1].innerHTML;
            slider[1].innerHTML = slider[2].innerHTML;
            slider[2].innerHTML = slider[0].innerHTML;

            slider[0].style.left = '0' + 'px';
            slider[1].style.left = w + 'px';
        } else {
            pos1 += 5;
            pos2 += 5;
            slider[0].style.left = pos1 + 'px';
            slider[1].style.left = pos2 + 'px';
        }
    }
}

function slideLeft(){
    let w = parseInt(window.getComputedStyle(widthEl, null).getPropertyValue("width"));
    let pos1 = w*2;
    let pos2 = w;
    let slider = document.getElementsByClassName('slider__wrapper');

    let id = setInterval(frame, 1);

    function frame() {
        if (pos1 <= w) {
            clearInterval(id);
            slider[0].innerHTML = slider[1].innerHTML;
            slider[1].innerHTML = slider[2].innerHTML;
            slider[2].innerHTML = slider[0].innerHTML;

            slider[2].style.left = w*2 + 'px';
            slider[1].style.left = w + 'px';
        } else {
            pos1 -= 5;
            pos2 -= 5;
            slider[2].style.left = pos1 + 'px';
            slider[1].style.left = pos2 + 'px';
        }
    }
}

next.addEventListener("click", slideLeft);
prev.addEventListener("click", slideRight);

//iPhone screen
/////////////////////////////////////////////////////

function switchVertical(){
    let off = document.querySelector(".off-1");
    off.style.zIndex = (Number(window.getComputedStyle(off, null).getPropertyValue("z-index")) * -1).toString();
}

function switchHorizontal(){
    let off = document.querySelector(".off-2");
    off.style.zIndex = (Number(window.getComputedStyle(off, null).getPropertyValue("z-index")) * -1).toString();
}


//Portfolio tab switch
//////////////////////////////////////////////////////
let tabMenu = document.querySelector(".categories");

function shuffleImages(){
    let imagesEl = document.querySelectorAll(".img img");
    let temp = imagesEl[0].src;

    for(let i=0; i<imagesEl.length -1; i++){
        imagesEl[i].src = imagesEl[i+1].src;
    }

    imagesEl[imagesEl.length-1].src = temp;

    for(let i=0; i<imagesEl.length; i++){
        imagesEl[i].classList.remove("borderate");
    }
}

function activate(e){
    if(!e.target.classList.contains('active'))
        shuffleImages();

    let menuBtn = document.querySelectorAll(".box-new");
    for(let i=0; i<menuBtn.length; i++){
        menuBtn[i].classList.remove("active");
    }
    e.target.classList.add("active");

}

tabMenu.addEventListener("click", activate);


//Portfolio image border
let img_containerEl = document.querySelector(".img_container");

function borderate(e){
    let gridImages = document.querySelectorAll(".img img");
    for(let i=0; i<gridImages.length; i++){
        gridImages[i].classList.remove("borderate");
    }
    e.target.classList.add("borderate");
}

img_containerEl.addEventListener("click", borderate);


//Form message
//////////////////////////////////////////////////////////

const submitBtn = document.getElementById("form-submit");
const okBtn = document.querySelector(".popup button");
const popupEl = document.getElementsByClassName("popup")[0];
const fadeEl = document.querySelector(".fade");


function buttonClick(e){
    e.preventDefault();
    const nameEl = document.getElementsByName("name")[0];
    const mailEl = document.getElementsByName("email")[0];
    const subjectEl = document.getElementsByName("subject")[0];
    const descriptionEl = document.getElementsByName("description")[0];
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if(nameEl.value === ""){
        nameEl.classList.add("required");
    } else {
        nameEl.classList.remove("required");
    }

    if(!mailEl.value.match(mailformat)){
        mailEl.classList.add("required");
    } else {
        mailEl.classList.remove("required");
    }

    if(!nameEl.classList.contains("required") && !mailEl.classList.contains("required")){
        popupEl.style.display = "";
        fadeEl.style.opacity = '0.2';

        if(subjectEl.value === ""){
            popupEl.querySelector(".subject").textContent = 'No subject';
        } else {
            popupEl.querySelector(".subject").textContent = 'Subject:  ' + subjectEl.value;
        }

        if(descriptionEl.value === ""){
            popupEl.querySelector(".description").textContent = 'No description ';
        } else {
            popupEl.querySelector(".description").textContent = 'Description:  ' + descriptionEl.value;
        }
    }
}

function okClick(){
    popupEl.style.display = "none";
    fadeEl.style.opacity = '1';
    document.getElementsByTagName("form")[0].reset();
}

submitBtn.addEventListener("click", buttonClick);
okBtn.addEventListener('click', okClick);
