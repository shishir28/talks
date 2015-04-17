var express = require('express');
var router = express.Router();


/* ==================================================================================== */

/* GET category page. */

var CategoryProvider = require('./../models/dbProvider').CategoryProvider;
var CategoryProvider = new CategoryProvider();
//index 
router.get('/category', function (req, res, next) {
    CategoryProvider.findAll(function (error, categ) {
        res.render('category/index', {
            title: "Categories",
            categories: categ
        });
    })
})

//new : GET
router.get('/category/new', function (req, res) {
    res.render('category/category_new', {
        title: 'New Category'
    });
});

//new : POST
router.post('/category/new', function (req, res) {
    CategoryProvider.save({
        name: req.param('name'),
        description: req.param('description')
    }, function (error, docs) {
        res.redirect('/category');
    });
});

//show
router.get('/categories/:id', function (req, res) {
    CategoryProvider.findById(req.param('id'), function (error, category) {
        res.render('category/category_show', {
            title: category.name,
            category: category
        });
    });
});

//edit: GET
router.get('/categories/:id/edit', function (req, res) {
    CategoryProvider.findById(req.param('id'), function (error, category) {
        res.render('category/category_edit', {
            title: category.category,
            category: category
        });
    });
});

//edit: POST
router.post('/categories/:id/edit', function (req, res) {
    CategoryProvider.updateById(req.param('id'), req.body, function (error, category) {
        res.redirect('/category');
    });
});

//delete: DELETE
router.get('/categories/:id/delete', function (req, res) {
    CategoryProvider.deleteById(req.param('id'), req.body, function (error, category) {
        res.redirect('/category');
    });
});


module.exports = router;