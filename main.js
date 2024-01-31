const btn = document.querySelector('button');
const txt = document.getElementById('color');
const messageModal = document.getElementById('messageModal');
const messageText = document.getElementById('messageText');
const heart = document.querySelector('.heart');
const listContainer = document.getElementById('listContainer');
const trash = document.querySelector('.trash');



const generateRandomHex = () => {
    let digits = '0123456789ABCDEF'; /* all options for hexadecimal numbers*/
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 16); /*math.random gives us random numbers between 0 and 1. 
        We multiply that result by 16 and append the random digit to the hexColor*/
        hexColor += digits[randomNumber];
    }
    return hexColor
};

const changeColor = () => {
    let changeColors = generateRandomHex();
    document.body.style.backgroundColor = changeColors;
    txt.textContent = changeColors;
    const isColorInList = isFavoriteInList(txt.textContent.trim());
    heart.classList.toggle('selected', isColorInList);
    //Determines if the heart should be red based on the added color in favorites
    heart.classList.toggle('fa-beat', isColorInList);
    //adds an animation depending on whether it is in the favorites list or not
}

// copy color number to clipboard
const userCopyTxt = (txt) => {
    navigator.clipboard.writeText(txt)
        .then(() => showMsg('Copied '))
        .catch(error => showMsg('Error copying text: ' + error));
}

// show a message when the user copy color number in his clipboard
const showMsg = (msg) => {
    messageText.textContent = msg;
    messageModal.style.display = 'block';

    setTimeout(() => {
        messageModal.style.display = 'none';
    }, 2000);

};

// Function to add or remove a color from the favorites list
const addFavorite = () => {
    let favorite = txt.textContent.trim();
    const isAlreadyInList = isFavoriteInList(favorite); //check if it is included in the favorites list 

    if (isAlreadyInList) {
        removeFromFavorites(findFavoriteByText(favorite)); //if true delete it from the list 
    } else {
        const listItem = document.createElement('div'); //if it is false, create it
        listItem.textContent = favorite;
        listContainer.appendChild(listItem);
        listItem.style.backgroundColor = txt.textContent;
    }

    //add info to localstorage
    const favoritesArray = Array.from(listContainer.querySelectorAll('div')).map(item => item.textContent);
    localStorage.setItem('favs', JSON.stringify(favoritesArray));


    const isColorInList = isFavoriteInList(txt.textContent.trim());
    heart.classList.toggle('selected', isColorInList);
    heart.classList.toggle('fa-beat', isColorInList);

};

// Function to check if a color is in the favorites list
const isFavoriteInList = (favorite) => {
    const existingItems = listContainer.querySelectorAll('div');
    for (const item of existingItems) {
        if (item.textContent === favorite) {
            return true;
        }
    }
    return false;
};

// Function to remove a color from the favorites list
const removeFromFavorites = (item) => {
    if (item && item.parentNode === listContainer) {

        if (heart.classList.contains('selected')) {
            const color = item.textContent;
            listContainer.removeChild(item);
            showMsg(`Deleted: ${color}`);

        }

    }
};

// Function to find a favorite color in the list by text
const findFavoriteByText = (text) => {
    const existingItems = listContainer.querySelectorAll('div');
    for (const item of existingItems) {
        if (item.textContent.trim() === text) {
            return item;
        }
    }
    return null;
};


// Event listener for clicking on the list container
listContainer.addEventListener('click', (event) => {
    const clickedItem = event.target;
    if (clickedItem.tagName === 'DIV') {

        txt.textContent = clickedItem.textContent;
        document.body.style.backgroundColor = txt.textContent;


        const isColorInList = isFavoriteInList(txt.textContent.trim());
        heart.classList.toggle('selected', isColorInList);
        heart.classList.toggle('fa-beat', isColorInList);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favs')) || [];
    if (storedFavorites.length > 0) {
        storedFavorites.forEach(favorite => {
            const listItem = document.createElement('div');
            listItem.textContent = favorite;
            listContainer.appendChild(listItem);
            listItem.style.backgroundColor = favorite;
        });
    }
});

// Event listener for clicking on the button to change color
btn.addEventListener('click', changeColor);

// Event listener for clicking on the color text to copy to clipboard
txt.addEventListener('click', function () {
    userCopyTxt(txt.innerText);

});

// Event listener for clicking on the heart icon to add/remove from favorites
heart.addEventListener('click', addFavorite);

// Event listener for clicking on the trash icon to clear the favorites list and localStorage
trash.addEventListener('click', function () {
    listContainer.innerHTML = '';
    heart.classList.remove('selected')
    heart.classList.remove('fa-beat');
    localStorage.removeItem("favs");
});


