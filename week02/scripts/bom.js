// Get DOM elements
const input = document.querySelector('#favchap');
const addButton = document.querySelector('#addChapter');
const list = document.querySelector('#list');

// Add chapter function
function addChapter() {
    // Check if input is empty
    if (input.value === '') {
        alert('Please enter a chapter');
        return;
    }

    // Create list item and its elements
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    // Set up list item
    li.textContent = input.value;

    // Set up delete button
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        input.focus();
    });

    // Add delete button to list item
    li.appendChild(deleteButton);

    // Add list item to list
    list.appendChild(li);

    // Clear input and focus
    input.value = '';
    input.focus();
}

// Event Listeners
addButton.addEventListener('click', addChapter);
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addChapter();
    }
});