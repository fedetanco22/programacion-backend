class AppErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AppErrors';
    }
}

export { AppErrors };

