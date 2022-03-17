import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AutomationScriptController } from './automation-script.controller';
import { AutomationScriptProviders } from './automation-script.providers';
import { AutomationScriptService } from './automation-script.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AutomationScriptController],
  providers: [
    ...AutomationScriptProviders,
    AutomationScriptService,
  ],
})
export class AutomationScriptModule {}
