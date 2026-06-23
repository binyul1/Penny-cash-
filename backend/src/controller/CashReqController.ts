import type { Response, NextFunction } from "express";
import CashRequestService from "../services/CashRequestService.ts";
import type { AuthRequest } from "../types/Request.ts";

class CashReqController {
  createCash = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await CashRequestService.createCashRequest(req);
      res.json({
        data: data,
        message: "Cash request created successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getCashRequests = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await CashRequestService.getCashRequests(req);
      res.json({
        data: data,
        message: "Cash requests fetched successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCashRequestStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const cashRequestDetail = await CashRequestService.getSingleRowByFilter({
        _id: id,
      });
      if (!cashRequestDetail) {
        throw { code: 404, message: "Cash request not found" };
      }
      const mappedData = CashRequestService.mapCashRequestForUpdateModel(
        req,
        cashRequestDetail,
      );
      const update = await CashRequestService.updateSingleRowByFilter(
        { _id: id },
        mappedData,
      );
      res.json({
        data: update,
        message: "Cash request status updated successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteCashRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const cashRequestDetail = await CashRequestService.getSingleRowByFilter({
        _id: id,
      });
      if (!cashRequestDetail) {
        throw { code: 404, message: "Cash request not found" };
      }
      const deletedStatus = await CashRequestService.deleteSingleRowByFilter({
        _id: id,
      });
      res.json({
        data: deletedStatus,
        message: "Cash request deleted successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  getCashRequestById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const cashRequestDetail = await CashRequestService.getSingleRowByFilter({
        _id: id,
      });
      if (!cashRequestDetail) {
        throw { code: 404, message: "Cash request not found" };
      }
      res.json({
        data: cashRequestDetail,
        message: "Cash request fetched successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}
export default CashReqController;