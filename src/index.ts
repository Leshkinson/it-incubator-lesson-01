import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
];

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
}) ;

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.findIndex(v => v.id === id)
    if (video === -1) {
        res.sendStatus(404)
    } else {
        res.json(videos.video)
    }
});

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.sendStatus(201)
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
    const id = +req.params.id;
    const video: {id: number, title: string, author: string} | undefined = videos.find(v => v.id === id)
    if(!req.body.title) {
        res.sendStatus(400).json({
            'errorsMessages': [
                {
                    message: 'Title is required',
                    field: 'title'
                }
            ],
            resultCode: 1
        })
    }

    if (!video) {
        res.sendStatus(404)
    }
    // @ts-ignore
    video.title = req.body.title
    res.sendStatus(204)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

