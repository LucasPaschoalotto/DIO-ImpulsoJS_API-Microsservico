import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

//GET
usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

//GET by ID
usersRoute.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
    
        const userId = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send({userId});
    } catch(error){
        next(error);
    }
});

//POST-INSERT
usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await userRepository.createUser(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
});

//PUT-UPDATE by ID
usersRoute.put("/users/:uuid", async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modUser = req.body;
    modUser.uuid = uuid;

    await userRepository.updateUser(modUser);
    res.status(StatusCodes.OK).send();
});

//DELETE by ID
usersRoute.delete("/users/:uuid", async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    await userRepository.removeUser(uuid);
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;