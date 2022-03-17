import { Test, TestingModule } from '@nestjs/testing';
import { AutomationScriptService } from './automation-script.service';

describe('AutomationScriptService', () => {
  let service: AutomationScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomationScriptService],
    }).compile();

    service = module.get<AutomationScriptService>(AutomationScriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
