interface IGenericAppError {
    message: string;
}

export default abstract class GenericAppError implements IGenericAppError {
    public readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
}
