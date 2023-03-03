import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from "bcryptjs";
import { prisma } from '../database/db';
const LocalStrategy = passportLocal.Strategy;


passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {

    let user = await prisma.user.findFirst({
        where: {
            id
        }
    });

    if (!user) {
        done(new Error('Failed to deserialize'));
    }

    done(null, user);
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        console.log("eita");
        
        prisma.user.findFirst({ where: { email }})
            .then(user => {
                
                if (!user) {
                    return done(null, false, { message: "Usuário não encontrado" });
                } else {
                    
                    if (bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Senha incorreta" });
                    }
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);