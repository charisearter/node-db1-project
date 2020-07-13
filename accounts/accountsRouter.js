const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

//DONE
router.get('/', (req,res) => {
  db.select("*")
  .from("accounts")
  .then( accounts => {
    res.status(200).json({ data: accounts })
  })
  .catch(error => {
    res.status(500).json({ message: "There was an error getting the accounts" })
  })
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  db.select("*")
  .from("accounts")
  .where({ id })
  .first()
  .then(account => 
    res.status(200).json({ data: account }))
  .catch(error => {
    res.status(500).json({ message: "could not find account with that id" })
  })
});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) =>{});

router.delete('/:id', (req, res) =>{});

module.exports = router;
