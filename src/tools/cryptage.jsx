export async function encryptCommeUnCoquin(dataToEncrypt, secretKey = "6CftDsIcI+ifb6hGgDCVc4jxbcGtcbKc1XRQ4CPg3aJOXk8WY2bBpIBiVKTiYgFg") {
    try {
        const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(secretKey.padEnd(32, '0').substring(0, 32)),
            { name: "AES-GCM" },
            false,
            ["encrypt"]
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));

        const encrypted = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            new TextEncoder().encode(dataToEncrypt)
        );

        const combined = new Uint8Array(iv.length + encrypted.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encrypted), iv.length);

        const encryptedBase64 = btoa(String.fromCharCode.apply(null, combined));

        return encryptedBase64;

    } catch (error) {
        console.error('Erreur de cryptage:', error);
        return null;
    }
}

export async function decryptCommeUnManCool(encryptedData, secretKey = "6CftDsIcI+ifb6hGgDCVc4jxbcGtcbKc1XRQ4CPg3aJOXk8WY2bBpIBiVKTiYgFg") {
    try {
        console.log("encryptedData", encryptedData)
        const combined = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)));

        const iv = combined.slice(0, 12);
        const encrypted = combined.slice(12);

        const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(secretKey.padEnd(32, '0').substring(0, 32)),
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encrypted
        );

        const decryptedString = new TextDecoder().decode(decrypted);
        return decryptedString;

    } catch (error) {
        console.error('Erreur de décryptage:', error);
        return null;
    }
}