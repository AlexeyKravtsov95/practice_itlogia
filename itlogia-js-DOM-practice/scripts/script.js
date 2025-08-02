document.getElementsByTagName('h1')[0].innerText = "Самая крутая пицца ждет <span>только в нашем ресторане</span>";
document.getElementById('pizza').style.color = '#000000';

let buttonElements = document.querySelectorAll('.btn');
// for (let i = 0; i < buttonElements.length; i++) {
//     if (buttonElements[i].id === 'no-touch') {
//         continue;
//     }
//     buttonElements[i].style.backgroundColor = 'transparent';
//     buttonElements[i].style.border = '1px solid rgb(255, 175, 24)';
//     buttonElements[i].style.color = 'rgb(255, 175, 24)';
// }

buttonElements.forEach(button => {
    if (button.id === 'no-touch') {
        return;
    }
    button.style.backgroundColor = 'transparent';
    button.style.border = '1px solid rgb(255, 175, 24)';
    button.style.color = 'rgb(255, 175, 24)';
})

document.getElementById('name-input').value = "asfa";
document.querySelector('.rights span').innerText = (new Date()).getFullYear();

let products = document.getElementsByClassName('product');
for (let i = 0; i < products.length; i++) {
    if(i % 2 === 1) {
        products[i].children[1].innerText += '*';
    }
}