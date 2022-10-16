import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const videos: Array<object> = [
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

const errorArray: Array<object> = []

app.delete('/testing/all-data', (req: Request, res: Response) => {
    const videosNUll: Array<object> = []
    res.sendStatus(204).json(videosNUll)
})

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
    return
}) ;


app.post('/videos', (req: Request, res: Response) => {

    const newTitle = req.body.title;
    if (!newTitle) {
        errorArray.push({
            message: 'Title is required',
            field: 'title',
        })
        res.status(400).send({
            errorsMessages: errorArray
        })
        return
    }

    if (newTitle.length > 40) {
        errorArray.push({
            message: "Title has incorrect length value",
            field: "title"
        })
    }

    if (typeof newTitle !== "string") {
        errorArray.push({
            message: "Title has incorrect value",
            field: "title"
        })
    }

    const newAuthor = req.body.author
    if (newAuthor == null) {
        errorArray.push({
            message: 'Author is required',
            field: 'author'
        })
    }

    if (newAuthor.length > 20) {
        errorArray.push({
            message: "Author has incorrect length value",
            field: "author"
        })
    }

    if (typeof newAuthor !== "string") {
        errorArray.push({
            message: "Author has incorrect value",
            field: "author"
        })
    }

    if (errorArray.length !== 0) {
        res.status(400).send({
            errorsMessages: errorArray
        })
        return
    }

    const newVideo = {
        id: +(new Date()),
        title: newTitle,
        author: newAuthor,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: (new Date).toISOString(),
        publicationDate: (new Date).toISOString(),
        availableResolutions: [
            "P144"
        ]
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
    res.sendStatus(200).json(video)
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
    const newTitle = req.body.title;
    const newAuthor = req.body.author;
    const id = +req.params.id;
    // @ts-ignore
    const video: object | undefined = videos.find(v => v.id === id)
    if (!video) {
        res.sendStatus(404)
    }

    if (!newTitle) {
        errorArray.push({
            message: 'Title is required',
            field: 'title',
        })
    }

    if (newTitle.length > 40) {
        errorArray.push({
            message: "Title has incorrect length value",
            field: "title"
        })
    }

    if (typeof newTitle !== "string") {
        errorArray.push({
            message: "Title has incorrect value",
            field: "title"
        })
    }

    if (!newAuthor) {
        errorArray.push({
            message: 'Author is required',
            field: 'author'
        })
    }

    if (newAuthor.length > 20) {
        errorArray.push({
            message: "Author has incorrect length value",
            field: "author"
        })
    }

    if (typeof newAuthor !== "string") {
        errorArray.push({
            message: "Author has incorrect value",
            field: "author"
        })
    }

    !video && res.sendStatus(404)

    // @ts-ignore
    video.title = req.body.title
    // @ts-ignore
    video.author = req.body.author
    res.status(204).send(video)
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});

