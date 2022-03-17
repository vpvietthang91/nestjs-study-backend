import { Test, TestingModule } from '@nestjs/testing';
import { AutomationScriptController } from './automation-script.controller';

describe('AutomationScriptController', () => {
  let controller: AutomationScriptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomationScriptController],
    }).compile();

    controller = module.get<AutomationScriptController>(AutomationScriptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
