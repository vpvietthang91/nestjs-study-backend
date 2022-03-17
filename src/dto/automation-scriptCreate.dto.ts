import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AutomationScriptCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    scriptName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    scriptContent: string;

    @ApiPropertyOptional()
    @IsString()
    scriptDescription: string;

    @ApiPropertyOptional()
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    scriptType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    scriptExecutor: string;

    @ApiPropertyOptional()
    @IsString()
    scriptRunningOs: string;

    @ApiPropertyOptional()
    createdAt: Date;
}
