const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#plot-name').value.trim();
    const description = document.querySelector('#plot-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/plots`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create plot');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/plots/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete plot');
        }
    }
};

document
    .querySelector('.new-plot-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
