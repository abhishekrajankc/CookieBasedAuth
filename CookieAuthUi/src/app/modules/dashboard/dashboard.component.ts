import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
    wind_speed_10m?: number;
    time?: string;
  };
};

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly http = inject(HttpClient);

  isWeatherLoading = true;
  weatherError = '';
  weather: WeatherResponse['current'] | null = null;

  ngOnInit(): void {
    this.loadWeather();
  }

  private loadWeather(): void {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,wind_speed_10m';

    this.http.get<WeatherResponse>(url).subscribe({
      next: (response) => {
        this.weather = response?.current ?? null;
      },
      error: () => {
        this.weatherError = 'Unable to load weather data right now.';
      },
      complete: () => {
        this.isWeatherLoading = false;
      }
    });
  }
}
