const slides1 = document.getElementById('slides1');
const slides2 = document.getElementById('slides2');
const slides3 = document.getElementById('slides3');
const preBtn1 = document.getElementById('prev1');
const preBtn2 = document.getElementById('prev2');
const preBtn3 = document.getElementById('prev3');
const nextBtn1 = document.getElementById('next1');
const nextBtn2 = document.getElementById('next2');
const nextBtn3 = document.getElementById('next3');
let currentIdx1 = 0;
let currentIdx2 = 0;
let currentIdx3 = 0;

function moveSlideNext1(num){
    slides1.style.left= -num * 735 +'px';
    currentIdx1 = num;
}
function moveSlidePrev1(num){
    slides1.style.left= num * 735 +'px';
    currentIdx1 = num;
}
nextBtn1.addEventListener('click',()=>{
    console.log("nextBtn>",nextBtn1);
    if(currentIdx1<1){
        moveSlideNext1(currentIdx1+1);
        console.log(currentIdx1);
        document.getElementById('next1').innerHTML=``;
        document.getElementById('prev1').innerHTML=`<span class="material-symbols-outlined"> arrow_back_ios
        </span>`;
    }
});
preBtn1.addEventListener('click',()=>{
    console.log("preBtn>",preBtn1);
    if(currentIdx1>0){
        moveSlidePrev1(currentIdx1-1);
        console.log(currentIdx1);
        document.getElementById('next1').innerHTML=`<span class="material-symbols-outlined">
        arrow_forward_ios </span>`;
        document.getElementById('prev1').innerHTML=``;
    }
});
//--------------------
function moveSlideNext2(num){
    slides2.style.left= -num * 735 +'px';
    currentIdx2 = num;
}
function moveSlidePrev2(num){
    slides2.style.left= num * 735 +'px';
    currentIdx2 = num;
}
nextBtn2.addEventListener('click',()=>{
    console.log("nextBtn>",nextBtn2);
    if(currentIdx2<1){
        moveSlideNext2(currentIdx2+1);
        console.log(currentIdx2);
        document.getElementById('next2').innerHTML=``;
        document.getElementById('prev2').innerHTML=`<span class="material-symbols-outlined"> arrow_back_ios
        </span>`;
    }
});
preBtn2.addEventListener('click',()=>{
    console.log("preBtn>",preBtn2);
    if(currentIdx2>0){
        moveSlidePrev2(currentIdx2-1);
        console.log(currentIdx2);
        document.getElementById('next2').innerHTML=`<span class="material-symbols-outlined">
        arrow_forward_ios </span>`;
        document.getElementById('prev2').innerHTML=``;
    }
});
//--------------------
function moveSlideNext3(num){
    slides3.style.left= -num * 735 +'px';
    currentIdx3 = num;
}
function moveSlidePrev3(num){
    slides3.style.left= num * 735 +'px';
    currentIdx3 = num;
}
nextBtn3.addEventListener('click',()=>{
    console.log("nextBtn>",nextBtn3);
    if(currentIdx3<1){
        moveSlideNext3(currentIdx3+1);
        console.log(currentIdx3);
        document.getElementById('next3').innerHTML=``;
        document.getElementById('prev3').innerHTML=`<span class="material-symbols-outlined"> arrow_back_ios
        </span>`;
    }
});
preBtn3.addEventListener('click',()=>{
    console.log("preBtn>",preBtn3);
    if(currentIdx3>0){
        moveSlidePrev3(currentIdx3-1);
        console.log(currentIdx3);
        document.getElementById('next3').innerHTML=`<span class="material-symbols-outlined">
        arrow_forward_ios </span>`;
        document.getElementById('prev3').innerHTML=``;
    }
});