import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './shared/infrastructure/logging/Logger';
import { GithubService } from './shared/infrastructure/github/github.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly githubService: GithubService,
  ) {}

  @Get()
  async getHello(@Res() response: Response) {
    const tick = performance.now();
    const languages = await this.githubService.getUsedLanguages();
    const tock = performance.now();
    response.setHeader('X-Response-Time', tock - tick);
    return response.json(Object.fromEntries(languages.entries()));
  }
}
