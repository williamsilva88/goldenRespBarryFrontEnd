import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { ShowMenu } from 'src/app/state/main.actions';
import { MainState } from 'src/app/state/main.state';

export interface MenuItens {
  name: string;
  link: string;
  icon?: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private _unsubscribeAll = new Subject();
  pageName: string = '';
  menuList: Array<MenuItens> = [];
  menuOpen: boolean = false;

  constructor(
    private store: Store,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.monitoringState();
    this.createMenuItens();
  }

  monitoringState() {
    this.store
      .select(MainState.pageActually)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pageName: string) => {
        this.pageName = pageName;
      });

    this.store
      .select(MainState.menuOpen)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((menuOpen: boolean) => {
        this.menuOpen = menuOpen;
      });
  }

  createMenuItens() {
    this.menuList = [
      {
        name: 'Dashboard',
        link: '/pages/dashboard',
        icon: 'dashboard',
      },
      {
        name: 'List',
        link: '/pages/list',
        icon: 'format_list_bulleted',
      },
    ];
  }

  getClassesItem(item: MenuItens) {
    let classes = 'item left-side';
    if (item?.name && item.name === this.pageName) {
      classes = `${classes} active`;
    }
    return classes;
  }

  getClassesContent() {
    let classes = 'menu-content';
    if (!this.menuOpen) {
      classes = `menu-content-small-size`;
    }
    return classes;
  }

  getClassesItemName() {
    let classes = 'menu-Item-span-custom';
    if (!this.menuOpen) {
      classes = `menu-Item-span-custom-no-show`;
    }
    return classes;
  }

  getClassesBackIcon() {
    let classes = 'material-symbols-outlined';
    if (!this.menuOpen) {
      classes = `${classes} material-symbols-outlined-close`;
    }
    return classes;
  }

  alterMenuOpen() {
    this.store.dispatch(new ShowMenu(this.menuOpen ? false : true));
  }

  openPage(item: any) {
    const link = item?.link;
    this.router.navigateByUrl(link);
  }
}
