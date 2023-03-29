const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#character-name').value.trim();
    const description = document.querySelector('#character-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/characters`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/characters');
        } else {
            alert('Failed to create character');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/characters/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/characters');
        } else {
            alert('Failed to delete character');
        }
    }
};

document
    .querySelector('.new-character-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.')
    .addEventListener('click', delButtonHandler);
