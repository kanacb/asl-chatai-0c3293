const assert = require('assert');
const app = require('../../src/app');

describe('\'chatai\' service', () => {
  it('registered the service', () => {
    const service = app.service('chatai');

    assert.ok(service, 'Registered the service (chatai)');
  });
});
