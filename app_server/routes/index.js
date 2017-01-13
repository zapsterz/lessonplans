var express = require('express');
var path = require('path');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

//dealing with file uploads
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage });

/* Home page */
//router.get('/', ctrlLocations.homelist);


//router.get('/', ctrlOthers.angularApp);


/* GET submit form, POST new lesson plan data */
//router.get('/submit', ctrlLocations.submit_form);


//router.post('/submit', upload.single('fileupload'), ctrlLocations.dosubmit_form);
router.get('/', ctrlLocations.submit_form);
/*router.post('/submit', upload.fields([{
						name: 'doc', maxCount: 1
						}, {
						name: 'pdf', maxCount: 1
						}]), ctrlLocations.dosubmit_form);
*/
router.post('/now', upload.fields([{
                        name: 'doc', maxCount: 1
                        }, {
                        name: 'pdf', maxCount: 1
                        }]), ctrlLocations.sn);

/* GET lessons for all levels, topics and a single plan */
//router.get('/showplans/:level', ctrlLocations.showplanslevel);
//router.get('/showplans/:level/:topic', ctrlLocations.showplanslevel);
//router.get('/showplans/:level/:topic/:id', ctrlLocations.showaplan);

/* POST a review for a lesson plan */
//router.post('/showplans/:level/:topic/:id', ctrlLocations.doaddreview);

/* DElETE a plan */
//router.post('/delete/:level/:topic', ctrlLocations.deleteaplan);

/* DELETE a review */
//router.post('/delete/:level/:topic/:id/reviews', ctrlLocations.deleteareview);


module.exports = router;
