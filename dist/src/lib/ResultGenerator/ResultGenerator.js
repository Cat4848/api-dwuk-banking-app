export class ResultGenerator {
    generateSuccess(data) {
        const success = {
            success: true,
            data: data
        };
        return success;
    }
    generateError(err) {
        let fail = {
            success: false,
            error: new Error("Unknown Error")
        };
        if (err instanceof Error) {
            fail.error = err;
        }
        return fail;
    }
}
