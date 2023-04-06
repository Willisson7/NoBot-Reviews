const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoute = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoute);

module.exports = router;
