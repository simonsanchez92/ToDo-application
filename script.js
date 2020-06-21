let mainInput = document.querySelector('#main-input');
let submitBtn = document.querySelector('#submit-btn');
let searchForm = document.querySelector('#search-form');
let list = document.querySelector('#list');



function randomId() { return Math.floor(Math.random() * 1000) };


let items = [];

// create
function addItem(item) {
    const newItem = {
        id: randomId(),
        text: item.charAt(0).toUpperCase() + item.slice(1)
    }

    items.unshift(newItem);
    mainInput.value = '';
    showItems();
}



//Read
function showItems() {
    list.innerHTML = '';
    if (items.length > 0) {
        items.forEach((item, i) => {
            list.appendChild(generateItem(item, items[i].id));
        });
    } else {
        return;
    }

}

showItems();




//Track for submission
let formStatus = 'add';

function generateItem(item, id) {
    const div = document.createElement('div');
    div.setAttribute('class',
        'list-element');
    div.setAttribute('data-num', id);


    const span = document.createElement('span');
    span.setAttribute('class', 'text');
    span.innerHTML = `<i class="fas fa-caret-right"></i> ${item.text}`;

    const div2 = document.createElement('div');
    div2.classList.add('item-btns')
    div2.innerHTML = `
    
    <button class='edit-btn' onclick=editItem(this)>Edit <i class="fas fa-pencil-alt"></i></button>
    <button class='delete-btn' onclick=eraseItem(this)><i class="fas fa-trash-alt"></i></button>
    `

    div.appendChild(span);
    div.appendChild(div2);

    return div;
}


//Update from when 'edit' is clicked

let tempItem;
function editItem(element) {
    console.log(element.parentNode.parentNode);

    const item = element.parentNode.parentNode;

    const id = element.parentNode.parentNode.dataset.num;
    const text = item.firstChild.innerText;

    mainInput.value = text;
    formStatus = 'update';
    submitBtn.innerHTML = `<i class="fas fa-pencil-alt"></i>`;

    tempItem = {
        id: id,
        text: text
    }

    mainInput.focus();

}



//Update Item
function updateItem(item) {

    items.forEach(itemObj => {
        if (Number(itemObj.id) === Number(item.id)) {
            itemObj.text = item.text;
        }
    });
    //Reset form
    mainInput.value = '';
    submitBtn.innerHTML = `<i class="fas fa-plus"></i>`;
    formStatus = 'add';
    showItems();
}

//Erase item

function eraseItem(element) {


    let itemDiv = element.parentNode.parentNode;
    itemDiv.classList.add('erase');

    let itemId = itemDiv.dataset.num;

    setTimeout(() => {
        items = items.filter(itemObj => Number(itemObj.id) !== Number(itemId));
        showItems();
    }, 200);
}


function introAdd(e) {
    if (e.keyCode === 13 && mainInput.value !== '') {
        addItem();
    }
}


searchForm.addEventListener('submit', (e) => {

    e.preventDefault();
    if (formStatus === 'add' && mainInput.value !== '') {
        addItem(mainInput.value);
    }
    if (formStatus === 'update' && mainInput.value !== '') {
        updateItem({ id: tempItem.id, text: mainInput.value });

    }

});
mainInput.addEventListener('keyup', introAdd);

