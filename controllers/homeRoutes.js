const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const { Review } = require('../models')

router.get('/', async (req, res) => {
  try {
    // Get all reviews and JOIN with user data
    const reviewData = await Review.findAll({
      // include: [
      //   // {
      //   //   model: User,
      //   //   attributes: ['name'],
      //   // },
      // ],
    });
console.log(reviewData)
    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));
console.log(reviews)
    // This is the route for the homepage.handlebars
    res.render('homepage',{
      reviews,
      logged_in: (req.session && req.session.logged_in)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route will point towards the review.handlebars to retrieve a review
router.get('/review/:id', async (req, res) => {
  try {
    const oneReiew = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const renderReview = reviewData.get({ plain: true });

    res.render('review', {

      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Can be used to go to a user profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
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


// This will handle direcing to a login.handlebars
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.render('login');
    // res.redirect('/profile');
     return;
  }

  res.render('login');
});

// This will handle directing to a signup.handlebars
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.render('signup');
    // res.redirect('/profile');
     return;
  }

  res.redirect('/');
});


module.exports = router;
