'use strict';

const dataAccess = require('../../../src/server/data-access/index.js');
const teamService = require('../../../src/server/services/team-service.js');

const moment = require('moment');
const sandbox = sinon.createSandbox();

const mockedOldMatch = {
  _id: '1',
  teams: ['IND'],
  startsAt: Date.now() - 100000
};
const mockedNewMatch = {
  _id: '1',
  teams: ['IND'],
  startsAt: Date.now() + 100000
};
const mockedTeam = {
  IND: [{ _id: 'player-1'}, { _id: 'player-2'}]
};
describe('Team Service', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('getPlayersByMatchId', () => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      if (matchId === 1) {
        return mockedOldMatch
      }

      return {};
    });
    sandbox.stub(dataAccess, 'getPlayersByTeamId').value((teamId) => {
      return mockedTeam[teamId] || [];
    });

    const players = teamService.getPlayersByMatchId(1);

    expect(players).eql(mockedTeam.IND);
  });

  it('buildTeam - should not allow to modify players after match starts',() => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      if (matchId === 1) {
        return mockedOldMatch
      }

      return {};
    });

    const results = teamService.buildTeam('foo-user-id', 'foo-user-name', 1, []);

    expect(results).eql({
      error: {
        message: 'You are not allowed to edit players after match starts',
        status: 403
      }
    });
  });

  it('buildTeam - should return player limit warning',() => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      if (matchId === 1) {
        return mockedNewMatch
      }

      return {};
    });

    const results = teamService.buildTeam('foo-user-id', 'foo-user-name', 1, [1,2,3,4,5,6,7,8,9,10,11,12]);

    expect(results).eql({
      error: {
        message: 'Number of players should not exceed 11',
        status: 400
      }
    });
  });

  it('buildTeam - should return invalid player warning',() => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      if (matchId === 1) {
        return mockedNewMatch
      }

      return {};
    });
    sandbox.stub(dataAccess, 'getPlayersByTeamId').value((teamId) => {
      return mockedTeam.IND;
    });


    const results = teamService.buildTeam('foo-user-id', 'foo-user-name', 1, [{ _id: 'player-1'}, { _id: 'player-5'}]);

    expect(results).eql({
      error: {
        message: 'Players list has some invalid players',
        status: 400
      }
    });
  });

  it('buildTeam - should call saveTeam',() => {
    sandbox.stub(dataAccess, 'getMatchById').value((matchId) => {
      if (matchId === 1) {
        return mockedNewMatch
      }

      return {};
    });
    sandbox.stub(dataAccess, 'getPlayersByTeamId').value((teamId) => {
      return mockedTeam.IND;
    });
    dataAccess.saveTeam = sinon.spy();


    const results = teamService.buildTeam('foo-user-id', 'foo-user-name', 1, [{ _id: 'player-1'}, { _id: 'player-2'}]);

    expect(dataAccess.saveTeam.called).to.be.true;
  });

});
