import {Request, Response} from 'express'

import {db} from '../../db/db'

import {ErrorMessages} from "../../constants/errorMessage.constants";
import {HttpStatuses} from "../../constants/httpStatusCode.constants";
import {
    MaxAgeRestriction,
    MaxLengthVideoAuthor,
    MaxLengthVideoTitle,
    MinAgeRestriction
} from "../../constants/validate.constants";

import {OutputErrorsType} from "../../types/output-errors-type";
import {OutputVideoType, Resolutions, UpdateVideoInputModel} from "../../types/video-types";


const inputValidation = (video: UpdateVideoInputModel) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
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

    if (video.availableResolutions !== null) { // Проверяем, что поле не null
        if (!video.availableResolutions || video.availableResolutions.length === 0) {
            errors.errorsMessages.push({
                message: 'At least one resolution should be added', field: 'availableResolutions'
            });
        } else {
            const invalidResolutions = video.availableResolutions.filter(resolution =>
                !Object.values(Resolutions).includes(resolution)
            );

            if (invalidResolutions.length > 0) {
                errors.errorsMessages.push({
                    message: `Invalid resolutions: ${invalidResolutions.join(', ')}`, field: 'availableResolutions'
                });
            }
        }
    }

    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'canBeDownloaded must be a boolean value.', field: 'canBeDownloaded'
        });
    }

    if (video.minAgeRestriction !== null) {
        if (typeof video.minAgeRestriction !== 'number' || video.minAgeRestriction < MinAgeRestriction || video.minAgeRestriction > MaxAgeRestriction) {
            errors.errorsMessages.push({
                message: 'minAgeRestriction must be a number between 1 and 18, or null for no restriction.', field: 'minAgeRestriction'
            });
        }
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/; // Простая проверка на ISO формат даты
    if (video.publicationDate && !datePattern.test(video.publicationDate)) {
        errors.errorsMessages.push({
            message: 'publicationDate must be a valid ISO date-time string.', field: 'publicationDate'
        });
    }

    return errors
}

export const updateVideoController = (req: Request<any, any, UpdateVideoInputModel>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res.status(HttpStatuses.BadRequest400).json(errors)
        return
    }

    const videoId = Number(req.params.id);

    const videoIndex = db.videos.findIndex(video => video.id === videoId);

    if (videoIndex === -1) {
        res.status(HttpStatuses.NotFound404).json({
            errorsMessages: [{
                message: 'Video not found',
                field: 'id'
            }]
        });
        return;
    }

    db.videos[videoIndex] = {
        ...db.videos[videoIndex],
        ...req.body,
        createdAt: db.videos[videoIndex].createdAt,
    };

    res.sendStatus(HttpStatuses.NoContent204)
}
