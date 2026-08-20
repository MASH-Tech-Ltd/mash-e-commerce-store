const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mohsinahmed22022_db_user:WS5JzIVFEiEN1k7c@scaleup.kblzvbw.mongodb.net/electronics_single").then(async () => {
  const q1 = "হুয়াওয়ে";
  const q2 = "হুয়াওয়ে";
  console.log("q1:", q1);
  console.log("q2:", q2);
  const r1 = await mongoose.connection.db.collection("products").find({ title: { $regex: q1, $options: "i" } }).toArray();
  const r2 = await mongoose.connection.db.collection("products").find({ title: { $regex: q2, $options: "i" } }).toArray();
  console.log("r1 match:", r1.length);
  console.log("r2 match:", r2.length);
  process.exit(0);
});
