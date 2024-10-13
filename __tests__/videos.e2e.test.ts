import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1} from './datasets'
import {CONFIG} from "../src/config";
import {InputVideoBodyType, Resolutions} from "../src/types/video-types";
import {HttpStatuses} from "../src/constants/httpStatusCode.constants";

describe('/videos', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })

    it('should get empty array', async () => {
        // setDB() // очистка базы данных если нужно

        const res = await req
            .get(CONFIG.PATH.VIDEOS)
            .expect(HttpStatuses.Ok200) // проверяем наличие эндпоинта

        console.log(res.body) // можно посмотреть ответ эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })
    it('should get not empty array', async () => {
        setDB(dataset1) // заполнение базы данных начальными данными если нужно

        const res = await req
            .get(CONFIG.PATH.VIDEOS)
            .expect(HttpStatuses.Ok200)

        console.log(res.body)

        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    it('should create', async () => {
        setDB()
        const newVideo: InputVideoBodyType = {
            title: 't1',
            author: 'a1',
            availableResolution: [Resolutions.P144]
        }

        const res = await req
            .post(CONFIG.PATH.VIDEOS)
            .send(newVideo) // отправка данных
            .expect(HttpStatuses.Created201)

        console.log(res.body)

        expect(res.body.availableResolution).toEqual(newVideo.availableResolution)
    })
    it('shouldn\'t find', async () => {
        setDB(dataset1)

        const res = await req
            .get(CONFIG.PATH.VIDEOS + '/1')
            .expect(HttpStatuses.NotFound404) // проверка на ошибку

        console.log(res.body)
    })
})
