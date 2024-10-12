import {Router} from 'express'

import {getVideoController} from "./getVideoController";
import {getVideosController} from './getVideosController'
import {createVideoController} from "./createVideoController";


export const videosRouter = Router()

// GET
videosRouter.get('/', getVideosController)
videosRouter.get('/:id', getVideoController)

// POST
videosRouter.post('/', createVideoController)

// PUT

// DELETE
// videosRouter.delete('/:id', deleteVideoController)

