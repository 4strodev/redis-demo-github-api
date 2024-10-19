import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './shared/infrastructure/logging/Logger';
import { GithubService } from './shared/infrastructure/github/github.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly githubService: GithubService,
  ) {}

  @Get()
  async getHello() {
    const languages = await this.githubService.getUsedLanguages();
    return Object.fromEntries(languages.entries());
  }
}
