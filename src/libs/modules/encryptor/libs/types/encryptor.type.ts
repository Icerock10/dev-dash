import { type EncryptedData } from './encrypted-data.type';
import { type EncryptionDataPayload } from './encryption-data-payload.type';

type Encryptor = {
    compare({ storedHash, value }: EncryptionDataPayload): Promise<boolean>;
    encrypt(value: string): Promise<EncryptedData>;
};

export { type Encryptor };
