const assert = require('assert');
const app = require('../../src/app');

describe('\'samplePrompts\' service', () => {
  it('registered the service', () => {
    const service = app.service('samplePrompts');

    assert.ok(service, 'Registered the service (samplePrompts)');
  });
});
