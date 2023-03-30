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
    const location = document.querySelector('#location-create').value.trim();
    const profession = document.querySelector('#profession-create').value.trim();
    const philosophy = document.querySelector('#philosophy-create').value.trim();
    const motivation = document.querySelector('#motivation-create').value.trim();
    const notes = document.querySelector('#notes-create').value.trim();
    const image = document.querySelector('#customFile-create').value.trim();

    // // Cloudinary
    // await cloudinary.uploader.upload(submittedImage, { public_id: name });
    // const image = cloudinary.url(name, {
    //     width: 100,
    //     height: 150,
    //     Crop: 'fill'
    // });

    const response = await fetch(`/api/characters`, {
        method: 'POST',
        body: JSON.stringify({ name, description, location, profession, philosophy, motivation, notes, image }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/characters');
    } else {
        alert('Failed to create character');
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

const updateFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const name = document.querySelector('#name').value.trim();
        const description = document.querySelector('#description').value.trim();
        const location = document.querySelector('#location').value.trim();
        const profession = document.querySelector('#profession').value.trim();
        const philosophy = document.querySelector('#philosophy').value.trim();
        const motivation = document.querySelector('#motivation').value.trim();
        const notes = document.querySelector('#notes').value.trim();
        const image = document.querySelector('#customFile').value.trim();

        const response = await fetch(`/api/characters/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, description, location, profession, philosophy, motivation, notes, image }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/characters');
        } else {
            alert('Failed to update character');
        }
    }
};

document
    .querySelector('.new-character')
    .addEventListener('click', newFormHandler);

document
    .querySelector('.character-delete')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.update-character')
    .addEventListener('click', updateFormHandler);
