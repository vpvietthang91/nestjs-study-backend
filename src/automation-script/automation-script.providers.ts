import { Connection } from "typeorm";
import { AutomationScriptEntity } from "src/entity/automation-script.entity";

export const AutomationScriptProviders = [
    {
        provide: 'AUTOMATION_SCRIPT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(AutomationScriptEntity),
        inject: ['DATABASE_CONNECTION'],
    },
];