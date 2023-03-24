const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plotRoutes = require('./plotRoutes');
const characterRoutes = require('./characterRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/users', userRoutes);
router.use('/plots', plotRoutes);
router.use('/characters', characterRoutes);
router.use('/locations', locationRoutes);

module.exports = router;
