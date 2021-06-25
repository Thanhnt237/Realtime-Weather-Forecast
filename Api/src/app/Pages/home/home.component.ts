import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../Services/websocket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    showSomething: any;

    constructor(private websocketService: WebsocketService){ }

    ngOnInit() {
      this.websocketService.listen("Server-sent-data").subscribe((data:any)=>{
        this.showSomething = data;
        console.log(this.showSomething);
      })
    }

}
