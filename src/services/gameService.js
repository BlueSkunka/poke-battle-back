export default async function generateJoiningCode(gameId) {
    return generateRandomString();
}

function generateRandomString() {
    const inOptions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let outString = '';

    for (let i = 0; i < 8; i++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
}