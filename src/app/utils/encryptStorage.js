let encryptStorage;

if (typeof window !== 'undefined') {
    const {EncryptStorage} = require('encrypt-storage');
    encryptStorage = new EncryptStorage(process.env.NEXT_PUBLIC_ENCRYPT_SECRET, {
        storageType: 'localStorage',
    });
}

export {encryptStorage};
