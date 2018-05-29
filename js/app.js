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
                <td><select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select></td>
                <td><button class="btn-remove" data-name="${choco.name}">Remove</button></td>
            `;
            basket.appendChild(tr);
        });
    }
    displayPrice(chocolate){
        const chocolates = this.getFromShop();
        const price = document.querySelector('.choco-basket div p');
        let sumPrice = 0;
        chocolates.forEach(choco =>{
            sumPrice +=  parseFloat(choco.price);
            price.textContent = `Do zapłaty: ${sumPrice} zł`;
        })
    }
}

//const
const menuIcon = document.querySelector('.shop-menu li img');
const menu = document.querySelectorAll('.shop-menu li a');
const socialIcon = document.querySelectorAll('.social img');
const basketBtn = document.querySelectorAll('.praline button');
const shop = new Shop();

//event listeners
document.addEventListener('DOMContentLoaded', documentReady);
menuIcon.addEventListener('click', showMenu);
basketBtn.forEach(choco =>{
    choco.addEventListener('click', resultShop);
});


//functions
function documentReady(){
    const favoritesChoco = document.querySelector('.box-basket');
    if(favoritesChoco) {
        let chocolates = shop.getFromShop();
        shop.displayBasket(chocolates);
        shop.displayPrice(chocolates);

        favoritesChoco.addEventListener('click', event =>{
            if(event.target.classList.contains('btn-remove')){
                shop.removeFromShop(event.target.dataset.name);
                event.target.parentElement.parentElement.remove();
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




