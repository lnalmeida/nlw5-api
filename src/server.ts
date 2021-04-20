import express, { Request, Response } from 'express';

const app = express();

const port = process.env.PORT || 3333;


app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello NLW#5!</h1>');
});



app.listen(port, () => console.log(`Server listening on port ${port}`));