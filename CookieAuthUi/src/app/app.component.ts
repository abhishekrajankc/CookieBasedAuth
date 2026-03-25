import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonToolbarComponent } from './shared/common-toolbar/common-toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
