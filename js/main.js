/* 자바스크립트 엄격한 버전
실수로 발생할 수 있는 오류가 통과하지 못하도록 엄격하게 한다. */
'use strict'

// Make navbar transparent when it is on the top
//navbar의 Element요소를 navbar에 대입한다.
const navbar = document.querySelector('#navbar');
//.getBoundingClientRect()함수를 이용해 navbar Element의 height를 navbarHeight에 대입한다.
const navbarHeight = navbar.getBoundingClientRect().height;

/* 스크롤이 될때마다 함수를 호출한다.
해당 함수는 아무런 인자를 받지 않고 함수를 실행 */
document.addEventListener('scroll', () => {
    console.log("Math.round(window.scrollY >> " + Math.round(window.scrollY));
    console.log(`navbarHeight >>  ${navbarHeight}`);

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

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {

    //변수 선언
    const target = event.target;
    const link = target.dataset.link;
    //link가 null이거나 undifeined이면 실행x
    if(link == null){
        return;
    }

    //html에 저정한 변수의 데이터가 dataset 안에 할당됨
    // 속성을 넣어서 각각의 id를 연결시킴
    console.log(event.target.dataset.link);
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior: "smooth"});
});