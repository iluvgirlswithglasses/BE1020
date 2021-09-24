import {Knex} from 'knex';

interface KnexConfig {
  [key: string]: Knex.Config;
}

const configs: KnexConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite3"
    },
    useNullAsDefault: true
  }
};

export default configs;
