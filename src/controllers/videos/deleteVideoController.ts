import {Request, Response} from 'express'

import {db} from '../../db/db'

import {OutputVideoType} from "../../types/video-types";

import {HttpStatuses} from "../../constants/httpStatusCode.constants";


export const deleteVideoController = (req: Request<{ id: string}>, res: Response<{}, OutputVideoType[]>) => {
    const videoId = Number(req.params.id);

    const videoIndex = db.videos.findIndex((item) => item.id === videoId);

    if (videoIndex === -1) {
        res.sendStatus(HttpStatuses.NotFound404);
        return;
    }

    db.videos.splice(videoIndex, 1);
    res.sendStatus(HttpStatuses.NoContent204);
}


