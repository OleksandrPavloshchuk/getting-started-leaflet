import {SearchCenterRepository} from "../dataUpdate/createSearchCenter";
import {evict} from "../redisConnector";

export const insertSearchCenter = ( req, res) => {
    evict('searchCenter', '');
    SearchCenterRepository.create(req.body);
    res.status(201).json({ ok: true });
}
