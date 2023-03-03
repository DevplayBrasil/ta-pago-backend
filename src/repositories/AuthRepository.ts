import { prisma } from "../database/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export class AuthRepository {
    static async login(email: string, password: string, rememberMe: string): Promise<any> {

        const response = {
            status: 400,
            message: "",
            token: ""
        }

        await prisma.user.findFirst({ where: { email } }).then(user => {

            if (!user) {
                response.message = "Usuário não encontrado.";
                return response;
            }

            if (!bcrypt.compareSync(password, user.password)) {
                response.status = 401;
                response.message = "Senha incorreta.";
                return response;
            }

            const payload = {
                username: user.name,
                id: user.id
            }
            
            const token = jwt.sign(payload, "Random string", { expiresIn: rememberMe ? "9999 years" : "1d" });

            const decodedToken = jwt.decode(token) as {exp: number}
            let tokenExpirationDate: any = decodedToken.exp * 1000;
            tokenExpirationDate = new Date(tokenExpirationDate);

            response.status = 200;
            response.message = `Login feito com sucesso. Sua token expira em: ${tokenExpirationDate}`;
            response.token = `Bearer ${token}`;

        });

        return response;

    }

    static async register(name: string, email: string, password: string) {
        const response = {
            status: 400,
            message: "",
        }

        const findUserByEmail = await prisma.user.findFirst({ where: { email } });

        if (findUserByEmail) {
            response.message = "Já existe um usuário cadastrado com o email informado.";
            return response;
        }

        await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password)
            }
        })

        response.status = 200;
        response.message = "Usuário criado com sucesso";
        return response;
    }
}