import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConfigJson } from '../models/app-config-json.model';
import { ServerService } from './serverservice';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(
    private readonly http: HttpClient,
    private readonly serverService: ServerService
  ) {}

  async load(): Promise<void> {
    const config = await firstValueFrom(this.http.get<AppConfigJson>('/config/config.json'));
    this.serverService.setApiBaseUrl(config?.apiBaseUrl);
  }
}
