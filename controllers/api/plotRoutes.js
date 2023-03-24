const router = require('express').Router();
const { Plot } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const plotData = await Plot.findAll();
    res.status(200).json(plotData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPlot = await Plot.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPlot);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPlot = await Plot.update(
      {
        // Edit fields if needed
        name: req.body.name,
        location: req.body.location,
        characters: req.body.characters,
        conflict: req.body.conflict,
        payoff: req.body.payoff,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatedPlot);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const plotData = await Plot.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plotData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(plotData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
