// etl.js — Lab 1: Fetch & ETL with Node.js
const fs   = require("fs");
const path = require("path");

const API_URL       = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// ── 1. EXTRACT ────────────────────────────────────
async function extract(url) {
  console.log('[EXTRACT] Fetching:', url);
  const response = await fetch(url);
  if (!response.ok) throw new Error('HTTP error: ' + response.status);
  const data = await response.json();
  console.log('[EXTRACT] Got', data.length, 'records.');
  return data;
}

// ── 2. TRANSFORM ──────────────────────────────────
// Challenge A: accepts optional posts array to compute postCount per user
// Challenge C: filters to Southern Hemisphere (lat < 0) users only
function transform(users, posts = []) {
  console.log('[TRANSFORM] Cleaning', users.length, 'records...');

  // Challenge A — build a post-count map keyed by userId
  const postCountMap = new Map();
  for (const post of posts) {
    postCountMap.set(post.userId, (postCountMap.get(post.userId) || 0) + 1);
  }

  const rows = users.map(user => ({
    id:        user.id,
    name:      user.name.trim(),
    username:  user.username.toLowerCase(),
    email:     user.email.toLowerCase(),
    phone:     user.phone.split(' ')[0],  // keep only the main number, strip extension
    city:      user.address.city,
    zipcode:   user.address.zipcode,
    lat:       parseFloat(user.address.geo.lat),
    lng:       parseFloat(user.address.geo.lng),
    company:   user.company.name,
    postCount: postCountMap.get(user.id) || 0,  // Challenge A column
  }));

  // Filter out records with invalid email
  const clean = rows.filter(r => r.email.includes('@'));

  // Challenge C — keep only Southern Hemisphere users (lat < 0)
  const southern = clean.filter(r => r.lat < 0);
  console.log('[TRANSFORM] Clean records:', clean.length);
  console.log('[TRANSFORM] Southern Hemisphere users:', southern.length);

  return southern;
}

// ── 3. LOAD ───────────────────────────────────────
function load(rows) {
  console.log('[LOAD] Writing', rows.length, 'rows to CSV...');
  const headers = Object.keys(rows[0]);
  const lines   = rows.map(row => headers.map(h => `"${row[h]}"`).join(','));
  const csv     = [headers.join(','), ...lines].join('\n');
  fs.writeFileSync(path.join(__dirname, 'output.csv'), csv, 'utf8');
  console.log('[LOAD] Saved to output.csv');
}

// ── MAIN ──────────────────────────────────────────
async function main() {
  try {
    // Challenge A — fetch both endpoints
    const raw   = await extract(API_URL);
    const posts = await extract(POSTS_API_URL);

    const clean = transform(raw, posts);
    console.table(clean);
    load(clean);
  } catch (err) {
    // Challenge B — friendly error message on any failure
    console.error('[ERROR]', err.message);
    process.exit(1);
  }
}

main();
