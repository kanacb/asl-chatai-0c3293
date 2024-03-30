const assert = require('assert');
const app = require('../../src/app');

describe('\'refFacilities\' service', () => {
  it('registered the service', () => {
    const service = app.service('refFacilities');

    assert.ok(service, 'Registered the service (refFacilities)');
  });
});
