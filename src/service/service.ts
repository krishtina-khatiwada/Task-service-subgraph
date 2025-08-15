import { db } from "../db.js";
import { Task } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const tasks= async()=>{
    return await db.select().from(Task);
}
export const addtask= async({Taskname,Taskstatus}:{Taskname:string,Taskstatus:string})=>{
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
}
export const deletetask= async({Taskid}:{Taskid:number})=>{
    const task= await db
          .delete(Task)
          .where(eq(Task.Taskid,Taskid));
          return task;
}
export const updatetask= async({Taskname,Taskstatus,Taskid}:{Taskname:string,Taskstatus:string,Taskid:number})=>{
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
}