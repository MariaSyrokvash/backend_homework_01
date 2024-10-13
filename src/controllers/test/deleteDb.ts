import {Request, Response} from "express";

import {setDB} from "../../db/db";

import {HttpStatuses} from "../../constants/httpStatusCode.constants";

export const deleteDataBaseController = (req: Request, res: Response) => {
    setDB();
    res.sendStatus(HttpStatuses.NoContent204);
}
