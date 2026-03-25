import { BaseEncryptor } from './base-encryptor.module';

const SALT_SIZE = 10;

const encryptor = new BaseEncryptor({ saltSize: SALT_SIZE });

export { encryptor };
