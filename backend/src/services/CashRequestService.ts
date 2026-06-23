import RequestModel from "../model/cashRequestModel.ts";
import type { ICashRequest } from "../request/cash-request.ts";
import type { AuthRequest } from "../types/Request.ts";

class CashRequestService {
    static mapCashRequestData(req: AuthRequest): ICashRequest {
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
        return data as ICashRequest;
    }

    static mapCashRequestForUpdateModel(req: AuthRequest, _cashRequestDetail: unknown) {
        return {
            status: req.body.status,
        };
    }

    static async getSingleRowByFilter(filter: Record<string, unknown>) {
        return await RequestModel.findOne(filter);
    }

    static async updateSingleRowByFilter(
        filter: Record<string, unknown>,
        mappedData: Record<string, unknown>,
    ) {
        try {
            const update = await RequestModel.findOneAndUpdate(filter, mappedData, {
                new: true,
                runValidators: true,
            });
            return update;
        } catch (exception) {
            throw exception;
        }
    }

    static async createCashRequest(req: AuthRequest) {
        const data = this.mapCashRequestData(req);
        const cashRequest = await RequestModel.create(data);
        if (!cashRequest) {
            throw { code: 500, message: "Unable to create cash request" };
        }
        return cashRequest;
    }

    static async getCashRequests(req: AuthRequest) {
        const loggedInUser = req.loggedInUser;
        if (!loggedInUser) {
            throw { code: 401, message: "Unauthorized" };
        }
        const cashRequests = await RequestModel.find();
        if (!cashRequests) {
            throw { code: 404, message: "No cash requests found" };
        }
        return cashRequests;
    }

    static async deleteSingleRowByFilter(filter: Record<string, unknown>) {
        try {
            const deleted = await RequestModel.findOneAndDelete(filter);
            return deleted;
    } catch (exception) {
            throw exception;
        }
    }
}
export default CashRequestService;
