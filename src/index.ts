import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000

interface Videos {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

const resolutions: string[] = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ]

const videos: Videos[] = [
    // {
    //     // id: 0,
    //     // title: "string",
    //     // author: "string",
    //     // canBeDownloaded: true,
    //     // minAgeRestriction: null,
    //     // createdAt: "2022-09-22T15:29:44.324Z",
    //     // publicationDate: "2022-09-22T15:29:44.324Z",
    //     // availableResolutions: [
    //     //     "P144"
    //     // ]
    // }
];


app.delete('/testing/all-data', (req: Request, res: Response) => {
    const videosNUll: Array<object> = []
    res.sendStatus(204).json(videosNUll)
})

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
});

app.post('/videos', (req: Request, res: Response) => {
    const errorArrayPost: Array<object> = []
    const newTitle = req.body.title;
    if (newTitle == null) {
        errorArrayPost.push({
            message: "Title has incorrect",
            field: "title"
        })
    }

    if (newTitle.length > 40) {
        errorArrayPost.push({
            message: "Title has incorrect length",
            field: "title"
        })
    }

    if (typeof newTitle !== "string") {
        errorArrayPost.push({
            message: "Title has incorrect string",
            field: "title"
        })
    }

    const newAuthor = req.body.author
    if (newAuthor == null) {
        errorArrayPost.push({
            message: "Author has incorrect",
            field: "author"
        })
        return
    }

    if (newAuthor.length > 20) {
        errorArrayPost.push({
            message: "Author has incorrect length",
            field: "author"
        })
    }

    if (typeof newAuthor !== "string") {
        errorArrayPost.push({
            message: "Author has incorrect value",
            field: "author"
        })
    }

    const newAvailableResolutions: string[] = req.body.availableResolutions
    //const canBeDownloaded = req.body.canBeDownloaded
    // function test(resolutions: string[], availableResolutions: string[]) {
    //     return newAvailableResolutions.every(item => resolutions.includes(item))
    // }
    if (!newAvailableResolutions.every(item => resolutions.includes(item))) {
        errorArrayPost.push({
            message: "AvailableResolutions has incorrect value",
            field: "AvailableResolutions"
        })
    }

    if (errorArrayPost.length !== 0) {
       res.status(400).send({
            errorsMessages: errorArrayPost
        })
        return;
    }

    const today = new Date()
    today.setDate(today.getDate() - 1)
    const newVideo: Videos = {
        id: +new Date(),
        title: newTitle,
        author: newAuthor,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: today.toISOString(),
        publicationDate: (new Date).toISOString(),
        availableResolutions: newAvailableResolutions
    }

    // @ts-ignore
    videos.push(newVideo)
    res.status(201).send(newVideo)
});

app.get('/videos/:id', (req: Request, res: Response) => {
    // @ts-ignore
    const video = videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.sendStatus(404)
    }
    res.status(200).json(video)
});

app.delete('/videos/:id',(req: Request, res: Response) => {
    const id = +req.params.id;
    // @ts-ignore
    const findVideoId = videos.findIndex(v => v.id === id)
    if (findVideoId === -1) {
        res.sendStatus(404)
    }
    videos.splice(findVideoId, 1);
    res.sendStatus(204);
});

app.put('/videos/:id',(req: Request, res: Response) => {
    const errorArrayPut: Array<object> = []
    const newTitle = req.body.title;
    const newAuthor = req.body.author;
    const id = +req.params.id;
    // @ts-ignore
    const video: object | undefined = videos.find(v => v.id === id)
    if (!video) {
        res.sendStatus(404)
    }

    if (!newTitle) {
        errorArrayPut.push({
            message: 'Title is required',
            field: 'title',
        })
    }

    if (newTitle.length > 40) {
        errorArrayPut.push({
            message: "Title has incorrect length value",
            field: "title"
        })
    }

    if (typeof newTitle !== "string") {
        errorArrayPut.push({
            message: "Title has incorrect value",
            field: "title"
        })
    }

    if (!newAuthor) {
        errorArrayPut.push({
            message: 'Author is required',
            field: 'author'
        })
    }

    if (newAuthor.length > 20) {
        errorArrayPut.push({
            message: "Author has incorrect length value",
            field: "author"
        })
    }

    if (typeof newAuthor !== "string") {
        errorArrayPut.push({
            message: "Author has incorrect value",
            field: "author"
        })
    }
    const newAvailableResolutions: string[] = req.body.availableResolutions
    //const canBeDownloaded = req.body.canBeDownloaded
    // function test(resolutions: string[], availableResolutions: string[]) {
    //     return newAvailableResolutions.every(item => resolutions.includes(item))
    // }
    if (!newAvailableResolutions.every(item => resolutions.includes(item))) {
        errorArrayPut.push({
            message: "AvailableResolutions has incorrect value",
            field: "AvailableResolutions"
        })
    }

    !video && res.sendStatus(404)

    if (errorArrayPut.length !== 0) {
        res.status(400).send({
            errorsMessages: errorArrayPut
        })
        return;
    }

    // @ts-ignore
    video.title = req.body.title
    // @ts-ignore
    video.author = req.body.author
    // @ts-ignore
    video.availableResolutions = newAvailableResolutions
    res.status(204).send(video)
    // @ts-ignore
    video.canBeDownloaded = req.body.canBeDownloaded
    // @ts-ignore
    video.minAgeRestriction = req.body.minAgeRestriction
    // @ts-ignore
    video.publicationDate = req.body.publicationDate
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});

