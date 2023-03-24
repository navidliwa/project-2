const router = require('express').Router();
const { User, Plot, Location, Character } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const plotData = await Plot.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const plots = plotData.map((plot) => plot.get({ plain: true }));

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
        User
      ],
    });

    const plot = plotData.get({ plain: true });

    res.render('plotdetails', {
      ...plot,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/location/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [
        User
      ],
    });

    const location = locationData.get({ plain: true });

    res.render('locationdetails', {
      ...location,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/character/:id', async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id, {
      include: [
        User
      ],
    });

    const character = characterData.get({ plain: true });

    res.render('characterdetails', {
      ...character,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/update/plot/:id', withAuth, async (req, res) => {
  try {
    const plotData = await Plot.findByPk(req.params.id, {
      include: [
        User
      ],
    });

    const plot = plotData.get({ plain: true });

    res.render('plotupdate', {
      ...plot,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/update/location/:id', withAuth, async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [
        User
      ],
    });

    const location = locationData.get({ plain: true });

    res.render('locationupdate', {
      ...location,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/update/character/:id', withAuth, async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id, {
      include: [
        User
      ],
    });

    const character = characterData.get({ plain: true });

    res.render('characterupdate', {
      ...character,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
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
