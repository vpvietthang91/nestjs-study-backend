import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomationScriptModule } from './automation-script/automation-script.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AutomationScriptModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
