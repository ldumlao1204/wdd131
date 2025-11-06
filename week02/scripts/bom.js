// declare three (3) variables that hold references to the input, button, and list elements.
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function () {
    // Code to execute when the button is clicked

    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');


        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', 'Remove chapter');


        li.append(deleteButton);

        deleteButton.addEventListener('click', function () {

            list.removeChild(li);
            input.focus();

        });


        list.append(li);

        input.value = '';

    }

    input.focus();
});



<button aria-label="Close" id="close-button">❌</button>


