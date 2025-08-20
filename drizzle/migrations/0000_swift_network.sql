CREATE TABLE `Task` (
	`taskid` serial AUTO_INCREMENT NOT NULL,
	`taskname` varchar(255) NOT NULL,
	`taskstatus` varchar(50) NOT NULL,
	CONSTRAINT `Task_taskid` PRIMARY KEY(`taskid`)
);
