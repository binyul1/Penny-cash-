import type { Request, Response, NextFunction } from "express";
import CashAccountModel from "../model/cashAccountModel.ts";
import type { AuthRequest } from "../types/Request.ts";
import CashBalanceModel from "../model/cashBalanceModel.ts";

const BALANCE_KEY = "main";

class CashdepositController {
  private ensureBalanceDocument = async () => {
    const balanceRecord = await CashBalanceModel.findOneAndUpdate(
      { key: BALANCE_KEY },
      {
        $setOnInsert: {
          key: BALANCE_KEY,
          balance: 0,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    return balanceRecord;
  };

  createDeposit = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const loggedInUser = req.loggedInUser;
      if (!loggedInUser) {
        throw { code: 401, message: "Unauthorized" };
      }

      const amount = Number(req.body.amount);
      const description = req.body.description || "";

      if (!Number.isFinite(amount) || amount <= 0) {
        throw { code: 422, message: "Amount must be greater than 0" };
      }

      await this.ensureBalanceDocument();

      const updatedBalance = await CashBalanceModel.findOneAndUpdate(
        { key: BALANCE_KEY },
        {
          $inc: {
            balance: amount,
          },
        },
        {
          new: true,
        },
      );

      if (!updatedBalance) {
        throw { code: 500, message: "Unable to update cash balance" };
      }

      const deposit = await CashAccountModel.create({
        transactionType: "deposit",
        amount,
        description,
        depositdBy: loggedInUser._id,
        balanceAfterTransaction: updatedBalance.balance,
      });

      res.status(201).json({
        data: deposit,
        message: "Cash depositd successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  withdrawCash = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const loggedInUser = req.loggedInUser;
      if (!loggedInUser) {
        throw { code: 401, message: "Unauthorized" };
      }

      const amount = Number(req.body.amount);
      const description = req.body.description || "";

      if (!Number.isFinite(amount) || amount <= 0) {
        throw { code: 422, message: "Amount must be greater than 0" };
      }

      await this.ensureBalanceDocument();

      const updatedBalance = await CashBalanceModel.findOneAndUpdate(
        {
          key: BALANCE_KEY,
          balance: { $gte: amount },
        },
        {
          $inc: {
            balance: -amount,
          },
        },
        {
          new: true,
        },
      );

      if (!updatedBalance) {
        throw { code: 422, message: "Insufficient balance" };
      }

      const withdrawal = await CashAccountModel.create({
        transactionType: "withdraw",
        amount,
        description,
        depositdBy: loggedInUser._id,
        balanceAfterTransaction: updatedBalance.balance,
      });

      res.status(201).json({
        data: withdrawal,
        message: "Cash withdrawn successfully",
        meta: {
          balance: updatedBalance.balance,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const balanceRecord = await this.ensureBalanceDocument();

      res.json({
        data: balanceRecord,
        message: "Current cash balance",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getDeposits = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deposits = await CashAccountModel.find()
        .populate("depositdBy", "name email username role")
        .sort({ createdAt: -1 });

      res.json({
        data: deposits,
        message: "Cash deposit history",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

export default CashdepositController;
