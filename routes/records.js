import express from "express";
import getRecords from "../services/records/getRecords.js";
import getRecordById from "../services/records/getRecordById.js";
import createRecord from "../services/records/createRecord.js";
import updateRecordById from "../services/records/updateRecordById.js";
import deleteRecord from "../services/records/deleteRecord.js";
import authMiddleware from "../middelware/advancedAuth.js";
import notFoundErrorHandler from "../middelware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { genre, available } = req.query;
    const records = getRecords(genre, available);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of records!");
  }
});

router.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const record = getRecordById(id);
    if (!record) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json(record);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, (req, res) => {
  try {
    const { title, artist, year, available, genre } = req.body;
    const newRecord = createRecord(title, artist, year, available, genre);
    res.status(200).json(newRecord);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating new record!");
  }
});

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { title, artist, year, available, genre } = req.body;
    const newRecord = updateRecordById(
      id,
      title,
      artist,
      year,
      available,
      genre
    );
    res.status(200).json(newRecord);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedRecordId = deleteRecord(id);
    if (!deletedRecordId) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Record with id ${deletedRecordId} was deleted!`,
      });
    }
  },
  notFoundErrorHandler
);

export default router;
