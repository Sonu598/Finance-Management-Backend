const express = require("express");
const reportRouter = express.Router();
const { authenticate } = require("../authentication/authenticate");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

reportRouter.get("/monthly", authenticate, async (req, res) => {
  const { month, year } = req.query;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.userId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lt: new Date(`${year}-${parseInt(month) + 1}-01`),
      },
    },
    include: { category: true },
  });

  res.json(transactions);
});

reportRouter.get("/categories", authenticate, async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: req.userId },
    include: { category: true },
  });

  const report = transactions.reduce((acc, transaction) => {
    const { name } = transaction.category;
    if (!acc[name]) {
      acc[name] = 0;
    }
    acc[name] += transaction.amount;
    return acc;
  }, {});

  res.json(report);
});

module.exports = {
  reportRouter,
};
