const mongoose = require('mongoose');
mongoose.set('debug', true);
const Schema = mongoose.Schema;

const Game = new Schema ({
  _id: {type: String, require: true},
  helpers: {
    year: {type: String, require: true},
    espnGameId: {type: Number, require: true, index: true}
  },
  meta: {
    isComplete: {type: Boolean, require: true, default: false},
    missingData: [{type: String, require: false}]
  },
  season_meta: {
    calendar_date: {type: String, require: true},
    season_year: {type: String, require: true},
    stats_season_year: {type: String, require: true},
    stats_season_id: {type: String, require: true},
    stats_season_stage: {type: String, require: true},
    roster_season_year: {type: String, require: true},
    schedule_season_year: {type: String, require: true},
    standings_season_year: {type: String, require: true},
    season_id: {type: String, require: true},
    display_year: {type: String, require: true},
    display_season: {type: String, require: true},
    season_stage: {type: String, require: true},
    league_id: {type: String, require: true},
  },
  boxscore_data_url: {type: String, require: true},
  game_url: {type: String, require: true},
  season_id: {type: String, require: true, index: true},
  date: {type: String, require: true, index: true},
  time: {type: String, require: true},
  arena: {type: String, require: true, index: true},
  city: {type: String, require: true},
  state: {type: String, require: true},
  country: {type: String, require: true},
  home_start_date: {type: String, require: true},
  home_start_time: {type: String, require: true},
  visitor_start_date: {type: String, require: true},
  visitor_start_time: {type: String, require: true},
  previewAvailable: {type: String, require: true},
  recapAvailable: {type: String, require: true},
  notebookAvailable: {type: String, require: true},
  tnt_ot: {type: String, require: true},
  attendance: {type: String, require: true},
  officials: [{
    _id: {type: String, ref: 'Official', index: true, many: true},
    jersey_number: {type: String, require: true}
  }],
  ticket: {
    ticket_link: {type: String, require: true}
  },
  broadcasters: {type: Object, require: true},
  period_time: {
    period_value: {type: String, require: true},
    period_status: {type: String, require: true},
    game_status: {type: String, require: true},
    game_clock: {type: String, require: true},
    total_periods: {type: String, require: true},
    period_name: {type: String, require: true}
  },
  visitor: {
    id: {type: String, ref: 'Team', index: true, many: false},
    score: {type: Number, require: true},
    linescores: {
      period: [{
        period_value: {type: String, require: true},
        period_name: {type: String, require: true},
        score: {type: Number, require: true},
      }]
    },
    Leaders: {
      Points: {
        PlayerCount: {type: String, require: true},
        StatValue: {type: String, require: true},
        leader: [{type: Number, ref: 'Player', index: true, many: true}]
      },
      Assists: {
        PlayerCount: {type: String, require: true},
        StatValue: {type: String, require: true},
        leader: [{type: Number, ref: 'Player', index: true, many: true}]
      },
      Rebounds: {
        PlayerCount: {type: String, require: true},
        StatValue: {type: String, require: true},
        leader: [{type: Number, ref: 'Player', index: true, many: true}]
      },
    },
    stats: {
      points: {type: Number, require: true},
      field_goals_made: {type: Number, require: true},
      field_goals_attempted: {type: Number, require: true},
      field_goals_percentage: {type: Number, require: true},
      free_throws_made: {type: Number, require: true},
      free_throws_attempted: {type: Number, require: true},
      free_throws_percentage: {type: Number, require: true},
      three_pointers_made: {type: Number, require: true},
      three_pointers_attempted: {type: Number, require: true},
      three_pointers_percentage: {type: Number, require: true},
      rebounds_offensive: {type: Number, require: true},
      rebounds_defensive: {type: Number, require: true},
      team_rebounds: {type: Number, require: true},
      assists: {type: Number, require: true},
      fouls: {type: Number, require: true},
      team_fouls: {type: Number, require: true},
      technical_fouls: {type: Number, require: true},
      steals: {type: Number, require: true},
      turnovers: {type: Number, require: true},
      team_turnovers: {type: Number, require: true},
      blocks: {type: Number, require: true},
      short_timeout_remaining: {type: Number, require: true},
      full_timeout_remaining: {type: Number, require: true}
    },
    players: {
      player: [{
        _id: {type: Number, ref: 'Player', index: true, many: false},
        jersey_number: {type: String, require: true},
        position_short: {type: String, require: true, default: ''},
        position_full: {type: String, require: true, default: ''},
        minutes: {type: String, require: true, default: '0'},
        seconds: {type: String, require: true, default: '0'},
        points: {type: Number, require: true, default: 0},
        field_goals_made: {type: Number, require: true, default: 0},
        field_goals_attempted: {type: Number, require: true, default: 0},
        free_throws_made: {type: Number, require: true, default: 0},
        free_throws_attempted: {type: Number, require: true, default: 0},
        three_pointers_made: {type: Number, require: true, default: 0},
        three_pointers_attempted: {type: Number, require: true, default: 0},
        rebounds_offensive: {type: Number, require: true, default: 0},
        rebounds_defensive: {type: Number, require: true, default: 0},
        assists: {type: Number, require: true, default: 0},
        fouls: {type: Number, require: true, default: 0},
        steals: {type: Number, require: true, default: 0},
        turnovers: {type: Number, require: true, default: 0},
        team_turnovers: {type: Number, require: true, default: 0},
        plus_minus: {type: Number, require: true, default: 0},
        on_court: {type: String, require: true, default: '0'},
        starting_position: {type: String, require: true, default: ''},
      }]
    }
  },
  home: {
    id: {type: String, ref: 'Team', index: true, many: false},
    score: {type: Number, require: true},
    linescores: {
      period: [{
        period_value: {type: String, require: true},
        period_name: {type: String, require: true},
        score: {type: Number, require: true},
      }]
    },
    Leaders: {
      Points: {
        PlayerCount: {type: String, require: true},
        StatValue: {type: String, require: true},
        leader: [{type: Number, ref: 'Player', index: true, many: true}]
      },
      Assists: {
        PlayerCount: {type: String, require: true},
        StatValue: {type: String, require: true},
        leader: [{type: Number, ref: 'Player', index: true, many: true}]
      },
      Rebounds: {
        PlayerCount: {type: String, require: true},
        StatValue: {type: String, require: true},
        leader: [{type: Number, ref: 'Player', index: true, many: true}]
      },
    },
    stats: {
      points: {type: Number, require: true},
      field_goals_made: {type: Number, require: true},
      field_goals_attempted: {type: Number, require: true},
      field_goals_percentage: {type: Number, require: true},
      free_throws_made: {type: Number, require: true},
      free_throws_attempted: {type: Number, require: true},
      free_throws_percentage: {type: Number, require: true},
      three_pointers_made: {type: Number, require: true},
      three_pointers_attempted: {type: Number, require: true},
      three_pointers_percentage: {type: Number, require: true},
      rebounds_offensive: {type: Number, require: true},
      rebounds_defensive: {type: Number, require: true},
      team_rebounds: {type: Number, require: true},
      assists: {type: Number, require: true},
      fouls: {type: Number, require: true},
      team_fouls: {type: Number, require: true},
      technical_fouls: {type: Number, require: true},
      steals: {type: Number, require: true},
      turnovers: {type: Number, require: true},
      team_turnovers: {type: Number, require: true},
      blocks: {type: Number, require: true},
      short_timeout_remaining: {type: Number, require: true},
      full_timeout_remaining: {type: Number, require: true}
    },
    players: {
      player: [{
        _id: {type: Number, ref: 'Player', index: true, many: false},
        jersey_number: {type: String, require: true},
        position_short: {type: String, require: true, default: ''},
        position_full: {type: String, require: true, default: ''},
        minutes: {type: String, require: true, default: '0'},
        seconds: {type: String, require: true, default: '0'},
        points: {type: Number, require: true, default: 0},
        field_goals_made: {type: Number, require: true, default: 0},
        field_goals_attempted: {type: Number, require: true, default: 0},
        free_throws_made: {type: Number, require: true, default: 0},
        free_throws_attempted: {type: Number, require: true, default: 0},
        three_pointers_made: {type: Number, require: true, default: 0},
        three_pointers_attempted: {type: Number, require: true, default: 0},
        rebounds_offensive: {type: Number, require: true, default: 0},
        rebounds_defensive: {type: Number, require: true, default: 0},
        assists: {type: Number, require: true, default: 0},
        fouls: {type: Number, require: true, default: 0},
        steals: {type: Number, require: true, default: 0},
        turnovers: {type: Number, require: true, default: 0},
        team_turnovers: {type: Number, require: true, default: 0},
        plus_minus: {type: Number, require: true, default: 0},
        on_court: {type: String, require: true, default: '0'},
        starting_position: {type: String, require: true, default: ''},
      }]
    }
  }
});

module.exports = mongoose.models.Game || mongoose.model('Game', Game)
