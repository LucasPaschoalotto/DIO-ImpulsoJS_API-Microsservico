import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const users = [{ userName: "Lucas"}];

const userRoute = Router();

userRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send(users);
});

userRoute.get("/users/:uid", (req: Request<{ uid: string }>, res: Response, next: NextFunction) => {
    const uid = req.params.uid;
    res.status(StatusCodes.OK).send({uid});
});

userRoute.post("/users", (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    console.log(req.body);
    res.status(StatusCodes.CREATED).send(newUser);
});

userRoute.put("/users/:uid", (req: Request<{ uid: string}>, res: Response, next: NextFunction) => {
    const uid = req.params.uid;
    const modUser = req.body;
    modUser.uid = uid;
    res.status(StatusCodes.OK).send({modUser});
});

userRoute.delete("/users/:uid", (req: Request<{ uid: string}>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default userRoute;