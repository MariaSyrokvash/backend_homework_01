import express from 'express'
import cors from 'cors'

import {CONFIG} from "./config";

import {testRouter} from "./controllers/test";
import {videosRouter} from "./controllers/videos";

export const app = express() // создать приложение

app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})

app.use(CONFIG.PATH.VIDEOS, videosRouter)
app.use(CONFIG.PATH.TEST, testRouter)
