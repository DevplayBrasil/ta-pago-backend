import { Request, Response } from "express";


export class HomeController {

    static async home (req: Request, res: Response) {
        if (!req.isAuthenticated()) {
            return res.send("Você não tem permissão para acessar esta página");
        }
        return res.send("Você está na página principal");
    }

}