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

//DONE
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

//DONE
router.post('/', (req, res) => {
  const newAccount = req.body;
  db("accounts")
  .insert(newAccount, "id")
  .then(ids => {
    db("accounts")
    .where({ id: ids[0] })
    .first()
    .then( account => {
      res.status(200).json({ data: account })
    })
    .catch(error => {
      res.status(500).json({ message: "there was an error making the account" })
    })
  })
});

//DONE
router.put('/:id', (req, res) =>{
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
  .where({ id })
  .update(changes)
  .then( count => {
    count > 0 ? res.status(200).json({ data: count }) :
    res.status(404).json({ message: "There was no rcord to update" })
  })
  .catch(err => {
    res.status(500).json({ message: "Could not update the account" })
  })
});

router.delete('/:id', (req, res) =>{
  const { id } = req.params;
  db("accounts")
  .where({ id })
  .del()
  .then(count => {
    count > 0 ? res.status(204).json({ data: count }) :
    res.status(404).json({ message:"Account could not be deleted" })
  })
  .catch(error => {
    res.status(500).json({ message: "There was an error deleting the account" })
  })

});

module.exports = router;
