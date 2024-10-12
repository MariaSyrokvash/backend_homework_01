import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from "./createVideoController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
// videosRouter.get('/:id', findVideoController)
// videosRouter.delete('/:id', deleteVideoController)
// ...
