const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        const nowOpen = !navigation.classList.contains('open');
        navigation.classList.toggle('open', nowOpen);
        hamButton.classList.toggle('open', nowOpen);
        hamButton.setAttribute('aria-expanded', String(nowOpen));
    });
}
