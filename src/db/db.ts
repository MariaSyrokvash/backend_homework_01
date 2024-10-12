
import {OutputVideoType, Resolutions} from "../types/video-types";

export type DBType = {
    videos: OutputVideoType[]
}

const mockVideos: OutputVideoType[] = [
    {
        id: 1,
        title: "Exploring the Universe",
        author: "John Doe",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-10-01T14:00:00Z",
        publicationDate: "2023-10-02T12:00:00Z",
        availableResolution: [Resolutions.P360, Resolutions.P480, Resolutions.P720, Resolutions.P1080],
    },
    {
        id: 2,
        title: "JavaScript for Beginners",
        author: "Jane Smith",
        canBeDownloaded: false,
        minAgeRestriction: 12,
        createdAt: "2023-09-25T10:30:00Z",
        publicationDate: "2023-09-26T09:00:00Z",
        availableResolution: [Resolutions.P480, Resolutions.P720],
    },
    {
        id: 3,
        title: "Top 10 Travel Destinations",
        author: "Alice Johnson",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-08-15T08:00:00Z",
        publicationDate: "2023-08-16T10:00:00Z",
        availableResolution: [Resolutions.P144, Resolutions.P240, Resolutions.P360, Resolutions.P480],
    },
    {
        id: 4,
        title: "Advanced CSS Techniques",
        author: "Bob Williams",
        canBeDownloaded: false,
        minAgeRestriction: 16,
        createdAt: "2023-07-22T13:15:00Z",
        publicationDate: "2023-07-23T11:00:00Z",
        availableResolution: [Resolutions.P720, Resolutions.P1080, Resolutions.P1440],
    },
    {
        id: 5,
        title: "Cooking 101: Basics of Baking",
        author: "Chef Emma",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-10-05T16:45:00Z",
        publicationDate: "2023-10-06T09:30:00Z",
        availableResolution: [Resolutions.P360, Resolutions.P480],
    }
];

export const db: DBType = {
    videos: mockVideos,
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
}
