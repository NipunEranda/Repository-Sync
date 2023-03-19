

// notification example (different from mantine notification)
export function notify(title, body) {
    new Notification(title, { body: body || "", });
}

export function encrypt(data, password) {
    return encryptText(password, data);
}

export function decrypt(data, password) {
    return decryptText(password, data);
}

function encryptText(salt, text) {
    try {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text
            .split("")
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join("");
    } catch (e) {
        console.log(e);
        return null;
    }
};

function decryptText(salt, encoded) {
    try {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join("");
    } catch (e) {
        console.log(e);
        return null;
    }
};