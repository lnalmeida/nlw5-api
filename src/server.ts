import express, { Request, Response } from 'express';

const app = express();

const port = process.env.PORT || 3333;


app.get('/', (req: Request, res: Response) => {
    return res.json({message: 'Hello NLW#5'});
});

app.post('/', (req: Request, res: Response) => {
    res.json({message: 'Post funcionando'})
});


app.listen(port, () => console.log(`Server listening on port ${port}`));