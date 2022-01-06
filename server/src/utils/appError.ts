class AppError extends Error {
    public status: string;

    constructor(message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = this.statusCode.toString().startsWith('4') ? 'fail' : 'error'
    }
}

export default AppError;