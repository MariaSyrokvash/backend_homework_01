import {Request, Response} from 'express'

import {db} from '../db/db'

import {OutputVideoType} from "../types/video-types";

import {HttpStatuses} from "../constants/httpStatusCode.constants";

export const getVideosController = (_: Request, res: Response<{}, OutputVideoType[]>) => {
    const videos = db.videos

    res
        .status(HttpStatuses.Ok200)
        .json(videos)
}
