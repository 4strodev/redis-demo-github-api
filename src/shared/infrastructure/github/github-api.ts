import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { config } from 'dotenv';

@Injectable()
export class GithubApi {
  private httpClient: axios.AxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
  });

  constructor() {
    config();
    this.httpClient.interceptors.request.use((config) => {
      config.headers.set('Authorization', `Bearer ${process.env.GH_TOKEN}`);
      return config;
    });
  }

  public async getUsedLanguages(): Promise<Map<string, number>> {
    const languageUsage: Map<string, number> = new Map<string, number>();
    const repos =
      await this.httpClient.get<{ languages_url: string }[]>(`/user/repos`);
    for (const repo of repos.data) {
      const languages = await this.getLanguages(repo.languages_url);
      for (const [language, usage] of Object.entries(languages)) {
        const currentUsage = languageUsage.get(language) || 0;
        languageUsage.set(language, currentUsage + usage);
      }
    }

    return languageUsage;
  }

  private async getLanguages(
    languagesUrl: string,
  ): Promise<{ [lang: string]: number }> {
    const response = await this.httpClient.get<{
      [language: string]: number;
    }>(languagesUrl);
    return response.data;
  }
}
