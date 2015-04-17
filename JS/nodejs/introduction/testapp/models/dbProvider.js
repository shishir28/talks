var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sampleApp');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Category = new Schema({
    name: String,
    description: String
});

var Expense = new Schema({
    transaction: String,
    date: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    categoryName: String,
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    }
});



mongoose.model('Category', Category);
mongoose.model('Expense', Expense);

var Category = mongoose.model('Category');
var Expense = mongoose.model('Expense');

CategoryProvider = function () {};
ExpenseProvider = function () {};


//Find all categories
CategoryProvider.prototype.findAll = function (callback) {
    Category.find({}, function (err, categories) {
        callback(null, categories)
    });
};

CategoryProvider.prototype.findById = function (id, callback) {
    Category.findById(id, function (err, category) {
        if (!err) {
            callback(null, category);
        }
    });
};

CategoryProvider.prototype.updateById = function (id, body, callback) {
    Category.findById(id, function (err, category) {
        if (!err) {
            category.name = body.name;
            category.description = body.description;
            category.save(function (err) {
                callback();
            });
        }
    });
};

CategoryProvider.prototype.deleteById = function (id, body, callback) {
    Category.findById(id, function (err, category) {
        if (!err) {
            category.remove(function (err, category) {
                callback();
            });
        }
    });
};


//Create a new category
CategoryProvider.prototype.save = function (params, callback) {
    var category = new Category({
        name: params['name'],
        description: params['description']
    });

    category.save(function (err) {
        callback();
    });
};
/* =========================Expense related operation Begins========================= */


//Find all expenses
ExpenseProvider.prototype.findAll = function (callback) {
    Expense.find({}, function (err, expenses) {
        callback(null, expenses)
    });
};

ExpenseProvider.prototype.findById = function (id, callback) {
    Expense.findById(id, function (err, expense) {
        if (!err) {
            callback(null, expense);
        }
    });
};


ExpenseProvider.prototype.updateById = function (id, body, callback) {
    Expense.findById(id, function (err, expense) {
        if (!err) {
            expense.transaction = body.transaction;
            expense.date = body.date;
            expense.amount = body.amount;
            expense.category = body.category;
            expense.save(function (err) {
                callback();
            });
        }
    });
};

ExpenseProvider.prototype.deleteById = function (id, body, callback) {
    Expense.findById(id, function (err, expense) {
        if (!err) {
            expense.remove(function (err, expense) {
                callback();
            });
        }
    });
};


//Create a new expense
ExpenseProvider.prototype.save = function (params, callback) {
    var expense = new Expense({
        transaction: params['transaction'],
        date: params['date'],
        amount: params['amount'],
        category: params['category']
    });

    expense.save(function (err) {
        callback();
    });
};

/* =========================Expense related operation Ends========================= */

exports.CategoryProvider = CategoryProvider;
exports.ExpenseProvider = ExpenseProvider;