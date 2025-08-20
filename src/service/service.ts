import { db } from "../db.js";
import { Task } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";

export const tasks= async()=>{
  try {
    await db.select().from(Task);
  } catch (error) {
    throw new GraphQLError('NO task found',{
      extensions:{
        code:"data_not_available"
      }
    });
  }
}
  export const addtask= async({Taskname,Taskstatus}:{Taskname:string,Taskstatus:string})=>{
  if(!Taskname||!Taskstatus){
            throw new GraphQLError('taskname and taskstatus cannot be empty',{
              extensions:{
                code:"FIELD_CANNOT_EMPTY"
              }
            });
          }
          try {
             await db
          .insert(Task)
          .values({
            Taskname,
            Taskstatus
          })
          const insertedTask= await db
          .select()
          .from(Task)
          .where(eq(Task.Taskname,Taskname))
          .limit(1);
          return insertedTask[0];
          } catch (error) {
            throw new GraphQLError('database error',{
              extensions:{
                code:"Internal server error"
              }
            });
          }
        }
    
export const deletetask= async({Taskid}:{Taskid:number})=>{
  if (!Taskid){
  throw new GraphQLError('Taskid cannot be empty',{
    extensions:{
      code:"FIELD_CANNOT_EMPTY"
    }
})

  }
  try {
    const deletedtask= await db
            .select()
            .from(Task)
            .where(eq(Task.Taskid,Taskid));
    const task= await db
          .delete(Task)
          .where(eq(Task.Taskid,Taskid));
          return deletedtask[0];
  } catch (error) {
    throw new GraphQLError('database error',{
              extensions:{
                code:"Internal server error"
              }
            });
  }
    
}
export const updatetask= async({Taskname,Taskstatus,Taskid}:{Taskname:string,Taskstatus:string,Taskid:number})=>{
    if(!Taskname||!Taskstatus || !Taskid){
            throw new GraphQLError('taskname, taskstatus, taskid cannot be empty',{
              extensions:{
                code:"FIELD_CANNOT_EMPTY"
              }
            });
          }
  try {
     const task= await db
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
  } catch (error) {
      throw new GraphQLError('database error',{
              extensions:{
                code:"Internal server error"
              }
            });
  }
}