import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class AutomationScriptUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiPropertyOptional()
    @IsString()
    scriptName: string;

    @ApiPropertyOptional()
    @IsString()
    scriptContent: string;

    @ApiPropertyOptional()
    @IsString()
    scriptDescription: string;

    @ApiPropertyOptional()
    @IsString()
    isActive: string;

    @ApiPropertyOptional()
    @IsString()
    scriptType: string;

    @ApiPropertyOptional()
    @IsString()
    scriptExecutor: string;

    @ApiPropertyOptional()
    @IsString()
    scriptRunningOs: string;
    
    updateAt: Timestamp;
}
