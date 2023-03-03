import { UsersHelper } from "../helpers/UsersHelper";
import { AuthRepository } from "../repositories/AuthRepository"

export class AuthService {
    static async login(email: string, password: string, rememberMe: string): Promise<any>{

        if (!UsersHelper.checkEmailValidity(email)) return { msg: "Digite um email válido."}

        return await AuthRepository.login(email, password, rememberMe);

    }

    static async register(name: string, email: string, password: string): Promise<any>{

        if (!UsersHelper.checkEmailValidity(email)) return { msg: "Digite um email válido."}
        
        return await AuthRepository.register(name, email, password);

    }
}