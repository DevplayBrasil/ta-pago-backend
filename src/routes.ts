import { Application, NextFunction, Request, Response } from "express";
import { Router } from "./helpers/Router";
import { AuthController } from "./controllers/AuthController";
import { HomeController } from "./controllers/HomeController";

export function setupRoutes(app: Application) {
    const router = new Router(app);

    // router.group("/api", (router) => {
    //     router.group("/v1", (router) => {
    //         router.get("/", (req, res) => {
    //             return { status: "ok", message: "Working!" };
    //         });
    //     });        
    // });

    const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) { return next() }
        return res.status(401).send('Não autorizado');
        // return res.redirect("/login");
    }

    router.get("/login", (req: Request, res: Response) => {
        res.status(200).send("Você está na tela de login!");
    })


    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);

    
    app.get("/", checkAuthenticated, HomeController.home)
    app.get("/teste", checkAuthenticated, (req: Request, res: Response) => {
        return res.status(200).send({ "msg": "Você está testando!" });
    })

    router.get("*", (req, res, next) => {
        res.status(404).send('Desculpe, esta rota não existe.');
    });
    




    // router.post("/login", passport.authenticate('local', {            
    //     successRedirect: '/',
    //     failureRedirect: '/',
    // }));




    // router.group("/users", (router) => {
    //     router.get("/", UsersController.index);
    //     router.get("/:id", UsersController.show);
    //     router.post("/", UsersController.create);
    //     router.put("/:id", UsersController.update);
    //     router.delete("/:id", UsersController.delete);
    // });



}
