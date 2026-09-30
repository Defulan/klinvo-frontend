export const getErrorDetails = (error) => {
    const message = error.response?.data?.detail;

    if (Array.isArray(message)) {
        const formattedMessage = message[0].msg;
        return formattedMessage;
    } else return message;
}