export interface ResponseAction {
  status?: boolean;
  messageError?: string;
  data?: any;
}

export class ResponseAction implements ResponseAction {
  constructor(status?: boolean, messageError?: string, data?: any) {
    this.status = status ? status : false;
    this.messageError = messageError ? messageError : '';
    this.data = data ? data : null;
  }
}
