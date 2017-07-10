import { AuthService } from './chat-container/login/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'sfeir-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class PeopleAppComponent {    
    
    constructor(public authService: AuthService) {
    }
}
