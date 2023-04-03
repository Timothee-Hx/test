// make a express app
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';


const PORT = 3000;
const app = express();

// The GraphQL schema in string form
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// The GraphQL endpoint

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
}
);

// Path: resolvers.js
export const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

// Path: typeDefs.js
export const typeDefs = `
    type Query {
        hello: String
    }
`;

//Now, we can run the server and go to http://localhost:3000/graphiql to run queries.

