import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalingService {
  _socket: any;

  constructor(private socket: Socket) {}

  setupSocketConnection() {
    this._socket = io('http://localhost:3000', {
      auth: {
        token: "abc"
      }
    });

    this._socket.emit('my message', 'Hello there from Angular.');

    this._socket.on('my broadcast', (data: string) => {
      console.log(data, '11111111');
    });
  }

  disconnect() {
    if (this._socket) {
      this._socket.disconnect();
    }
  }

  getMessages(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  sendMessage(payload: any): void {
    this._socket.emit('my message', payload);
  }
}
