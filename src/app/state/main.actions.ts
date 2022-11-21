import { EventEmitter } from '@angular/core';
import { ResponseAction } from '../model/main.model';

export class ShowMenu {
  static type = '[Main] ShowMenu';
  public emitResponse = new EventEmitter<ResponseAction>();
  constructor(public show: boolean) {}
}

export class UpdatePageMenu {
  static type = '[Main] UpdatePageMenu';
  constructor(public pageName: string) {}
}
