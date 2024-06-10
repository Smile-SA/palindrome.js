class CustomLogger {
    constructor() {
    }
    /**
     * Logs message in developement environment only
     * @param {*} msg the message to print
     */
    log(msg) {
        if (process.env.NODE_ENV === 'development') {
            console.log(msg);
        }
    };
    /**
     * Logs a dir message in developement environment only
     * @param {*} msg the message to print
     */
    dir(msg) {
        if (process.env.NODE_ENV === 'development') {
            console.dir(msg);
        }
    };
    
    /**
     * Logs a warning in developement environment only
     * @param {*} msg the message to print
     */
    warn(msg) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(msg);
        }
    };

    /**
     * Logs an error message in developement environment only
     * @param {*} msg the message to print
     */
    error(msg) {
        if (process.env.NODE_ENV === 'development') {
            console.error(msg);
        }
    };

    /**
     * Logs an info message in developement environment only
     * @param {*} msg the message to print
     */
    info(msg) {
        if (process.env.NODE_ENV === 'development') {
            console.info(msg);
        }
    };
};

export const Logger = new CustomLogger();