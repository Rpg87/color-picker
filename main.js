const btn = document.querySelector('button');
const txt = document.getElementById('color');


const generateRandomHex = () => {
    let digits = '0123456789ABCDEF'; /* all options for hexadecimal numbers*/
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 16); /*math.random gives us random numbers between 0 and 1. We multiply that result by 16 (our choices in let digits)*/
        hexColor += digits[randomNumber];
    }
    return hexColor

};

const changeColor = () => {
    let changeColors = generateRandomHex();
    document.body.style.backgroundColor = changeColors;
    txt.textContent = changeColors;


}

btn.addEventListener('click', changeColor)

