var express = require('express');
var router = express.Router();


/* ==================================================================================== */

/* GET expense page. */

var ExpenseProvider = require('./../models/dbProvider').ExpenseProvider;
var ExpenseProvider = new ExpenseProvider();
var CategoryProvider = require('./../models/dbProvider').CategoryProvider;
var CategoryProvider = new CategoryProvider();

//index 
router.get('/expense', function (req, res, next) {
    ExpenseProvider.findAll(function (error, expenses) {
        expenses.forEach(function (expense) {
            CategoryProvider.findById(expense.category, function (err, category) {
                expense.categoryName = category.name;
            });
        });
        setTimeout(function () {
            res.render('expense/index', {
                title: "Expenses",
                expenses: expenses
            });
        }, 10);

    });
});


//new : GET
router.get('/expense/new', function (req, res) {
    CategoryProvider.findAll(function (error, categories) {
        res.render('expense/expense_new', {
            title: 'New Expense',
            transaction: '',
            date: Date.now,
            amount: 0,
            categories: categories
        });
    });
});

//new : POST
router.post('/expense/new', function (req, res) {
    ExpenseProvider.save({
        transaction: req.param('transaction'),
        date: req.param('date'),
        amount: req.param('amount'),
        category: req.body.category
    }, function (error, docs) {
        res.redirect('/expense');
    });
});

//show

router.get('/expenses/:id', function (req, res) {
    ExpenseProvider.findById(req.param('id'), function (error, expense) {
        CategoryProvider.findById(expense.category, function (err, category) {
            expense.categoryName = category.name;
        });
        setTimeout(function () {
            res.render('expense/expense_show', {
                title: expense.name,
                expense: expense
            });
        }, 10);


    });
});

//edit: GET
router.get('/expenses/:id/edit', function (req, res) {
    CategoryProvider.findAll(function (error, categories) {
        ExpenseProvider.findById(req.param('id'), function (error, expense) {
            res.render('expense/expense_edit', {
                title: expense.expense,
                expense: expense,
                categories: categories
            });
        });
    });
});

//edit: POST
router.post('/expenses/:id/edit', function (req, res) {
    ExpenseProvider.updateById(req.param('id'), req.body, function (error, expense) {
        res.redirect('/expense');
    });
});

//delete: DELETE
router.get('/expenses/:id/delete', function (req, res) {
    ExpenseProvider.deleteById(req.param('id'), req.body, function (error, expense) {
        res.redirect('/expense');
    });
});


module.exports = router;