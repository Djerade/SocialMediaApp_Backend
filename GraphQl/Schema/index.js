import { buildSchema } from "graphql";

// Imports
import   { Types }   from './Types/index.js';
import  { Mutations }  from "./Mutation/index.js";
import  { Queries }  from "./Queries/index.js";
import { Subcriptions } from "./Subcriptions/index.js";



export const schema = buildSchema(`

${Types.join(`\n`)}

type Query {
  ${Queries.join(`\n`)}
}

type Mutation {
  ${Mutations.join(`\n`)}
}

type Subcription {
  ${Subcriptions.join(`\n`)}
}

schema {
 query : Query
 mutation: Mutation
 subscription: Subcription
}
`)