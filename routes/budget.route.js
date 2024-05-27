const express = require("express");
const budgetRouter = express.Router();
const { authenticate } = require("../authentication/authenticate");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

budgetRouter.post("/create", authenticate, async (req, res) => {
  const { amount, month, year } = req.body;

  const budget = await prisma.budget.create({
    data: {
      amount,
      month,
      year,
      userId: req.userId,
    },
  });

  res.status(201).json(budget);
});

budgetRouter.get("/all", authenticate, async (req, res) => {
  const budgets = await prisma.budget.findMany({
    where: { userId: req.userId },
  });

  res.json(budgets);
});

module.exports = {
  budgetRouter,
};
