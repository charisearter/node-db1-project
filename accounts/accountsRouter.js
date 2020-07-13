const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

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

router.get('/:id', (req,res) => {});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) =>{});

router.delete('/:id', (req, res) =>{});

module.exports = router;
