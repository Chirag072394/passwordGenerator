const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector('[data-passwordDisplay]');
const dataCopyBtn=document.querySelector('[data-copy]');
const dataCopyMsg=document.querySelector('[data-copyMsg]');
const lowercaseCheck=document.querySelector('#lowercase');
const uppercaseCheck=document.querySelector('#uppercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');
const indicator=document.querySelector('[data-indicator]');
const generateBtn=document.querySelector('.generate-btn');
const allCheckBox=document.querySelectorAll('input[type=checkbox]');

let symbols='_+-*/&^%$#@!{}[]|\.:,';
let password='';
let passwordLength=10;
let checkCount=0;

handleSlider();
//inidicator color set to gray
setIndicator("#ccc");

//set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min) + "% 100%");
}
function setIndicator(color){
    indicator.style.backgroundColor =color;
    indicator.style.boxShadow=`0px 0px 20px ${color}`;
}

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return  String.fromCharCode(getRndInteger(97,122));
}

function generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,90));
}

function generateSymbol(){
    const randNum= getRndInteger(0,symbols.length)
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasNumber=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(symbolsCheck.checked)    hasSymbol=true;
    if(numbersCheck.checked)   hasNumber=true;


    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicator("#0f0");     
    } else if(
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength>=6
    )   {
        setIndicator("#ff0");
    }else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        dataCopyMsg.innerText ="copied";

    }
    catch(e){
        dataCopyMsg.innerText="failed";
    }

    //make span visible adding active class
    dataCopyMsg.classList.add("active");
    //remove after 2s ehrn copy done 
    setTimeout(() => {
        dataCopyMsg.classList.remove("active");
    },2000);
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{ 
    if(checkbox.checked)
        checkCount++;
    });

    //special Condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})


inputSlider.addEventListener('input',(e)=>{
passwordLength=e.target.value;
handleSlider();
})

dataCopyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

function shufflePassword(array){
    //fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str='';
    array.forEach((el)=> (str+=el));
    return str;
}

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("Compulsory addition done");

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});