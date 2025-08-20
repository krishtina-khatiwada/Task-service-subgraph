import { mysqlTable,serial,datetime, varchar, boolean, int} from 'drizzle-orm/mysql-core';
import {sql} from 'drizzle-orm';
export const Task= mysqlTable('Task', {
  Taskid: serial().primaryKey(),
  Taskname: varchar({ length: 255 }).notNull(),
  Taskstatus: varchar({length : 50}).notNull(),
},
);
