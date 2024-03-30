const assert = require('assert');
const app = require('../../src/app');

describe('\'refFaDocs\' service', () => {
  it('registered the service', () => {
    const service = app.service('refFaDocs');

    assert.ok(service, 'Registered the service (refFaDocs)');
  });
});
