import {Router} from 'express'

import {deleteDataBaseController} from "./deleteDb";

export const testRouter = Router()

testRouter.delete('/', deleteDataBaseController)

