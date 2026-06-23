import CashRequestService from "../services/CashRequestService.js";
class CashReqController {
    constructor() {
        this.createCash = async (req, res, next) => {
            try {
                const data = await CashRequestService.createCashRequest(req);
                res.json({
                    data: data,
                    message: "Cash request created successfully",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.getCashRequests = async (req, res, next) => {
            try {
                const data = await CashRequestService.getCashRequests(req);
                res.json({
                    data: data,
                    message: "Cash requests fetched successfully",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.updateCashRequestStatus = async (req, res, next) => {
            try {
                const id = req.params.id;
                const cashRequestDetail = await CashRequestService.getSingleRowByFilter({
                    _id: id,
                });
                if (!cashRequestDetail) {
                    throw { code: 404, message: "Cash request not found" };
                }
                const mappedData = CashRequestService.mapCashRequestForUpdateModel(req, cashRequestDetail);
                if (mappedData.status === "approved") {
                    const requestId = typeof id === "string" ? id : String(id);
                    await CashRequestService.approveCashRequest(requestId, Number(cashRequestDetail.amount));
                }
                const update = await CashRequestService.updateSingleRowByFilter({ _id: id }, mappedData);
                res.json({
                    data: update,
                    message: "Cash request status updated successfully",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.deleteCashRequest = async (req, res, next) => {
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
            }
            catch (exception) {
                next(exception);
            }
        };
        this.getCashRequestById = async (req, res, next) => {
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
            }
            catch (exception) {
                next(exception);
            }
        };
    }
}
export default CashReqController;
//# sourceMappingURL=CashReqController.js.map