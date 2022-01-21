import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqlLiteService } from './services/sql/sql-lite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sqliteService: SqlLiteService, platform: Platform) {
    platform.ready().then(() => {
      this.sqliteService.createDB();
    });
  }
}
