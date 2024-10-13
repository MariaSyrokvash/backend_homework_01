import {Request, Response} from 'express'

import {db} from '../../db/db'

import {ErrorMessages} from "../../constants/errorMessage.constants";
import {HttpStatuses} from "../../constants/httpStatusCode.constants";
import {MaxLengthVideoAuthor, MaxLengthVideoTitle} from "../../constants/validate.constants";

import {OutputErrorsType} from "../../types/output-errors-type";
import {CreateVideoInputModel, OutputVideoType, Resolutions} from "../../types/video-types";


const inputValidation = (video: CreateVideoInputModel) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(r => !Resolutions[r])) {
        errors.errorsMessages.push({
            message: ErrorMessages.UnknownError, field: 'availableResolution'
        })
    }

    if (!video.title || !video.title.trim() || video.title.length > MaxLengthVideoTitle) {
        errors.errorsMessages.push({
            message: ErrorMessages.UnknownError, field: 'title'
        })
    }

    if (!video.author || !video.author.trim() || video.author.length > MaxLengthVideoAuthor) {
        errors.errorsMessages.push({
            message: ErrorMessages.UnknownError, field: 'author'
        })
    }

    return errors
}

export const createVideoController = (req: Request<any, any, CreateVideoInputModel>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(HttpStatuses.BadRequest400).json(errors)

        console.log(errors, 'errors')
        return
    }

    const currentDate = new Date();
    const publicationDate = new Date(currentDate);

    publicationDate.setDate(publicationDate.getDate() + 1);

    const newVideo: OutputVideoType = {
        ...req.body,
        id: Date.now(),
        canBeDownloaded: false, // Default value
        minAgeRestriction: null, //  Default value
        createdAt: currentDate.toISOString(),
        publicationDate: publicationDate.toISOString(),
    }

    console.log(newVideo, 'newVideo')

    db.videos = [...db.videos, newVideo]

    console.log(db.videos, 'db.videos')

    res.status(HttpStatuses.Created201).json(newVideo)
}
