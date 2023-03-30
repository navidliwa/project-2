const router = require('express').Router();
const { Location } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll();
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newLocation = await Location.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newLocation);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedLocation = await Location.update(
            {
                // Edit fields if needed
                name: req.body.name,
                description: req.body.description,
                biome: req.body.biome,
                places_of_interest: req.body.placesOfInterest,
                history: req.body.history,
                image: req.body.image,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        res.status(200).json(updatedLocation);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!locationData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
