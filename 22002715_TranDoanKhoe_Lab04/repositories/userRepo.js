const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

// Seed two users: admin / staff
function makeHash(pwEnvName, hashEnvName, label) {
  if (process.env[hashEnvName]) return process.env[hashEnvName];
  if (process.env[pwEnvName]) return bcrypt.hashSync(process.env[pwEnvName], 8);
  const gen = uuidv4().split('-')[0];
  const h = bcrypt.hashSync(gen, 8);
  console.log(`Generated initial ${label} password (for dev): ${gen}`);
  return h;
}

const adminHash = makeHash('ADMIN_PW', 'ADMIN_HASH', 'admin');
const staffHash = makeHash('STAFF_PW', 'STAFF_HASH', 'staff');

const users = [
  { userId: uuidv4(), username: 'admin', passwordHash: adminHash, role: 'admin', createdAt: new Date().toISOString() },
  { userId: uuidv4(), username: 'staff', passwordHash: staffHash, role: 'staff', createdAt: new Date().toISOString() }
];

exports.findByUsername = (username) =>
  users.find((u) => u.username === username);

exports.authenticate = (username, password) => {
  const u = exports.findByUsername(username);
  if (!u) return null;
  const ok = bcrypt.compareSync(password, u.passwordHash);
  if (!ok) return null;
  return { userId: u.userId, username: u.username, role: u.role };
};
