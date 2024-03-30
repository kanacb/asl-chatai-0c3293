const assert = require('assert');
const app = require('../../src/app');

describe('\'refConfig\' service', () => {
  it('registered the service', () => {
    const service = app.service('refConfig');

    assert.ok(service, 'Registered the service (refConfig)');
  });
});
