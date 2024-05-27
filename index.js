const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { reportRouter } = require("./routes/report.route");
const { budgetRouter } = require("./routes/budget.route");
const { transactionRouter } = require("./routes/transaction.route");
const { authenticate } = require("./authentication/authenticate");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/transaction", transactionRouter);
app.use("/budget", budgetRouter);
app.use("/report", reportRouter);

app.listen(process.env.Port, () => {
  console.log(`Server is running at Port ${process.env.Port}`);
});
