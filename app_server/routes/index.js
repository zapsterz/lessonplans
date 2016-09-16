var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');


/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);


router.get('/contacts', ctrlLocations.showContacts);


/* Other pages */
router.get('/about', ctrlOthers.about);


/* Actual pages */
router.get('/primary/numeracy', ctrlLocations.show_P_Numeracy);
router.get('/primary/literacy', ctrlLocations.show_P_Literacy);
router.get('/primary/science', ctrlLocations.show_P_Science);

router.get('/spa', ctrlLocations.spa);

module.exports = router;
