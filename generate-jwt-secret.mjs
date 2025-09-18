/**
 * JWT Secret Key Generator
 * Run this script to generate secure JWT secret keys
 *
 * Usage: node generate-jwt-secret.js
 */

import crypto from 'crypto';

function generateJWTSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

function generateBase64Secret(length = 64) {
  return crypto.randomBytes(length).toString('base64');
}

console.log('🔐 JWT Secret Key Generator\n');

console.log('📋 Copy one of these keys to your .env.local file:\n');

console.log('🔑 Hex Format (Recommended):');
console.log(`JWT_SECRET_KEY=${generateJWTSecret()}\n`);

console.log('🔑 Base64 Format:');
console.log(`JWT_SECRET_KEY=${generateBase64Secret()}\n`);

console.log('🔑 Alternative Hex Key:');
console.log(`JWT_SECRET_KEY=${generateJWTSecret()}\n`);

console.log('💡 Tips:');
console.log('- Use a different key for production');
console.log(
  '- Keep your secret key secure and never commit it to version control',
);
console.log(
  '- The longer the key, the more secure it is (64+ characters recommended)',
);
console.log(
  '- You can also use online generators like: https://generate-secret.vercel.app/64',
);
