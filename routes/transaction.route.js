const express = require("express");
const transactionRouter = express.Router();
const { authenticate } = require("../authentication/authenticate");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

transactionRouter.post("/create", authenticate, async (req, res) => {
  const { amount, type, categoryId } = req.body;

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      type,
      categoryId,
      userId: req.userId,
    },
  });

  res.status(201).json(transaction);
});

transactionRouter.get("/all", authenticate, async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: req.userId },
    include: { category: true },
  });

  res.json(transactions);
});

transactionRouter.delete("/remove/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  await prisma.transaction.delete({ where: { id } });

  res.status(204).end();
});

module.exports = {
  transactionRouter,
};
