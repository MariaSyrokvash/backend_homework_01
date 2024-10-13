import {Router} from 'express'

import {getVideoController} from "./getVideoController";
import {getVideosController} from './getVideosController'
import {createVideoController} from "./createVideoController";
import {updateVideoController} from "./updateVideoController";
import {deleteVideoController} from "./deleteVideoController";


export const videosRouter = Router()

// GET
videosRouter.get('/', getVideosController)
videosRouter.get('/:id', getVideoController)

// POST
videosRouter.post('/', createVideoController)

// PUT
videosRouter.put('/:id', updateVideoController)

// DELETE
videosRouter.delete('/:id', deleteVideoController)


