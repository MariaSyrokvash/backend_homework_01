import request from 'supertest';
import {req} from './test-helpers'
import {setDB} from '../src/db/db'

import {CONFIG} from "../src/config";
import {app} from "../src/app";
import {HttpStatuses} from "../src/constants/httpStatusCode.constants";
import {CreateVideoInputModel, Resolutions} from "../src/types/video-types";


const getRequest = () => {
    return request(app);
}

const DefaultRouterPath = CONFIG.PATH.VIDEOS

const CLearPath = CONFIG.PATH.TEST


describe('/videos', () => {
    beforeAll(async () => {
        await getRequest().delete(CLearPath);
    })

    it('should get empty array', async () => {
        const res = await getRequest().get(DefaultRouterPath)
        expect(res.body.length).toBe(0)
    })

    it('should return an empty array with a 200 status, indicating success with no data.', async () => {
        await getRequest()
            .get(DefaultRouterPath)
            .expect(HttpStatuses.Ok200, [])
    })

    it('Should return 404 for not existing entity', async () => {
        await getRequest()
            .get(`${DefaultRouterPath}/999999`)
            .expect(HttpStatuses.NotFound404)
    })

    it(`Should create with correct input data`, async () => {
        const data: CreateVideoInputModel = {
            title: 'some title',
            author: 'some author',
            availableResolutions: [Resolutions.P144]
        };


    })



    // it('should get not empty array', async () => {
    //     setDB(dataset1)
    //
    //     const res = await req
    //         .get(CONFIG.PATH.VIDEOS)
    //         .expect(HttpStatuses.Ok200)
    //
    //     console.log(res.body)
    //
    //     expect(res.body.length).toBe(1)
    //     expect(res.body[0]).toEqual(dataset1.videos[0])
    // })

    // it('Should return 404 for not existing entity', async () => {
    //     await req
    //         .get(`${DefaultRouterPath}/999999`)
    //         .expect(HttpStatuses.NotFound404)
    // })


    // let createdEntity1: OutputVideoType | null = null;
    // it(`Should create and return with correct input data`, async () => {
    //     setDB()
    //     const newVideo: CreateVideoInputModel = {
    //                 title: 't1',
    //                 author: 'a1',
    //                 availableResolution: [Resolutions.P144]
    //             }
    //
    //     const response = await req
    //         .post(CONFIG.PATH.VIDEOS)
    //         .send(newVideo)
    //         .expect(HttpStatuses.Created201)
    //
    //     createdEntity1 = response.body;
    //
    //     console.log(createdEntity1, 'createdEntity1')
    //      const videos = await req
    //         .get(DefaultRouterPath)
    //          .expect(HttpStatuses.Ok200, [createdEntity1])
    //
    //     await req
    //         .get(`${DefaultRouterPath}/${createdEntity1?.id}`)
    //         .expect(HttpStatuses.Ok200, createdEntity1)
    // })
    //
    // let createdEntity2: OutputVideoType | null = null;
    // it(`Should create and return with incorrect input data`, async () => {
    //     setDB()
    //     const newVideo: CreateVideoInputModel = {
    //         title: 'some title',
    //         author: 'some author',
    //         availableResolution: [Resolutions.P144]
    //     }
    //
    //     const response = await req
    //         .post(CONFIG.PATH.VIDEOS)
    //         .send(newVideo)
    //         .expect(HttpStatuses.Created201)
    //
    //     createdEntity2 = response.body;
    //
    //     expect(createdEntity2).toEqual({
    //         ...createdEntity2,
    //         title: newVideo.title,
    //         author: newVideo.author,
    //         availableResolution: newVideo.availableResolution,
    //     })
    // })
    //

    // it('should create', async () => {
    //     setDB()
    //     const newVideo: InputVideoBodyType = {
    //         title: 't1',
    //         author: 'a1',
    //         availableResolution: [Resolutions.P144]
    //     }
    //
    //     const res = await req
    //         .post(CONFIG.PATH.VIDEOS)
    //         .send(newVideo) // отправка данных
    //         .expect(HttpStatuses.Created201)
    //
    //     expect(res.body.availableResolution).toEqual(newVideo.availableResolution)
    // })
    // it('shouldn\'t find', async () => {
    //     setDB(dataset1)
    //
    //     const res = await req
    //         .get(CONFIG.PATH.VIDEOS + '/1')
    //         .expect(HttpStatuses.NotFound404) // проверка на ошибку
    //
    //     console.log(res.body)
    // })
})
