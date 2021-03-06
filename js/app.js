//class
class Shop {
    saveChoco(chocolate){
        let chocolates = this.getFromShop();
        chocolates.push(chocolate);
        localStorage.setItem('chocolates', JSON.stringify(chocolates));
    }
    removeFromShop(chocolate){
        const chocolates = this.getFromShop();
        chocolates.forEach((choco, index) =>{
            if(chocolate === choco.name){
                chocolates.splice(index,1);
            }
        });
        localStorage.setItem('chocolates',JSON.stringify(chocolates));
    }
    getFromShop(){
        let chocolates;
        if(localStorage.getItem('chocolates') === null){
            chocolates = [];
        }else{
            chocolates = JSON.parse(localStorage.getItem('chocolates'));
        }
        return chocolates;
    }
    displayBasket(chocolates) {
        const basket = document.querySelector('.choco-basket tbody');
        chocolates.forEach(choco => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src='${choco.image}'></td>
                <td><p>${choco.name}</p></td>
                <td><p>${choco.price}</p></td>
                <!--<td><select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select></td>-->
                <td><button class="btn-remove" data-name="${choco.name}">Remove</button></td>
            `;
            basket.appendChild(tr);
        });
    }
    displayPrice(chocolate){
        const chocolates = this.getFromShop();
        const price = document.querySelector('.choco-basket div .price-box');
        let sumPrice = 0;
        chocolates.forEach(choco =>{
            sumPrice +=  (parseInt(choco.price));
            price.textContent = `Do zapłaty: ${sumPrice},00 zł`;
        });
        if(sumPrice===0){
            price.style.display = 'none'
        }else{
            price.style.display = 'block'
        }
    }
    removePrice(chocolate){
        const price = document.querySelector('.choco-basket div .price-box');
        let sumPrice = parseInt(shop.displayPrice(chocolate))- parseInt(choco.price);
        price.textContent = `Do zapłaty: ${sumPrice} zł`;
    }
}

//const
const menuIcon = document.querySelector('.shop-menu li img');
const menu = document.querySelectorAll('.shop-menu li a');
const socialIcon = document.querySelectorAll('.social img');
const basketBtn = document.querySelectorAll('.praline button');
const shop = new Shop();
const name = document.querySelector('#name');
const sendBtn = document.querySelector('#send');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');


//event listeners
document.addEventListener('DOMContentLoaded', documentReady);
menuIcon.addEventListener('click', showMenu);
basketBtn.forEach(choco =>{
    choco.addEventListener('click', resultShop);
});

//functions
function documentReady(){
    const form = document.querySelector('form');
    if(form){
        sendBtn.disabled = true;
        name.addEventListener('blur', validateField);
        email.addEventListener('blur', validateField);
        subject.addEventListener('blur', validateField);
        message.addEventListener('blur', validateField);
    }
    const favoritesChoco = document.querySelector('.box-basket');
    if(favoritesChoco) {
        let chocolates = shop.getFromShop();
        shop.displayBasket(chocolates);
        shop.displayPrice(chocolates);

        favoritesChoco.addEventListener('click', event =>{
            if(event.target.classList.contains('btn-remove')){
                shop.removeFromShop(event.target.dataset.name);
                event.target.parentElement.parentElement.remove();
                shop.removePrice(event.target)
            }
        })
    }
}


function resultShop(event){
    const cardChoco = event.target.parentElement;
    const chocoInfo = {
        name: cardChoco.querySelector('.pralines-name').textContent,
        price:cardChoco.querySelector('.praline-price').textContent,
        image:cardChoco.querySelector('.praline img').src
    };
    //add into the storage
    shop.saveChoco(chocoInfo);
}

function showMenu(){
    menuIcon.style.display = 'none';
    menu.forEach(li =>{
        li.style.display = 'block'
    });
    socialIcon.forEach(img =>{
        img.style.margin = '0 20px'
    })
}

function validateLength(field){
    if(field.value.length>0){
        field.style.border = '2px solid rgb(79, 76, 69)';
    }else{
        email.style.border = '2px solid darkred'
    }
}

function validateEmail(email){
    let emailText = email.value;
    if(emailText.indexOf('@') !== -1){
        email.style.border = '2px solid rgb(79, 76, 69)'
    }else{
        email.style.border = '2px solid darkred'
    }
}

function validateField() {
    validateLength(this);
    if (this.type === 'email') {
        validateEmail(this)
    }
    if (email.value !== '' && subject.value !== '' && message.value !== '' && name.value !== '') {
        sendBtn.disabled = false;
        sendBtn.addEventListener('click', sendMessage);
    }else{
        sendBtn.disabled = true;
    }
}

function sendMessage(event){
    event.preventDefault();
    let emailForm = email.value;
    let nameForm = name.value;
    let messageForm = message.value;
    let subjectForm = subject.value;
    console.log(nameForm, emailForm, messageForm, subjectForm);
    name.value = 'Name *';
    email.value = 'Email *';
    subject.value = 'Subject *';
    message.value = 'Message *';
    name.style.border = '1px solid rgb(79, 76, 69)';
    email.style.border = '1px solid rgb(79, 76, 69)';
    subject.style.border = '1px solid rgb(79, 76, 69)';
    message.style.border = '1px solid rgb(79, 76, 69)';

}

