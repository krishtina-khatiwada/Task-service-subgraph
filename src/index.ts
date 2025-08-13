import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import 'dotenv/config';
import typeDefs from "./schema/schema.js";
import { db } from "./db.js";
import { Task } from "./drizzle/schema.js";
import { eq, and } from "drizzle-orm";

const resolvers = {
  Query: {
    Tasks(){
      return [Task]
    }
  },

  Mutation:{
      Addtask: async(_:any,{Taskname,Taskstatus}:{Taskname:string,Taskstatus:string},
      context:{db:typeof db})=>{
        const task= await context.db
        .insert(Task)
        .values({
          Taskname,
          Taskstatus
        })
        const insertedTask= await context.db
        .select()
        .from(Task)
        .where(eq(Task.Taskname,Taskname))
        .limit(1);
        return insertedTask[0];
      },
      Deletetask: async(_:any,{Taskid}:{Taskid:number},
        context:{db:typeof db})=>{
          const task= await context.db
          .delete(Task)
          .where(eq(Task.Taskid,Taskid));
          return task;
        },
      Updatetask:async(_:any,{Taskid,Taskname,Taskstatus}:{Taskid:number,Taskname:string,Taskstatus:string},
        context:{db:typeof db})=>{
          const task= await context.db
          .update(Task)
          .set({
            Taskname:Taskname,
            Taskstatus:Taskstatus
          })
          .where(eq(Task.Taskid, Taskid));
          return{
            Taskid,
            Taskname,
            Taskstatus
          }
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
  listen: { port: 4001 },
  context: async () => ({
    db,
  }),
});

console.log(`🚀 Server ready at ${url}`);
