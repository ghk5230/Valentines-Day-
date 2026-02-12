import { createHash, randomBytes } from 'crypto';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter your secret passphrase: ', (passphrase) => {
  const hash = createHash('sha256').update(passphrase.trim()).digest('hex');
  const token = randomBytes(32).toString('hex');

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║   Add these lines to your .env.local file:       ║');
  console.log('╚══════════════════════════════════════════════════╝\n');
  console.log(`VALENTINE_PASS_HASH=${hash}`);
  console.log(`VALENTINE_AUTH_TOKEN=${token}`);
  console.log('\n─────────────────────────────────────────────────────');
  console.log('Your passphrase:', passphrase.trim());
  console.log('─────────────────────────────────────────────────────\n');

  rl.close();
});
