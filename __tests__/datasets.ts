import {DBType} from "../src/db/db";
import {OutputVideoType, Resolutions} from "../src/types/video-types";

export const video1: OutputVideoType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolution: [Resolutions.P240],
}


export const dataset1: DBType = {
    videos: [video1],
}
