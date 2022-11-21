'use strict';

import { Injectable } from '@angular/core';
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { of } from 'rxjs';
import { ResponseAction } from '../model/main.model';
import { ShowMenu, UpdatePageMenu } from './main.actions';

export interface MainStateModel {
  pageActually: string;
  menuOpen: boolean;
}

export class MainStateModel implements MainStateModel {
  constructor(pageActually?: string, menuOpen?: boolean) {
    this.pageActually = pageActually ? pageActually : '';
    this.menuOpen = menuOpen ? menuOpen : false;
  }
}

export const MAIN_STATE_DEFAULTS = new MainStateModel();
export const MAIN_STATE_TOKEN = new StateToken<MainStateModel>('Main');

@State({
  name: MAIN_STATE_TOKEN,
  defaults: MAIN_STATE_DEFAULTS,
})
@Injectable()
export class MainState implements NgxsOnInit {
  @Selector() static pageActually(state: MainStateModel) {
    return state.pageActually;
  }
  @Selector() static menuOpen(state: MainStateModel) {
    return state.menuOpen;
  }

  constructor() {}

  ngxsOnInit(ctx?: StateContext<MainStateModel>) {}

  @Action(ShowMenu)
  showMenu(ctx: StateContext<MainStateModel>, action: ShowMenu) {
    const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
    let show = state.menuOpen ? state.menuOpen : false;
    show = action.show;
    ctx.patchState({
      menuOpen: show,
    });
    action.emitResponse.emit(new ResponseAction(true, undefined, show));
    return of(show);
  }

  @Action(UpdatePageMenu)
  updatePageMenu(ctx: StateContext<MainStateModel>, action: UpdatePageMenu) {
    ctx.patchState({ pageActually: action.pageName });
    return of(true);
  }
}
