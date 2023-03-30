const newFormHandler = async (event) => {
    const name = document.querySelector('#name-create').value.trim();
    const description = document.querySelector('#description-create').value.trim();
    const location = document.querySelector('#location-create').value.trim();
    const characters = document.querySelector('#characters-create').value.trim();
    const conflict = document.querySelector('#conflict-create').value.trim();
    const payoff = document.querySelector('#payoff-create').value.trim();
    const image = document.querySelector('#customFile-create').value.trim();

    const response = await fetch(`/api/plots`, {
        method: 'POST',
        body: JSON.stringify({ name, description, location, characters, conflict, payoff, image }),
        // image: JSON.stringify({ image }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create plot');
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

const updateFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const name = document.querySelector('#name').value.trim();
        const description = document.querySelector('#description').value.trim();
        const location = document.querySelector('#location').value.trim();
        const characters = document.querySelector('#characters').value.trim();
        const conflict = document.querySelector('#conflict').value.trim();
        const payoff = document.querySelector('#payoff').value.trim();
        const image = document.querySelector('#customFile').value.trim();

        const response = await fetch(`/api/plots/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, description, location, characters, conflict, payoff, image }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update plot');
        }
    }
};

document
    .querySelector('.new-plot')
    .addEventListener('click', newFormHandler);

document
    .querySelector('.plot-delete')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.update-plot')
    .addEventListener('click', updateFormHandler);