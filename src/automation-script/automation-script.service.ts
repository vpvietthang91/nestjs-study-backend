import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AutomationScriptEntity } from "src/entity/automation-script.entity";
import { AutomationScriptUpdateDto } from '../dto/automation-scriptUpdate.dto';
import { AutomationScriptCreateDto } from '../dto/automation-scriptCreate.dto';

@Injectable()
export class AutomationScriptService {
    constructor(
        @Inject('AUTOMATION_SCRIPT_REPOSITORY')
        private automationScriptRepository: Repository<AutomationScriptEntity>,
    ) {}

    /*  Syntax
        SELECET * FROM Table
    */
    findAll(): Promise<AutomationScriptEntity[]> {
        return this.automationScriptRepository.find();      
    }

    /*  Syntax
        SELECT * FROM Table WHERE id=id
    */
    async findById(id: number): Promise<AutomationScriptEntity> {
        const script = await this.automationScriptRepository.findOne(id);
        if(!script) {
            throw new InternalServerErrorException('Not found record with id '+id);
        }
        return script;
    }

    /*  Syntax
        SELECT * FROM Tannle WHERE name=name
    */
    async findByName(name: string): Promise<AutomationScriptEntity> {
        try {
            const script = await this.automationScriptRepository.createQueryBuilder("script") .where("script.scriptName = :nameFind", { nameFind: name }).getOne();
            return script;
        } catch(err) {
            throw err;
        }
    }

    /*  Syntax
        INSERT INTO table_name (column1, column2, column3, ...)
        VALUES (value1, value2, value3, ...);
    */
    createScript(post: AutomationScriptCreateDto): Promise<AutomationScriptEntity> {
        const newScript = this.automationScriptRepository.create(post)
        return this.automationScriptRepository.save(newScript);
    }

    /*  Syntax
        UPDATE table_name
        SET column1 = value1, column2 = value2...., columnN = valueN
        WHERE [condition];
    */
    async updateScript(put: AutomationScriptUpdateDto): Promise<AutomationScriptEntity> {
        const updateScript = await this.automationScriptRepository.findOneOrFail(put.id);
        if(!updateScript) {
            throw new InternalServerErrorException('Not found record with id '+put.id);
        }
        updateScript.scriptName = put.scriptName;
        updateScript.scriptContent = put.scriptContent;
        updateScript.scriptDescription = put.scriptDescription;
        if(put.isActive != null) {
            if(['true', 'on', 'yes', '1'].includes(put.isActive.toLowerCase())) {
                updateScript.isActive = true;
            } else if(['false', 'off', 'no', '0'].includes(put.isActive.toLowerCase())) {
                updateScript.isActive = false;
            }
        }
        updateScript.scriptType = put.scriptType;
        updateScript.scriptRunningOs = put.scriptRunningOs;
        return this.automationScriptRepository.save(updateScript);
    }

    async deleteScript(id: number): Promise<any> {
        const deleteScript = await this.automationScriptRepository.findOneOrFail(id);
        if(!deleteScript) {
            throw new InternalServerErrorException('Not found record with id '+id);
        }
        deleteScript.isActive = false;
        this.automationScriptRepository.save(deleteScript);
        return deleteScript.scriptName;
    }

    async executeScript(id: number): Promise<any> {
        const executeScript = await this.automationScriptRepository.findOne(id);
        if(!executeScript) {
            throw new InternalServerErrorException('Not found record with id '+id);
        } else if(!executeScript.isActive) {
            throw new InternalServerErrorException('Record status is not active.')
        }

        const fs = require('fs');
        const scriptPath = './src/storage.automation-script/'+executeScript.scriptName.split(" ").join()+'.'+executeScript.scriptType;
        
        fs.writeFile(scriptPath, executeScript.scriptContent, (err: any) => {
            console.log("file created: "+scriptPath);
            if (err) throw new InternalServerErrorException(err);
        });

        const { exec } = require('child_process');
        if(executeScript.scriptExecutor != null) {
            const result = await exec(executeScript.scriptExecutor+' '+scriptPath, {'shell':'powershell.exe'}, (error: string, stdout: string, stderr: any)=> {
                if(stdout) {
                    console.log("This is stdout: \n"+stdout);
                }
                if(error) {
                    console.log("This is error: \n"+error);
                }
                if(stderr) {
                    console.log("This is stderr: \n"+stderr);
                }
                console.log("done executing script.");
            });
            fs.unlinkSync(scriptPath, (err: any) => {
                if(err) throw new InternalServerErrorException(err);
            });
            return result;
        }
    }
}
