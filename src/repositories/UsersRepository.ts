import { prisma } from "../database/db";
import bcrypt from "bcryptjs";

export class UsersRepository {
    static async create(name: string, password: string, email: string,) {
        
        await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 8)
            }
        });
        
    }
}