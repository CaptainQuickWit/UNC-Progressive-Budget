const router = require("express").Router();
const Transaction = require("../models/budgetModel.js");

router.post("/api/transaction", ({ body }, res) => {
  //do stuff
  console.log("entered the router.post route for transaction");
  Transaction.create(body)

    .then(dbTransaction => {

      res.json(dbTransaction);
    })
    .catch(err => {
      
      res.status(404).json(err);
    });

});

/**
 * This method is for bulk post req to the api
 */
router.post("/api/transaction/bulk", ({body}, res) => {
  console.log("entered the router.post route for bulk transactions");

  Transaction.insertMany(body)

    .then(dbTransaction => {
      res.json(dbTransaction);

    })
    .catch(err => {

      console.log("error api.js line 25");
      res.status(404).json(err);

    });
});

/**
 * this api's main get method. returns all of them sorted in decending order.
 */
router.get("/api/transaction", (req, res) => {

  Transaction.find({}).sort({date: -1})

    .then(dbTransaction => {
      res.json(dbTransaction);

    })
    .catch(err => {
      res.status(404).json(err);
    });

});


module.exports = router;
