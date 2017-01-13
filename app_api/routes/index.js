var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});


var ctrlPlans = require('../controllers/plans');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

/*Display a list of lesson plans for a particular topic*/
router.get('/plans/level/:level', ctrlPlans.display_plans);
router.get('/plans/:level/:topic', ctrlPlans.display_plans);

/*Display an actual lesson plan*/
router.get('/plans/:level/:topic/:plan_id', ctrlPlans.plan_read_one);

/*create a lesson plan*/
router.post('/plans/submit', ctrlPlans.plansCreate);

/*Create a review for a lesson plan */
router.post('/plans/:level/:topic/:plan_id/reviews', auth, ctrlReviews.reviewsCreate);
router.put('/plans/:level/:topic/:plan_id/reviews/:review_id', ctrlReviews.reviewsUpdateOne);

/*Delete a review or plan */
router.delete('/plans/delete/:level/:topic/:plan_id', ctrlPlans.plansDeleteOne);
router.delete('/reviews/delete/:plan_id/:review_id', ctrlReviews.reviewsDelete);


router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
