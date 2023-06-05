import graphql from './graphql/index.js';

export default utils => ({
  graphql: graphql(utils),
});