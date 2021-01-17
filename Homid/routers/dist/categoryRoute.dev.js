"use strict";

var express = require('express');

var Category = require('../models/category');

var router = express.Router();

function categoriesFind() {
  return regeneratorRuntime.async(function categoriesFind$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", Category.find({}).exec());

        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 4]]);
} // get all categories to display on category page.


router.get('/', function _callee(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(categoriesFind());

        case 3:
          categories = _context2.sent;

          if (categories === false || categories === undefined) {
            res.send({
              ok: false
            });
          } else {
            res.send({
              ok: true,
              categories: categories
            });
          }

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.send({
            ok: false
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //create new category for admin

router.post('/create', function _callee2(req, res) {
  var newCategoryName, newCategoryImg, category, categories;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newCategoryName = req.body.newCategoryName;
          newCategoryImg = req.body.newCategoryImg;
          console.log(newCategoryName);
          console.log(newCategoryImg);
          category = new Category({
            Name: newCategoryName,
            Img: newCategoryImg
          });
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(category.save());

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(categoriesFind());

        case 10:
          categories = _context3.sent;
          res.send({
            ok: true,
            category: category,
            categories: categories
          });
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](5);
          console.log(_context3.t0);
          res.send({
            ok: false
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 14]]);
});
router.post('/edit', function _callee4(req, res) {
  var _req$body, categoryId, newCategoryName, newCategoryImg;

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, categoryId = _req$body.categoryId, newCategoryName = _req$body.newCategoryName, newCategoryImg = _req$body.newCategoryImg;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            Img: newCategoryImg,
            Name: newCategoryName
          }, function _callee3(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!err) {
                      _context4.next = 6;
                      break;
                    }

                    console.log(newCategoryName, newCategoryImg);
                    console.log(err);
                    res.send({
                      ok: false
                    });
                    _context4.next = 11;
                    break;

                  case 6:
                    _context4.next = 8;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 8:
                    categories = _context4.sent;
                    console.log(categories);
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 11:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 4:
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 6]]);
});
router.post('/delete', function _callee6(req, res) {
  var chosenCategoryid;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          chosenCategoryid = req.body.chosenCategoryid;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndRemove({
            _id: chosenCategoryid
          }, function _callee5(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee5$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!err) {
                      _context6.next = 4;
                      break;
                    }

                    res.send({
                      ok: false
                    });
                    _context6.next = 9;
                    break;

                  case 4:
                    _context6.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context6.sent;
                    console.log(categories);
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 9:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }));

        case 4:
          _context7.next = 10;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](1);
          console.log(_context7.t0);
          res.send({
            ok: false
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 6]]);
});
module.exports = router;