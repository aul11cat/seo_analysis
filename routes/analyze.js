const express = require('express');

const router = express.Router();
const analyze = require('../controller/analyzeController')

const multer = require('multer')
const upload = multer({
    dest: './public/uploads/',
    limit: {
        fileSize: 1000000
    },
})


/* GET analyze listing. */
router.get('/', function (req, res, next) {
    res.render('analyze', {title: 'Analyze Page'});
});
router.post('/analyze', upload.array('file', 1), analyze.analyzeHtml);


module.exports = router;
