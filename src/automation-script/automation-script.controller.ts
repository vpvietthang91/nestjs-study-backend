import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AutomationScriptEntity } from 'src/entity/automation-script.entity';
import { AutomationScriptService } from './automation-script.service';
import { AutomationScriptCreateDto } from '../dto/automation-scriptCreate.dto';
import { AutomationScriptUpdateDto } from '../dto/automation-scriptUpdate.dto';

@Controller('automation-script')
export class AutomationScriptController {

    constructor(private readonly automationScriptService: AutomationScriptService) {}

    @Get('/findAll')
    async findAllScript(): Promise<AutomationScriptEntity[]> {
        return await this.automationScriptService.findAll();
    }

    @Get('/findScriptByID/:id')
    async findOneScriptById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<AutomationScriptEntity> {
        return this.automationScriptService.findById(id);
    }

    @Get('/findScriptByName')
    async findOneScriptByName(@Query('name') name: string): Promise<AutomationScriptEntity> {
       return this.automationScriptService.findByName(name);
    }

    @Post('/createScript')
    async createScript(@Body() post: AutomationScriptCreateDto): Promise<AutomationScriptEntity> {
        return this.automationScriptService.createScript(post);
    }

    @Put('/updateScript')
    async updateScript(@Body() put: AutomationScriptUpdateDto): Promise<AutomationScriptEntity> {
        return this.automationScriptService.updateScript(put);
    }

    @Put('/deleteScript/:id')
    async deleteScript(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Res({passthrough: true}) res: Response): Promise<any> {
        const result = await this.automationScriptService.deleteScript(id);
        res.status(HttpStatus.OK).json({
            message: "Deleted "+result,
        });
    }

    @Get('/executeScript/:id')
    async executeScript(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Res({passthrough: true}) res: Response): Promise<any> {
        await this.automationScriptService.executeScript(id);
        res.status(HttpStatus.OK).json({
            message: "Scrip execute without error.",
            error: "SUCCESS",
        });
    }
}
