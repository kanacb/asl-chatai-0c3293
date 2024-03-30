const assert = require('assert');
const app = require('../../src/app');

describe('\'userPromptsSaved\' service', () => {
  it('registered the service', () => {
    const service = app.service('userPromptsSaved');

    assert.ok(service, 'Registered the service (userPromptsSaved)');
  });
});
