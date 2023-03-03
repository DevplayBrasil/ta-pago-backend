export class Logger {

    static appLog(level: string, message: string) {
        switch (level) {
            case "log":
                console.log(message);
                break;
            case "error":
                console.error(message);
                break;
        }
    }

}