const assert = require('assert');
const app = require('../../src/app');

describe('\'prompts\' service', () => {
  it('registered the service', () => {
    const service = app.service('prompts');

    assert.ok(service, 'Registered the service (prompts)');
  });
});
