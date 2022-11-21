import { HttpHeaders } from '@angular/common/http';

export function openInNewTab(url: string) {
  var win: any = window.open(url, '_blank');
  win.focus();
  return win;
}

export interface HttpHeadersDefault {
  authorization?: string;
  Accept?: string;
  withAuthorization?: boolean;
}

export function getHttpHeadersDefault(params: HttpHeadersDefault) {
  let pHeaders: any = {};
  pHeaders.Accept = params.Accept
    ? params.Accept
    : 'application/json; charset=utf-8';
  if (params.withAuthorization) {
    let auth: any = params.authorization ? params.authorization : '';
    if (!auth) {
      auth = getLocalToken();
    }
    pHeaders.authorization = auth;
  }
  pHeaders = new HttpHeaders(pHeaders);
  return pHeaders;
}

export function getLocalToken() {
  let auth = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null;
  return auth;
}

/**
 * Completar texto a esquerda com zeros
 * @param value valor
 * @param totalWidth quantidade de caracteres que deseja
 * @param paddingChar caractere que deseja completar, default é zero
 */
export function leftPad(
  value: string,
  totalWidth: number,
  paddingChar: string
) {
  var length = totalWidth - value.toString().length + 1;
  return Array(length).join(paddingChar || '0') + value;
}

/**
 * Realiza a ordenação de um array de objetos por um determinado campo
 * @param obj Objeto lista de objetos que deseja ordenar
 * @param field Campo ao qual dejeseja validar
 * @param type Tipo crescente ou decrescente "asc" ou "desc" default asc
 *
 * Dependencias: isEmpty()
 * @returns Objeto ordenado
 */
export function orderByObject(
  obj: Array<any>,
  field: string,
  type: string
): Array<{}> {
  //se existir o campo no objeto será ordenado
  if (!isEmpty(obj[0])) {
    if (!isEmpty(obj[0][field])) {
      if (type == 'asc' || type == 'desc') {
        obj.sort((a, b) => orderBy(a, b, field, type));
      }
    }
  }
  return obj;
}

/**
 * Realiza a analise de campo dentro de dois objetos identificando se o objeto A é maior que o B ou B maior que A ou mesmo são iguais
 * @param a Objeto para analisar
 * @param b Objeto para analisar
 * @param field Campo dentro dos objetos para analisar
 * @param type Tipo crescente ou decrescente "asc" ou "desc" default asc
 */
export function orderBy(a: any, b: any, field: string, type: string) {
  let aux: any;
  if (type == 'asc') {
    aux = a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0;
  } else {
    aux = a[field] > b[field] ? -1 : b[field] > a[field] ? 1 : 0;
  }
  return aux;
}

/**
 * Retorna valor boleano se variável é vazia ou nula.
 * Desconsidere zero como vazio
 * @param value Valor que deseja validar se está vazio
 */
 export function isEmpty(value: any) {
  let valueReturn: boolean = false;
  try {
    if (typeof value === 'boolean') {
      valueReturn = false;
    }
    if (typeof value === 'string') {
      if (value === 'NaN' || value === 'Undefined' || value === 'Null') {
        valueReturn = true;
      } else {
        if (!value) {
          valueReturn = true;
        } else {
          valueReturn = false;
        }
      }
    }
    if (typeof value === 'number') {
      valueReturn = false;
    }
    if (typeof value === 'undefined') {
      valueReturn = true;
    }
    if (typeof value === 'object') {
      if (value == null) {
        valueReturn = true;
      } else {
        if (value.length == 0) {
          valueReturn = true;
        } else {
          if (!value.length) {
            if (!JSON.stringify(value).replace('{', '').replace('}', '')) {
              valueReturn = true;
            } else {
              valueReturn = false;
            }
          } else {
            valueReturn = false;
          }
        }
      }
    }
    if (typeof value === 'function') {
      valueReturn = false;
    }
  } catch {
    valueReturn = true;
  }

  return valueReturn;
}

export function numberMaskOntime(event: any) {
  if (event?.target?.value) {
    return event.target.value.replace(/\D/g, '');
  } else {
    return '';
  }
}