import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import {gql} from 'graphql-tag';
const typeDefs= gql`
type Task {
    id:ID!
    Taskname:String!
    Taskstatus:String!
    Taskid:ID!
}

extend type users @key(fields: "id") {
  id: ID! @external
}

type Query{
    Tasks:[Task]
}
type Mutation{
    Addtask(Taskname:String!, Taskstatus:String!):Task
    Deletetask(Taskid:ID!):Task
    UpdateTask(Taskid:ID!,Taskname:String!, Taskstatus:String!):Task
}
`
export default typeDefs;