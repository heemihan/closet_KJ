// 1. 옷장 높이 조절 및 범위 제한 (가이드 코드)
const closet = document.getElementById('closet');
const handle = document.getElementById('drag-handle');
let isResizing = false;

handle.addEventListener('mousedown', (e) => {
    isResizing = true;
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    // 현재 마우스 위치에 따른 높이 계산
    let newHeight = window.innerHeight - e.clientY;
    
    // 범위 제한 로직 (상단 100px 침범 금지 & 최소 높이 150px)
    const maxHeight = window.innerHeight - 120; // 상단 UI(100px) + 여유(20px)
    const minHeight = 150;

    if (newHeight > maxHeight) newHeight = maxHeight;
    if (newHeight < minHeight) newHeight = minHeight;

    closet.style.height = `${newHeight}px`;
});

document.addEventListener('mouseup', () => {
    isResizing = false;
});

// 2. 배경 변경 로직 (순서도 반영)
let bgIndex = 1;
const backgrounds = ['#f0f0f0', '#ffebee', '#e3f2fd', '#f1f8e9', '#fff3e0', '#f3e5f5']; 
// 순서도의 1:당직실, 2:중식집... 등을 색상이나 이미지 경로로 대체 가능

function changeBackground() {
    bgIndex++;
    if (bgIndex > 6) bgIndex = 1; // n이 6을 넘으면 리셋
    
    const scene = document.getElementById('game-scene');
    scene.style.backgroundColor = backgrounds[bgIndex - 1];
    console.log(`현재 배경: ${bgIndex}번 출력`);
}

// 3. 옷 입히기 드래그 앤 드롭 기초
const clothes = document.querySelectorAll('.clothing-item');
clothes.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

const characters = document.querySelectorAll('.character');
characters.forEach(char => {
    char.addEventListener('dragover', (e) => e.preventDefault());
    char.addEventListener('drop', (e) => {
        e.preventDefault();
        const clothId = e.dataTransfer.getData('text/plain');
        const cloth = document.getElementById(clothId);
        
        // 순서도의 중심좌표 일치 로직 (기초 구현)
        cloth.style.position = 'absolute';
        cloth.style.top = '0';
        cloth.style.left = '0';
        char.appendChild(cloth);
        
        alert(`${char.id}에게 ${clothId}를 입혔습니다!`);
    });
});
