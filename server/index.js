const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES//

//get all Buckets of the user
app.get("/buckets", async (req, res) => {
  try {
    const allBuckets = await pool.query("select * from bucket");
    res.json(allBuckets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a new bucket for the user
app.post("/newBucket", async (req, res) => {
  try {
    const { bucket_name } = req.body;
    const newBucket = await pool.query(
      "insert into bucket(bucket_name) values($1) returning *",
      [bucket_name]
    );
    res.json(newBucket.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a user's bucket
app.delete("/deleteBucket", async (req, res) => {
  try {
    const { bucket_name } = req.body;
    const deleteBucket = await pool.query(
      "delete from bucket where bucket_name = ($1)",
      [bucket_name]
    );
    res.json("Bucket successfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//create a user card
app.post("/:bucketId", async (req, res) => {
  try {
    const { bucketId } = req.params;
    const { card_link } = req.body;
    const { card_name } = req.body;
    const newCard = await pool.query(
      "insert into card(card_link,card_name,bucket_id) values($1,$2,$3) returning *",
      [card_link, card_name, bucketId]
    );
    res.json(newCard.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all cards of the user
app.get("/:bucketId", async (req, res) => {
  try {
    const { bucketId } = req.params;
    const allCards = await pool.query(
      "select * from card where bucket_id = ($1)",
      [bucketId]
    );
    res.json(allCards.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//delete a user card
app.delete("/:bucketId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const deleteCard = await pool.query(
      "delete from card where card_id = ($1)",
      [cardId]
    );
    res.json("card successfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//edit a user card
app.put("/:id/:bucketId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { card_link } = req.body;
    const { card_name } = req.body;
    const updateCard = await pool.query(
      "update card set card_link = ($1),card_name = ($2) where card_id = ($3)",
      [card_link, card_name, cardId]
    );
    res.json("Card was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

//move a user card
app.put("/:id/:bucketId/move", async (req, res) => {
  try {
    const { bucket_id } = req.body;
    const { cardId } = req.params;
    const moveCard = await pool.query(
      "update card set bucket_id = ($1) where card_id=($2)",
      [bucket_id, cardId]
    );
    res.json("Card move was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
