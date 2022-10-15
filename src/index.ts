import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const videos = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-09-22T15:29:44.324Z",
        publicationDate: "2022-09-22T15:29:44.324Z",
        availableResolutions: [
            "P144"
        ]
    }
];

app.delete('/testing/all-data', (req: Request, res: Response) => {
    const videosNUll: Array<object> = []
    res.sendStatus(204).json(videosNUll)
})

app.get('/videos', (req: Request, res: Response) => {
    res.sendStatus(200).json(videos)
}) ;


app.post('/videos', (req: Request, res: Response) => {
    const newTitle = req.body.title;
    if (!newTitle) {
        res.status(400).json({
            'errorsMessages': [
                {
                    message: 'Title is required',
                    field: 'title'
                }
            ]
        })
        return;
    }

    if (newTitle.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Title has incorrect length value",
                    field: "title"
                }
            ]
        })
        return;
    }

    if (typeof newTitle !== "string") {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Title has incorrect value",
                    field: "title"
                }
            ]
        })
    }
    const newAuthor = req.body.author
    if (!newAuthor) {
        res.status(400).json({
            'errorsMessages': [
                {
                    message: 'Author is required',
                    field: 'author'
                }
            ]
        })
        return;
    }

    if (newTitle.length > 20) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Author has incorrect length value",
                    field: "author"
                }
            ]
        })
        return;
    }

    if (typeof newAuthor !== "string") {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Author has incorrect value",
                    field: "author"
                }
            ]
        })
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
    const video = videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(200).json(video)
});

app.delete('/videos/:id',(req: Request, res: Response) => {
    const id = +req.params.id;
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
    const video: {id: number, title: string, author: string} | undefined = videos.find(v => v.id === id)

    if(!newTitle) {
        res.status(400).json({
            errorsMessages: [
                {
                    message: 'Title is required',
                    field: 'title'
                }
            ]
        })
        return;
    }
    if (newTitle.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Title has incorrect length value",
                    field: "title"
                }
            ]
        })
        return;
    }
    if (typeof newTitle !== "string") {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Title has incorrect value",
                    field: "title"
                }
            ]
        })
        return;
    }

    if (!newAuthor) {
        res.status(400).json({
            'errorsMessages': [
                {
                    message: 'Author is required',
                    field: 'author'
                }
            ]
        })
        return;
    }

    if (newTitle.length > 20) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Author has incorrect length value",
                    field: "author"
                }
            ]
        })
        return;
    }

    if (typeof newAuthor !== "string") {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "Author has incorrect value",
                    field: "author"
                }
            ]
        })
    }

    !video && res.sendStatus(404)

    // @ts-ignore
    video.title = req.body.title
    res.sendStatus(204)
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});

