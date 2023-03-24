const router = require('express').Router();
const { Character } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const chatacterData = await Character.findAll();
        res.status(200).json(chatacterData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newCharacter = await Character.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCharacter = await Character.update(
            {
                // Edit fields if needed
                name: req.body.name,
                location: req.body.location,
                profession: req.body.description,
                philosophy: req.body.philosophy,
                motivation: req.body.motivation,
                notes: req.body.notes,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        res.status(200).json(updatedCharacter);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const characterData = await Character.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!characterData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(characterData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
