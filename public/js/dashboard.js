// Cloudinary
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#plot-name').value.trim();
    const description = document.querySelector('#plot-desc').value.trim();
    const submittedImage = document.querySelector('#plot-image').value;

    // Cloudinary
    await cloudinary.uploader.upload(submittedImage, { public_id: name });
    const image = cloudinary.url(name, {
        width: 100,
        height: 150,
        Crop: 'fill'
    });

    if (name && description && image) {
        const response = await fetch(`/api/plots`, {
            method: 'POST',
            body: JSON.stringify({ name, description, image }),
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
