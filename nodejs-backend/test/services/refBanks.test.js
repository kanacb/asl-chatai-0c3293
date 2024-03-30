const assert = require('assert');
const app = require('../../src/app');

describe('\'refBanks\' service', () => {
  it('registered the service', () => {
    const service = app.service('refBanks');

    assert.ok(service, 'Registered the service (refBanks)');
  });
});
