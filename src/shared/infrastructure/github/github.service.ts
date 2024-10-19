import { Injectable } from '@nestjs/common';
import { GithubApi } from './github-api';
import { GithubCache } from './github-cache';

@Injectable()
export class GithubService {
  constructor(
    private githubApi: GithubApi,
    private githubCache: GithubCache,
  ) {}

  public async getUsedLanguages(): Promise<Map<string, number>> {
    const cachedResponse = await this.githubCache.getUsedLanguages();
    if (cachedResponse) {
      return cachedResponse;
    }
    const response = await this.githubApi.getUsedLanguages();
    await this.githubCache.setUsedLanguages(response);
    return response;
  }
}
