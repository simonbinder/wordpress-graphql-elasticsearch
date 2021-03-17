/* @flow */
/* eslint-disable no-console */

var express = require ('express');
var {graphqlHTTP} = require ('express-graphql');
var schema = require ('./routes/index');

const expressPort = process.env.port || process.env.PORT || 9201;

const app = express();
app.use(
    '/',
    (graphqlHTTP({
  schema,
  graphiql: true,
  customFormatErrorFn: error => ({
    message: error.message,
    stack: error.stack.split('\n'),
  }),
}))
);

app.listen(expressPort, () => {
  console.log(`The server is running at http://localhost:${expressPort}/`);
});

module.exports = app;
