import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { MainState } from 'src/app/state/main.state';

@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.scss'],
})
export class ContainerPageComponent implements OnInit {
  private _unsubscribeAll = new Subject();
  public menuOpen: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.monitoringState();
  }

  monitoringState() {
    this.store
      .select(MainState.menuOpen)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((menuOpen: boolean) => {
        this.menuOpen = menuOpen;
      });
  }

  getClassesContainer() {
    let classes = 'container-box container-menu-open';
    if (!this.menuOpen) {
      classes = `container-box container`;
    }
    return classes;
  }
}
