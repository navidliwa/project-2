// Cloudinary
// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
//     secure: true
// });

const newFormHandler = async (event) => {
    const name = document.querySelector('#name-create').value.trim();
    const description = document.querySelector('#description-create').value.trim();
    const biome = document.querySelector('#biome-create').value.trim();
    const placesOfInterest = document.querySelector('#places-of-interest-create').value.trim();
    const history = document.querySelector('#history-create').value.trim();
    const image = document.querySelector('#customFile-create').value.trim();

    //     // Cloudinary
    //     await cloudinary.uploader.upload(submittedImage, { public_id: name });
    //     const image = cloudinary.url(name, {
    //         width: 100,
    //         height: 150,
    //         Crop: 'fill'
    //     });

    const response = await fetch(`/api/locations`, {
        method: 'POST',
        body: JSON.stringify({ name, description, biome, placesOfInterest, history, image }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/locations');
    } else {
        alert('Failed to update plot');
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

const updateFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const name = document.querySelector('#name').value.trim();
        const description = document.querySelector('#description').value.trim();
        const biome = document.querySelector('#biome').value.trim();
        const placesOfInterest = document.querySelector('#places-of-interest').value.trim();
        const history = document.querySelector('#history').value.trim();
        const image = document.querySelector('#customFile').value.trim();

        const response = await fetch(`/api/locations/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, description, biome, placesOfInterest, history, image }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/locations');
        } else {
            alert('Failed to update plot');
        }
    }
};

document
    .querySelector('.new-location')
    .addEventListener('click', newFormHandler);

document
    .querySelector('.location-delete')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.update-location')
    .addEventListener('click', updateFormHandler);
