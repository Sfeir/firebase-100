import { DatabaseService } from './chat-container/_shared/database.service';
import { AuthService } from './chat-container/_shared/auth.service';
import { Component, HostListener } from "@angular/core";

@Component({
    selector: 'sfeir-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class PeopleAppComponent {    
    
    constructor(
        public authService: AuthService,
        public databaseservice: DatabaseService) {
    }
}
