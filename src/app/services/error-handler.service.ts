import { ErrorHandler, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private messageService: NzMessageService) { }

  handleError(error: Error): void {
    this.messageService.error(error.message);
  }

}
