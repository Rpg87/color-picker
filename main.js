const btn = document.querySelector('button');
const txt = document.getElementById('color');
const copyTxt = document.querySelector('.copyTxt');

const messageModal = document.getElementById('messageModal');
const messageText = document.getElementById('messageText');

const heart = document.querySelector('.heart');
const counter = document.querySelector('.counter');
const list = document.querySelector('.list');
const listContainer = document.getElementById('listContainer');


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
    const currentColor = txt.textContent.trim();
    const isColorInList = isFavoriteInList(currentColor);

    if (isColorInList) {
        heart.classList.add('selected');
    } else {
        heart.classList.remove('selected');
    }
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
    let favorite = copyTxt.textContent.trim();

    const isAlreadyInList = isFavoriteInList(favorite);

    if (isAlreadyInList) {
        removeFromFavorites(findFavoriteByText(favorite));


    } else {
        const listItem = document.createElement('div');
        listItem.textContent = favorite;
        list.appendChild(listItem);

    }
    const isColorInList = isFavoriteInList(txt.textContent.trim());
    heart.classList.toggle('selected', isColorInList);
};

const removeFromFavorites = (item) => {
    if (item && item.parentNode === listContainer) {

        if (heart.classList.contains('selected')) {
            const color = item.textContent;
            listContainer.removeChild(item);


            if (!listContainer.querySelector('div')) {
                heart.classList.remove('selected');
            }


            document.body.style.backgroundColor = txt.textContent;

            showMsg(`Eliminado: ${color}`);
        }
    }
};


const findFavoriteByText = (text) => {
    const existingItems = list.querySelectorAll('div');
    for (const item of existingItems) {
        if (item.textContent.trim() === text) {
            return item;
        }
    }
    return null;
};



const isFavoriteInList = (favorite) => {
    const existingItems = list.querySelectorAll('div');
    for (const item of existingItems) {
        if (item.textContent === favorite) {
            return true;
        }
    }
    return false;
};


list.addEventListener('click', (event) => {
    const clickedItem = event.target;
    if (clickedItem.tagName === 'DIV') {

        txt.textContent = clickedItem.textContent;
        document.body.style.backgroundColor = txt.textContent;
        console.log(txt.textContent)

    }
});

listContainer.addEventListener('click', (event) => {
    const clickedItem = event.target;
    if (clickedItem.tagName === 'DIV') {

        txt.textContent = clickedItem.textContent;


        const isColorInList = isFavoriteInList(txt.textContent.trim());
        heart.classList.toggle('selected', isColorInList);
    }

});



btn.addEventListener('click', changeColor)

copyTxt.addEventListener('click', function () {
    userCopyTxt(copyTxt.innerText);

})

heart.addEventListener('click', addFavorite);

listContainer.addEventListener('click', (e) => {
    const clickedItem = e.target;
    if (clickedItem.tagname === 'div') {
        txt.textContent = clickedItem.textContent;
        heart.classList.remove('selected');
    }
})