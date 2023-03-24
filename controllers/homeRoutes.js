const router = require('express').Router();
// Models do not exist yet
const { User, Plot, Location, Characters } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const plotData = await Plot.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const plots = plotData.map((plot) => plot.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/plot/:id', async (req, res) => {
  try {
    const plotData = await Plot.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const plots = plotData.get({ plain: true });

    const characterData = await Character.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          model: Plot
        },
      ],
    });

    const characters = characterData.get({ plain: true });

    const locationData = await Location.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          model: Plot
        },
      ],
    });

    const locations = locationData.get({ plain: true });

    res.render('plot', {
      ...plots,
      ...characters,
      ...locations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/location/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          model: Plot
        },
      ],
    });
    const locations = locationData.get({ plain: true });

    const plotData = await Plot.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const plots = plotData.get({ plain: true });

    const characterData = await Character.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          model: Plot
        },
      ],
    });

    const characters = characterData.get({ plain: true });

    res.render('location', {
      ...plots,
      ...characters,
      ...locations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/character/:id', async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          model: Plot
        },
      ],
    });

    const characters = characterData.get({ plain: true });

    const locationData = await Location.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          model: Plot
        },
      ],
    });
    const locations = locationData.get({ plain: true });

    const plotData = await Plot.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const plots = plotData.get({ plain: true });

    res.render('character', {
      ...plots,
      ...characters,
      ...locations,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Plot }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
