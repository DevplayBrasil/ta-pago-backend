import { UsersRepository } from "../repositories/UsersRepository"

export class UsersService {
    static async create(name: string) {

        if (name.length < 8) {
            return { success: false, msg: "O nome do usuário precisa ter no mínimo 8 dígitos"}
        }

        // várias regras de negócio

        await UsersRepository.create(name);

    }
}