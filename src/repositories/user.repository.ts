import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";
import config from 'config';

const authenticationCryptKey = config.get<string>('authentication.cryptKey');

class UserRepository{

    async findAllUsers(): Promise<User[]>{
        const queryUsers = `
        SELECT uuid, username
        FROM application_users
        `;
        const {rows} = await db.query<User>(queryUsers);
        
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        try{
            const queryId = `SELECT uuid, username
            FROM application_users
            WHERE uuid = $1
            `;
            const valueId = [uuid];
    
            const {rows} = await db.query<User>(queryId, valueId);
            const [user] = rows;
    
            return user;
        } catch(error){
            throw new DatabaseError("Erro na consulta por ID", error);

        }
    }

    async createUser(user: User): Promise<string> {
        const createScript = `
        INSERT INTO application_users (username, password)
        VALUES ($1, crypt($2, '${authenticationCryptKey}'))
        RETURNING uuid
        `;
        const createValues = [user.username, user.password];
        
        const {rows} = await db.query<{uuid:string}>(createScript, createValues);
        const [newUser] = rows;

        return newUser.uuid;
    }

    async updateUser(user: User): Promise<void> {
        const updateScript = `
        UPDATE application_users
        SET username = $1, password = crypt($2, '${authenticationCryptKey}')
        WHERE uuid = $3
        RETURNING 
        `;
        const updateValues = [user.username, user.password, user.uuid];
        
        await db.query(updateScript, updateValues);
    }

    async removeUser(uuid: string): Promise<void>{
        const removeScript = `
        DELETE
        FROM application_users
        WHERE uuid = $1
        `;
        const removeValues = [uuid];

        await db.query(removeScript, removeValues);
    }
    
    async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
        try{
            const queryUserPass = `
            SELECT uuid, username
            FROM application_users
            WHERE username = $1
            AND password = crypt($2, '${authenticationCryptKey}')
            `;
            const queryUserPassValues = [username, password];
    
            const {rows} = await db.query<User>(queryUserPass, queryUserPassValues);
            const [user] = rows;
            return user || null;
        } catch(error){
            throw new DatabaseError("Erro na consulta por username e password", error);
        }

    }
    
}

export default new UserRepository();