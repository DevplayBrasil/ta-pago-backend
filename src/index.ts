import { prisma } from "./database/db";
import { Logger } from "./helpers/Logger";
// import { hashSync, compareSync } from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { setupRoutes } from "./routes";
import express, { Application, NextFunction, Request, Response } from "express";
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
config();

async function main() {

    try {
        const app: Application = express();

        app.use(express.urlencoded({ extended: false }));
        app.use(cors());
        app.use(express.json());

        //Google Authentication
        const GoogleStrategy = require('passport-google-oauth2').Strategy;
        const MicrosoftStrategy = require('passport-microsoft').Strategy;

        //Middleware
        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }));

        app.use(passport.initialize())
        app.use(passport.session())

        const authUser = (request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
            return done(null, profile);
        }

        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback: true
        }, authUser));

        passport.use(new MicrosoftStrategy({
            clientID: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/microsoft/callback",
            scope: ['user.read'],
            tenant: 'common',
            authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        }, function (accessToken: any, refreshToken: any, profile: any, done: any) {
            return done(null, profile);
            // Aqui você pode verificar se as credenciais do usuário são válidas,
            // criar ou atualizar um registro de usuário em seu banco de dados e chamar done(null, user).
            // Se as credenciais não forem válidas, chame done(null, false).
        }
        ));



        passport.serializeUser((user, done) => {
            // console.log(`\n--------> Serialize User:`)
            // console.log(user)
            // The USER object is the "authenticated user" from the done() in authUser function.
            // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

            done(null, user)
        })

        passport.deserializeUser((user, done) => {
            // console.log("\n--------- Deserialized User:")
            // console.log(user)
            // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
            // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

            done(null, user!)
        })

        // app.use(
        //     session({
        //         secret: process.env.SECRET_KEY!,
        //         resave: false,
        //         saveUninitialized: false,
        //         cookie: {
        //             maxAge: 1000 * 60 * 60 * 24,
        //         },
        //     })
        // );

        // app.use(passport.initialize());        
        // app.use(passport.session());


        app.get('/auth/google',
            passport.authenticate('google', {
                scope:
                    ['email', 'profile']
            }
            ));

        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/',
                failureRedirect: '/login'
            }));

        app.get('/auth/microsoft',
            passport.authenticate('microsoft', {
                prompt: 'select_account',
            }));

        app.get('/auth/microsoft/callback',
            passport.authenticate('microsoft', { failureRedirect: '/login' }),
            function (req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            });

        // require("./strategy/local");

        setupRoutes(app);

        await prisma.$connect();
        Logger.appLog('log', `😄 Conectado com sucesso à base de dados!`);

        app.listen(3000, () => {
            Logger.appLog("log", "😄 Aplicação rodando na porta 3000");
        });

    } catch (error: any) {
        Logger.appLog('error', `😕 Houve um erro ao conectar à base de dados.`);
        Logger.appLog('error', error)
    }

}

main().catch((error: string) => {
    console.error("Error!");
    console.log(error);
});