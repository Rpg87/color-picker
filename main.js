const btn = document.querySelector('button');
const txt = document.getElementById('color');
const copyTxt = document.querySelector('.copyTxt');

const messageModal = document.getElementById('messageModal');
const messageText = document.getElementById('messageText');

const heart = document.querySelector('.heart');
const counter = document.querySelector('.counter');
const list = document.querySelector('.list');


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

const userCopyTxt = (txt) => {
    navigator.clipboard.writeText(txt)
        .then(() => showMsg('Copiado '))
        .catch(error => showMsg('Error al copiar el texto: ' + error));
    console.log('copy');
}


const showMsg = (msg) => {
    messageText.textContent = msg;
    messageModal.style.display = 'block';

    setTimeout(() => {
        messageModal.style.display = 'none';
    }, 2000);

};

const addFavorite = () => {
    let favorite = copyTxt.textContent;

    if (!isFavoriteInList(favorite)) {
        // Crear un nuevo elemento div con el contenido del favorito
        const listItem = document.createElement('ul');

        listItem.textContent = favorite;

        // Agregar el nuevo elemento a la lista
        list.appendChild(listItem);

        // Cambiar el color del corazón
        heart.style.color = 'red';

        console.log(favorite);
    }

}

const isFavoriteInList = (favorite) => {
    const existingItems = list.querySelectorAll('div');
    for (const item of existingItems) {
        if (item.textContent === favorite) {
            return true;
        }
    }
    return false;
};



btn.addEventListener('click', changeColor)

copyTxt.addEventListener('click', function () {
    userCopyTxt(copyTxt.innerText);

})

heart.addEventListener('click', addFavorite)
