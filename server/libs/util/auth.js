import crypto from 'crypto';

export const sha256 = (string) => {
  return crypto
    .createHash('sha256')
    .update(string)
    .digest('hex');
};
