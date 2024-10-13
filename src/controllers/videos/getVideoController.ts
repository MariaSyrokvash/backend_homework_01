import {Request, Response} from 'express'

import {db} from '../../db/db'

import {OutputVideoType} from "../../types/video-types";

import {HttpStatuses} from "../../constants/httpStatusCode.constants";


//TODO: fix types
export const getVideoController = (req: Request<{ id: string}>, res: Response<{}, OutputVideoType[]>) => {
    const videoId = Number(req.params.id);

    const foundData = db.videos.find((item) => (
        item.id === videoId
    ));

    if (!foundData) {
        res.sendStatus(HttpStatuses.NotFound404);
        return;
    }

    res.status(HttpStatuses.Ok200).json(foundData);
}
