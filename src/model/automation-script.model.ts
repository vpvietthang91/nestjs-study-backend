import { Timestamp } from "typeorm";

export class AutomationScriptModel {
    constructor(
        public id: number,
        public scriptName: string,
        public scriptContent: string,
        public scriptDescription: string,
        public isActive: boolean,
        public scriptType: string,
        public scriptExecutor: string,
        public scriptRunningOs: string,
        public createdAt: Timestamp,
        public updateAt: Timestamp
    ) {}
}