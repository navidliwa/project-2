const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#location-name').value.trim();
    const description = document.querySelector('#location-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/locations`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/locations');
        } else {
            alert('Failed to create post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/locations/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/locations');
        } else {
            alert('Failed to delete location');
        }
    }
};

document
    .querySelector('.new-location-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.')
    .addEventListener('click', delButtonHandler);
