// server/routes/importCsv.js

const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Waitlist = require("../models/waitListModel");

const router = express.Router();

// 1) Multer writes uploads into server/tmp/
const upload = multer({
  dest: path.join(__dirname, "../tmp/"),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// 2) POST /api/import-csv
router.post(
  "/import-csv",
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded." });
    }

    const results = [];
    const filePath = req.file.path;
    console.log(">>> Multer stored file at:", path.resolve(filePath));

    let rowCount = 0;
    let parsedCount = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rowCount++;
        console.log(`Row ${rowCount} raw object:`, row);

        // Map CSV columns to schema fields using bracket notation:
        //   "First Name"  → firstName
        //   "Last Name"   → lastName
        //   "Email"       → email
        //   "Interest"    → interest
        //   "Date" + "_5" → createdAt
        const firstNameRaw = row["First Name"];
        const lastNameRaw = row["Last Name"];
        const emailRaw = row["Email"];
        const interestRaw = row["Interest"];
        const dateRaw = row["Date"]; // e.g. "6/4/2025"
        const timeRaw = row["_5"];   // e.g. " 7:00:35 PM"

        // Trim spaces:
        const firstName = firstNameRaw ? firstNameRaw.trim() : "";
        const lastName = lastNameRaw ? lastNameRaw.trim() : "";
        const email = emailRaw ? emailRaw.toLowerCase().trim() : "";
        const interest = interestRaw ? interestRaw.trim() : "";

        // “firstName,lastName,email,interest” are required in your schema:
        if (!firstName || !lastName || !email || !interest) {
          console.warn(
            `Skipping row ${rowCount} because a required field was missing.`
          );
          return;
        }

        // Combine date + time into JS Date, if present:
        let createdAt;
        if (dateRaw) {
          const dateTimeString = timeRaw
            ? `${dateRaw}${timeRaw}`   // e.g. "6/4/2025 7:00:35 PM"
            : `${dateRaw}`;
          createdAt = new Date(dateTimeString);
          if (isNaN(createdAt.getTime())) {
            console.warn(
              `Row ${rowCount}: invalid date/time (“${dateTimeString}”), using Date.now().`
            );
            createdAt = new Date();
          }
        } else {
          createdAt = undefined; // fallback to mongoose default Date.now
        }

        parsedCount++;
        results.push({
          firstName,
          lastName,
          email,
          interest,
          createdAt,
          // Other schema fields (status, source, invitedAt, joinedAt) 
          // are optional, so we omit them and let Mongoose fill defaults.
        });
      })
      .on("end", async () => {
        console.log(
          `>>> Finished CSV parse: ${rowCount} total rows, ${parsedCount} valid rows.`
        );
        if (parsedCount === 0) {
          // No rows to insert
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
          });
          return res.status(400).json({
            status: "error",
            message: `Parsed 0 valid rows out of ${rowCount}. Check your CSV headers and required fields.`,
          });
        }

        try {
          // 3) Bulk-insert with ordered:false → continue on duplicates
          const insertedDocs = await Waitlist.insertMany(results, {
            ordered: false,
          });

          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
          });

          return res.status(200).json({
            status: "success",
            parsedCount,
            insertedCount: insertedDocs.length,
            message: `Parsed ${parsedCount} rows; inserted ${insertedDocs.length} documents.`,
          });
        } catch (err) {
          // 4) If it’s a duplicate‐key error, err.code === 11000
          if (err.code === 11000 && err.result) {
            // err.result.insertedCount tells us how many actually went in
            const insertedCount = err.result.insertedCount || 0;

            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr) console.error("Failed to delete temp file:", unlinkErr);
            });

            return res.status(200).json({
              status: "partial",
              parsedCount,
              insertedCount,
              message: `Parsed ${parsedCount} rows; inserted ${insertedCount} documents. ${parsedCount - insertedCount} duplicates were skipped.`,
            });
          }

          // Otherwise, bubble up the error
          console.error("Error during insertMany:", err);
          return next(err);
        }
      })
      .on("error", (err) => {
        console.error("CSV parsing error:", err);
        next(err);
      });
  }
);

module.exports = router;
