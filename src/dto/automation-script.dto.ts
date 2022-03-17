import { ApiProperty } from "@nestjs/swagger";

export class AutomationScriptDto {
    @ApiProperty()
    scriptName: string;
}