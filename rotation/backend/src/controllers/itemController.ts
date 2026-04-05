import { addItem as addItemService } from "../services/itemservices.js";
import AppError from "../utils/apperror.js";

export async function addItem(req: any, res: any) {
    const missing = [];
    if (!req.body.name) missing.push("name");
    if (!req.body.description) missing.push("description");
    if (!req.body.price) missing.push("price");
    if (!req.body.category) missing.push("category");
    if (!req.brandName){
        throw new AppError("Brand name is required", 400);
    }


}