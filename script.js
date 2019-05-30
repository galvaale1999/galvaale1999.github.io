let imagePairSets = [];
const isMobile = window.innerWidth < 1024;
let setsShown = 0;
const portfolio = document.getElementById('portfolioContainer');
const twitterUsername = 'kaitlin_kahler';


function dataHandler(data) {

    let imagePairs = [];
    for (let item of data) {
        if ("images" in item && !!item.images && "tweet" in item && !!item.tweet) {
            item.images.forEach(imageURL => imagePairs.push([imageURL, item.tweet]));
        }
    }


    let x = [];
    for (let pair of imagePairs) {
        x.push(pair);
        if (x.length === 3) {
            const y = [...x];
            x = [];
            imagePairSets.push(y);
        }
    }

    initialImageConstructor()
}

function initialImageConstructor() {
    //show initial rows
    for(let imagePair in imagePairSets){
        renderRow(setsShown);
        //if mobile, render 1 (3 pics), on desktop 2 (6 pics)
        if(isMobile && setsShown === 1){
            break;
        } else {
            if(setsShown === 2){
                break;
            }
        }
    }

    //load more button
    let button = document.getElementById('loadMoreButton');
    button.addEventListener('click', loadMorePics);

}

function loadMorePics() {
    if(setsShown < imagePairSets.length) {
        renderRow(setsShown);
    } else {
        const buttonContainer = document.getElementById('buttonContainer');
        buttonContainer.innerHTML = '';
        const newButton = document.createElement('a');
        newButton.setAttribute('href', `https://twitter.com/${twitterUsername}`)
        newButton.classList.add('button','is-white','is-medium');
        newButton.id = 'twitterButton';
        newButton.innerHTML = 'See More on Twitter';
        buttonContainer.appendChild(newButton);
    }
}

function replaceButtonForTwitter() {

}

function renderRow(setIndex) {
    const set = imagePairSets[setIndex];
    //create columns container for set of 3
    const columns = document.createElement('div');
    columns.classList.add('columns');
    for (let [image, tweet] of set) {
        //create column
        const column = document.createElement('div');
        column.classList.add('column');
        //create image & set attributes
        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.setAttribute('alt', 'portfolio image');
        //create aspect box
        const box = document.createElement('div');
        box.classList.add('squareBox');
        //create caption box
        const caption = document.createElement('div');
        caption.classList.add('imageCaption');
        caption.innerHTML = tweet;
        //append
        box.appendChild(img);
        box.appendChild(caption);
        column.appendChild(box);
        columns.appendChild(column);
    }
    portfolio.appendChild(columns);
    setsShown++;
}

const configList = {
    "profile": { "screenName": twitterUsername },
    "enableLinks": false,
    "showUser": false,
    "showTime": false,
    "showRetweet": false,
    "showInteraction": false,
    "showPermalinks": false,
    "showImages": true,
    "dataOnly": true,
    "customCallback": dataHandler,
    "lang": 'en'
};
let x = twitterFetcher.fetch(configList);

document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.navbar-burger');
    const menu = document.getElementById('navMenu');


    [burger, menu].forEach(element => element.addEventListener('click', () => {
        if (burger.classList.contains('is-active')) {
            burger.classList.remove('is-active');
        } else {
            burger.classList.add('is-active');
        }
        if (menu.classList.contains('is-active')) {
            menu.classList.remove('is-active');
        } else {
            menu.classList.add('is-active');
        }
    }));

    let navLinks = document.querySelectorAll('.navbar-item');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        link.addEventListener('click', (event) => {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        })
    })
});
