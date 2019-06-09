'use strict';

const dataAccess = require('../../../src/server/data-access/index.js');
const rankService = require('../../../src/server/services/rank-service.js');

const sandbox = sinon.createSandbox();

describe('Rank Service', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('getRankByMatchId - should return desc order', () => {
    sandbox.stub(dataAccess, 'getRankByMatchId').value((teamId) => {
      return [
        { userId: '1', name: 'Foo', score: 10 },
        { userId: '2', name: 'Bar', score: 20 }
      ];
    });

    const rank = rankService.getRankByMatchId(1);

    expect(rank).eql([
      { userId: '2', name: 'Bar', score: 20 },
      { userId: '1', name: 'Foo', score: 10 }
    ]);
  });

});
