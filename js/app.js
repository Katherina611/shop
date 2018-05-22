//class
class Shop {
    saveChoco(chocolate){
        let chocolates = this.getFromShop();
        chocolates.push(chocolate);
        localStorage.setItem('chocolates', JSON.stringify(chocolates));
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
}

//const
const menuIcon = document.querySelector('.shop-menu li img');
const menu = document.querySelectorAll('.shop-menu li a');
const socialIcon = document.querySelectorAll('.social img');
const basketBtn = document.querySelectorAll('.praline button');
const shop = new Shop();


//event listeners
menuIcon.addEventListener('click', showMenu);
basketBtn.forEach(choco =>{
    choco.addEventListener('click', resultShop);
});


//functions
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




