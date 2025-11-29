import {SearchCenterRepository} from "../dataUpdate/createSearchCenter";

export const insertSearchCenter = ( req, res) => {
    SearchCenterRepository.create(req.body);
    res.status(201).json({ ok: true });
}
