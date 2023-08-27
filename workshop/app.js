// operand operator

// + - x 

const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); //array
const clearBtn = document.getElementById('clear-btn');

// ตัวเลข 1 : ตัวดำเนินการ : ตัวเลข 21/

let firstValue = 0; // ตัวเลขที่ 1
let operatorValue = ''; // ตัวดำเนินการ
let waitForNext = false; // เก็บสถานะ ของตัวเลขและตัวดำเนินการ

// กรองข้อมูล
function setNumberValue(number){
    if(waitForNext){
        calculatorDisplay.textContent=number;
        waitForNext=false;
    }else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
    }
}
function calloperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);

    if(!firstValue){
        firstValue = currentValue; // ค่าเริ่มต้น
    }else{
        console.log(firstValue);
        console.log(operatorValue);
    }
    waitForNext = true
    operatorValue = operator;
    

}
function addDecimal(){
    // กรองจุดทศนิยม
    if(waitForNext) return ;
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
    
    
    
    
}
inputBtn.forEach((input)=>{
    // ปุ่มตัวเลข
    if(input.classList.length === 0){
        input.addEventListener('click',()=>setNumberValue(input.value));
    }else if(input.classList.contains("operator")){
        input.addEventListener('click',()=>calloperator(input.value));
    }else if(input.classList.contains("decimal")){
        input.addEventListener('click',()=>addDecimal())
    }
})
function resetAll(){
    firstValue=0;
    operatorValue='';
    waitForNext=false;
    calculatorDisplay.textContent='0';
}
clearBtn.addEventListener('click',()=>resetAll());
