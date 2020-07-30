/* 자바스크립트 엄격한 버전
실수로 발생할 수 있는 오류가 통과하지 못하도록 엄격하게 한다. */
'use strict'

// ***Make navbar transparent when it is on the top***
//=======================================================
//navbar의 Element요소를 navbar에 대입한다.
const navbar = document.querySelector('#navbar');
//.getBoundingClientRect()함수를 이용해 navbar Element의 height를 navbarHeight에 대입한다.
const navbarHeight = navbar.getBoundingClientRect().height;

/* 스크롤이 될때마다 함수를 호출한다.
해당 함수는 아무런 인자를 받지 않고 함수를 실행 */
document.addEventListener('scroll', () => {
    //console.log("Math.round(window.scrollY >> " + Math.round(window.scrollY));
    //console.log(`navbarHeight >>  ${navbarHeight}`);

    //스크롤바Y가 navbarHeight보다 클 경우
    if(window.scrollY > navbarHeight){
        //navbar에 클래스를 추가하는데
        //navbar--dark라는 클래스 name를 추가한다.
        navbar.classList.add('navbar--dark')
    }else{
        //스크롤바Y가 navbarHeight보다 작을 경우
        //navbar--dark를 제거한다.
        navbar.classList.remove('navbar--dark')
    }
});

/* Document Element의 사이즈는
content, scrollbars, padding, border를 합한 총 사이즈이다.
이는 offsetWidth와 offsetHeight를 이용하면 됨, Element의 width 와 height를 리턴함
.getBoundingClientRect() 함수는 최종적으로 렌더링된 width와 height를 리턴함.
ex)
width: 100px; 를 scale(0.5);로(반으로) 줄였을때?
.getBoundingClientRect()는 width: 50px; 나타냄
but, offserWidth는 width: 100px; 를 나타냄
*/

//***Handle scrolling when tapping on the navbar menu***
//=======================================================
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {

    //변수 선언
    const target = event.target;
    const link = target.dataset.link;
    //데이터 유무확인
    if(link == null){
        return;
    }

    //html에 저정한 변수의 데이터가 dataset 안에 할당됨
    // 속성을 넣어서 각각의 id를 연결시킴
    //console.log(event.target.dataset.link);
    //const scrollTo = document.querySelector(link);
    //scrollTo.scrollIntoView({behavior: "smooth"});

    scrollIntoView(link);
});

//***Handle click on "contact me" button on home***
//=======================================================
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', ()=> {
    scrollIntoView('#contact');
});

//***Make home slowly fade to transparent as the window scrolls down***
//=======================================================
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    //homeHeight >> 692.4000244140625
    console.log('homeHeight >> : ' + homeHeight); 
    // 1 - 0 / 800 = 1
    // 1- 400 / 800 = 0.5
    // 1 - 800 / 800 = 0
    console.log(1 - window.scrollY / homeHeight);

    home.style.opacity = 1 - window.scrollY / homeHeight;
    
});

//***Show "arrow up" button when scrolling down***
//=======================================================
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    //scroll이 homeheight의 절반을 지났을 때
    if(window.scrollY > homeHeight / 2){
        //arrow-up 클래스에 visible 이라는 새로운 클래스를 추가한다.
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the "arrow up" button
//=======================================================
arrowUp.addEventListener('click', () => {
    scrollIntoView("#home");
});

//***Projects***
//=======================================================
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.works__projects');
//각각의 container와 각각의 project 들을 배열로 담는다.
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    //dataset이 false 또는 undefined면 parentNode의 dataset.filter 값을 사용하겠다는 뜻
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

//***Remove selection from the previous item and select the new one***
//=======================================================
const active = document.querySelector('.category__btn.selected');
active.classList.remove('selected');
//target 즉, 클릭한 것의 nodeName이 button tag이면 e.target(=.category__btn)를 그대로 사용하고
//아니라면 e.target의 parentNode(span의 parentNode니깐 결국 category__btn)를 지정한다.
const target = 
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
target.classList.add('selected');

    //Project Animation
    projectContainer.classList.add('anim-out');

    //방법2
    // console.log(`--------------------`);
    // for(let project of projects){
    //     console.log(`for(let project of projects) >> ` + project);
    // }

    //방법3
    // console.log(`--------------------`);
    // let project;
    // for(let i=0; i < projects.length; i++){
    //     project = projects[i];
    //     console.log(`for(let i=0; i < projects.length; i++) >> ` + project);
    // }
    
    //category-btn를 누른 후 works__projects에 .anim-out이 계속 있어서
    //project가 .anim-out의 opacity: 0; 를 계속 가지고 있음
    //1. projectContainer.classList.add('anim-out'); 가 추가된 후
    //2. setTimeout() 함수를 호출하고, 안에 projects.forEach() 함수가 실행 된 후
    //3. setTimeout()함수를 통해서 0.3초가 흐른 후 .anim-out 클래스를 제거함.
    setTimeout(() =>{
        //forEach == projects를 한번씩 쓰겠다. (== for문)
        //방법1
        projects.forEach((project) => {
            console.log(project.dataset.type);
            //fiter가 전부 다 거나, filter가 클릭한 project의 data-filter 값과 동일하다면
            if(filter === '*' || filter === project.dataset.type){
                //invisible를 지워서 보여주도록
                project.classList.remove('invisible');
            }else{
                //invisible를 추가해서 안보여지도록
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
});



//scrollIntoView()를 구현해서 해당 아이디값이 들어오면 함수아래 기능이 작동한다.
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}