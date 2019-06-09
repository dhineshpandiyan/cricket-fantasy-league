'use strict';

const dataAccess = require('../../../src/server/data-access/index.js');
const matchService = require('../../../src/server/services/match-service.js');

const sandbox = sinon.createSandbox();

const allMatches = [
  { _id: '1' },
  { _id: '2' }
];

describe('Rank Service', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('getMatches - should return all matches', () => {
    sandbox.stub(dataAccess, 'getAllMatches').value(() => {
      return allMatches;
    });

    const matches = matchService.getMatches(1);

    expect(matches).eql(allMatches);
  });

  it('getMatches - should return expected matches', () => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      return allMatches[0];
    });

    const match = matchService.getMatchById(1);

    expect(match).eql(allMatches[0]);
  });

  it('getMatches - should return empty if no match found', () => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      return {};
    });

    const match = matchService.getMatchById(3);

    expect(match).eql({});
  });

});
