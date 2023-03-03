export class UsersHelper {
    static checkEmailValidity(email: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/g.test(email)
    }
}