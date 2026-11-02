const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const { createGreeting, createServer } = require('../src/index.js');

test('uses the default name when none is provided', () => {
  assert.equal(createGreeting(), 'Hello, world!');
});

test('greets a provided name', () => {
  assert.equal(createGreeting('Alice'), 'Hello, Alice!');
});

test('serves the placeholder and health endpoint over HTTP', async (context) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  context.after(
    () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  );

  const address = server.address();
  const rootResponse = await fetch(`http://127.0.0.1:${address.port}/`);
  assert.equal(rootResponse.status, 200);
  assert.equal(await rootResponse.text(), 'Hello, world!');

  const healthResponse = await fetch(`http://127.0.0.1:${address.port}/health`);
  assert.equal(healthResponse.status, 200);
  assert.deepEqual(await healthResponse.json(), { status: 'ok' });
});

test('keeps the demonstration review fixture valid and explicitly synthetic', () => {
  const fixturePath = path.join(__dirname, '../data/synthetic-reviews.jsonl');
  const lines = readFileSync(fixturePath, 'utf8').trim().split('\n');
  const reviews = lines.map((line) => JSON.parse(line));
  const ids = reviews.map((review) => review.id);

  assert.equal(reviews.length, 10);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(reviews.every((review) => review.source.kind === 'synthetic'));
  assert.ok(reviews.every((review) => review.status === 'illustrative_only'));
});
