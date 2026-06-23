import RequestModel from "../model/cashRequestModel.js";
import CashBalanceModel from "../model/cashBalanceModel.js";
class CashRequestService {
    static mapCashRequestData(req) {
        const loggedInUser = req.loggedInUser;
        if (!loggedInUser) {
            throw { code: 401, message: "Unauthorized" };
        }
        const data = req.body;
        if (req.file) {
            data.image = {
                originalName: req.file.originalname,
                filename: req.file.filename,
                size: req.file.size,
                destination: req.file.destination,
            };
        }
        data.createdBy = loggedInUser._id;
        return data;
    }
    static mapCashRequestForUpdateModel(req, _cashRequestDetail) {
        return {
            status: req.body.status,
        };
    }
    static async getSingleRowByFilter(filter) {
        return await RequestModel.findOne(filter);
    }
    static async updateSingleRowByFilter(filter, mappedData) {
        try {
            const update = await RequestModel.findOneAndUpdate(filter, mappedData, {
                new: true,
                runValidators: true,
            });
            return update;
        }
        catch (exception) {
            throw exception;
        }
    }
    static async approveCashRequest(requestId, amount) {
        const balanceEntry = await CashBalanceModel.findOne({ key: "main" });
        if (!balanceEntry) {
            const createdBalance = await CashBalanceModel.create({
                key: "main",
                balance: 0,
            });
            if (!createdBalance) {
                throw { code: 500, message: "Unable to initialize main balance" };
            }
        }
        const currentBalance = await CashBalanceModel.findOne({ key: "main" });
        if (!currentBalance) {
            throw { code: 500, message: "Main balance not found" };
        }
        if (currentBalance.balance < amount) {
            throw {
                code: 400,
                message: "Insufficient balance to approve this expense",
            };
        }
        currentBalance.balance = currentBalance.balance - amount;
        await currentBalance.save();
        return currentBalance;
    }
    static async createCashRequest(req) {
        const data = this.mapCashRequestData(req);
        const cashRequest = await RequestModel.create(data);
        if (!cashRequest) {
            throw { code: 500, message: "Unable to create cash request" };
        }
        return cashRequest;
    }
    static async getCashRequests(req) {
        const loggedInUser = req.loggedInUser;
        if (!loggedInUser) {
            throw { code: 401, message: "Unauthorized" };
        }
        const cashRequests = await RequestModel.find().populate({
            path: "createdBy",
            select: "name email",
        });
        if (!cashRequests) {
            throw { code: 404, message: "No cash requests found" };
        }
        return cashRequests;
    }
    static async deleteSingleRowByFilter(filter) {
        try {
            const deleted = await RequestModel.findOneAndDelete(filter);
            return deleted;
        }
        catch (exception) {
            throw exception;
        }
    }
}
export default CashRequestService;
//# sourceMappingURL=CashRequestService.js.map