import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import 'dotenv/config';
import typeDefs from "./schema/schema.js";
import { db } from "./db.js";
import { Task } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import { tasks, addtask, deletetask, updatetask } from "./service/service.js";
import { graphql, GraphQLError } from "graphql";

const resolvers = {
  users:{

    _resolvereference:async(reference:any)=>{
      return{id:reference.id}
    },
    Tasks:async()=>{
      return await tasks();
    }
  },
  Query: {
      Tasks: async ()=>{
        return await tasks();
      }
  },

  Mutation:{
      Addtask: async(_:any,{Taskname,Taskstatus}:{Taskname:string,Taskstatus:string})=>{
        return await addtask({Taskname,Taskstatus});
      },
      Deletetask: async(_:any,{Taskid}:{Taskid:number})=>{
        return await deletetask({Taskid});
        },

      Updatetask:async(_:any,{Taskid,Taskname,Taskstatus}:{Taskid:number,Taskname:string,Taskstatus:string})=>{
          return await updatetask({Taskid,Taskname,Taskstatus});
        },
      }
    }   

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4600 },
  context: async () => ({
    db,
  }),
});

console.log(` Server ready at ${url}`);
