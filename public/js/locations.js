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
    event.preventDefault();

    const name = document.querySelector('#location-name').value.trim();
    const description = document.querySelector('#location-desc').value.trim();
    const submittedImage = document.querySelector('#location-image').value;

    // Cloudinary
    await cloudinary.uploader.upload(submittedImage, { public_id: name });
    const image = cloudinary.url(name, {
        width: 100,
        height: 150,
        Crop: 'fill'
    });

    if (name && description && image) {
        const response = await fetch(`/api/locations`, {
            method: 'POST',
            body: JSON.stringify({ name, description, image }),
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

// const updateFormHandler = async (event) => {
//     event.preventDefault();

//     const name = document.querySelector('#name').value.trim();
//     const description = document.querySelector('#description').value.trim();
//     const biome = document.querySelector('#biome').value.trim();
//     const placesOfInterest = document.querySelector('#places-of-interest').value.trim();
//     const history = document.querySelector('#history').value.trim();
//     const image = document.querySelector('#customFile').value.trim();


//     if (name && description && biome && placesOfInterest && history && image) {
//         const response = await fetch(`/api/plots/${id}`, {
//             method: 'PUT',
//             body: JSON.stringify({ name, description, biome, placesOfInterest, history, image }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             document.location.replace('/locations');
//         } else {
//             alert('Failed to update location');
//         }
//     }
// };

// document
//     .querySelector('.new-location-form')
//     .addEventListener('submit', newFormHandler);

document
    .querySelector('.location-delete')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.update-location')
    .addEventListener('click', updateFormHandler);
