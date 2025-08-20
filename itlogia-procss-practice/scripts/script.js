document.getElementById('burger').onclick = () => {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
});

document.getElementById('theme').onclick = function() {
   if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
   } else {
        document.body.classList.add('dark-mode')
   }
}