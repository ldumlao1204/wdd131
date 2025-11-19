const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');


menuButton.addEventListener('click', () => {

    menuButton.classList.toggle('open');
    navigation.classList.toggle('open');


    const isExpanded = navigation.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
});


window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        menuButton.classList.remove('open');
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});