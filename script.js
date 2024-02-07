 // const targetDate = new Date('2024-02-16T20:00:00').getTime();
 const targetDate = new Date('2024-02-16T20:30:00').getTime();

 function calculateTimeLeft(targetDate) {
     const now = new Date().getTime(); // 현재 시간을 milliseconds로 가져옴
     const targetTime = new Date(targetDate).getTime(); // 목표 시간을 milliseconds로 가져옴
     const cube = document.querySelector('.cube');

     let timeDifference = targetTime - now; // 목표 시간과 현재 시간의 차이를 계산

     if (timeDifference <= 0 || cube.classList.contains('key') ) {
         const noteEl = document.querySelector('#note')
         noteEl.innerHTML = '상자를 터치해서 열어보세요'
         noteEl.classList.add('active')
         return '00:00:00'; // 목표 시간이 이미 지났을 경우
     }

     let hours = Math.floor(timeDifference / (1000 * 60 * 60));
     let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
     let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

     // 시, 분, 초를 두 자리수로 표현하기 위해 10 미만의 경우 앞에 0을 붙임
     hours = hours < 10 ? '0' + hours : hours;
     minutes = minutes < 10 ? '0' + minutes : minutes;
     seconds = seconds < 10 ? '0' + seconds : seconds;

     return hours + ':' + minutes + ':' + seconds;
 }

 function setTimeLeft() {
     const leftTime = calculateTimeLeft(targetDate);
     const nowEl = document.querySelector('#now')

     nowEl.innerHTML = leftTime

 }

 setInterval(setTimeLeft, 1000)

 document.addEventListener('DOMContentLoaded', function () {
     const cube = document.querySelector('.cube');
     const faces = document.querySelectorAll('.face');
     const sphere = document.querySelector('.sphere');


     cube.addEventListener('touchstart', function () {
         const nowEl = document.querySelector('#now')
         if (nowEl.innerHTML === '00:00:00' || cube.classList.contains('key')) {
             cube.style.animation = 'none';

             faces.forEach((face) => {
                 face.style.transform = 'scale(-15)'
                 face.style.opacity = '0'
             })

             cube.style.transform = 'rotateX(0deg) rotateY(0deg)'
             sphere.classList.add('active')

             const textContainer = document.querySelector('.text-container')
             textContainer.style.display = 'none'
             const alert = document.querySelector('.alert')
             alert.style.display = 'flex'
         }
     }, 50);
 });

 const sphere = document.querySelector('.sphere');
 let intervalId;
 let green = 0;
 let blue = 0;

 sphere.addEventListener('touchstart', function () {
     const alert = document.querySelector('.alert')
     alert.style.opacity = '0'
     intervalId = setInterval(function () {
         // RGB 값으로 색상 조절
         sphere.style.backgroundColor = `rgb(0, ${green}, ${blue})`;
         green = Math.min(green + 3, 112); // 5씩 증가시키면서 최대값 255에 도달하도록 함
         blue = Math.min(blue + 2, 74); // 5씩 증가시키면서 최대값 255에 도달하도록 함
         if (green === 112 && blue === 74) {
             const alert = document.querySelector('.alert')
             alert.style.opacity = '1'
             alert.innerHTML = '이제 손을 놓아주세요 !'
             setInterval(() => {
                 const alert = document.querySelector('.alert')
                 alert.style.opacity = '0'
                 setInterval(() => {
                     const alert = document.querySelector('.alert')
                     alert.style.display = 'none'
                 }, 1000)
             }, 1000)
         }
     }, 100); // 0.1초마다 색상을 변경
 });

 sphere.addEventListener('touchend', function () {
     clearInterval(intervalId); // 인터벌 제거
     if (green !== 112 && blue !== 74) {
         sphere.style.backgroundColor = 'white'; // 클릭을 해제할 때만 색을 다시 흰색으로 변경
     } else {
         sphere.classList.add('max')
         setTimeout(() => {
             const letterContainer = document.querySelector('.letter-container');
             letterContainer.classList.add('active')

         })
     }
 });

 const button = document.querySelector('button')
 button.addEventListener('touchstart',()=>{
    const input = document.querySelector('input')
    if(input.value==='ireallylovechan'){
        const cube = document.querySelector('.cube');
        cube.classList.add('key')
        const passwd = document.querySelector('.passwd')
        passwd.style.display = 'none'
    }
    else{
        alert("찍지마..")
    }
 })

 const noteEl = document.querySelector('#note')
 noteEl.addEventListener('touchstart',()=>{
    if(noteEl.innerHTML==='시간이 되기 전에 민주님 만났다면 터치'){
        alert('남자친구한테 암호 물어보세요 !')
        const passwd = document.querySelector('.passwd')
        passwd.style.display = 'flex'
        
    }
 })

// 터치를 막을 요소를 가져오기
const body = document.querySelector('body');
const note = document.getElementById('note');
const cubeContainer = document.querySelector('.cube-container');
const passwdContainer = document.querySelector('.passwd');


// 터치 이벤트를 감지하여 기본 동작 막기
body.addEventListener('touchstart', function(event) {
    if (event.target !== note && !note.contains(event.target) &&
        event.target !== cubeContainer && !cubeContainer.contains(event.target) &&
        event.target !== passwdContainer && !passwdContainer.contains(event.target) &&
        event.target !== sphere) {
        event.preventDefault();
    }
});

body.addEventListener('touchmove', function(event) {
    if (event.target !== note && !note.contains(event.target) &&
        event.target !== cubeContainer && !cubeContainer.contains(event.target) &&
        event.target !== passwdContainer && !passwdContainer.contains(event.target) &&
        event.target !== sphere) {
        event.preventDefault();
    }
});

body.addEventListener('touchend', function(event) {
    if (event.target !== note && !note.contains(event.target) &&
        event.target !== cubeContainer && !cubeContainer.contains(event.target) &&
        event.target !== passwdContainer && !passwdContainer.contains(event.target) &&
        event.target !== sphere) {
        event.preventDefault();
    }
});

function disableZoom() {
    document.addEventListener('touchmove', preventZoom, { passive: false });
}

// 확대 이벤트를 막는 함수
function preventZoom(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}

// 모바일 환경에서의 확대 막기 함수 호출
disableZoom();

document.querySelectorAll('*').forEach(function(element) {
    element.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
});