import { Component, OnInit } from '@angular/core';
import { MoviesSearch } from 'src/app/model/movies-search.model';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public data: any[] = [];
  public columns: any[] = [];

  pagelength = 200;
  pageTotal = 0;
  pageSize = 10;
  pageIndex = 0;
  yearFilter: number | null = null;
  winnerFilter: boolean | null = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.initData();
    this.getDataFull();
  }

  initData() {
    this.data = [];
    this.columns = [
      {
        name: 'ID',
        field: 'id',
        headerStyle: {
          textAlign: 'center',
          width: '100%',
          display: 'inline-grid',
          fontSize: '14px',
        },
        filter: false,
      },
      {
        name: 'Year',
        field: 'year',
        headerStyle: {
          textAlign: 'center',
          width: '100%',
          display: 'inline-grid',
          fontSize: '14px',
        },
        filter: true,
        filterType: 'number',
      },
      {
        name: 'Title',
        field: 'title',
        headerStyle: {
          textAlign: 'center',
          width: '100%',
          display: 'inline-grid',
          fontSize: '14px',
        },
        filter: false,
      },
      {
        name: 'Winner?',
        field: 'winner',
        headerStyle: {
          textAlign: 'center',
          width: '100%',
          display: 'inline-grid',
          fontSize: '14px',
        },
        filter: true,
        filterType: 'switch',
        filterSwitchPlaceholder: 'Yes/No',
        filterSwitchList: [
          {
            id: 1,
            label: 'Yes/No',
          },
          {
            id: 2,
            label: 'yes',
          },
          {
            id: 3,
            label: 'no',
          },
        ],
      },
    ];
  }

  getDataFull() {
    this.httpService
      .searchMovies(
        new MoviesSearch(
          this.pageIndex,
          this.pageSize,
          this.winnerFilter,
          this.yearFilter,
          null
        )
      )
      .subscribe((obj: any) => {
        if (obj?.content?.length > 0) {
          this.pagelength = obj.totalElements;
          this.pageTotal = obj.totalPages;
          this.data = obj.content;
          this.data.forEach((value) => {
            value.winner = value.winner.toString() === 'true' ? 'Yes' : 'No';
          });
        } else {
          this.data = [];
        }
      });
  }

  filterSelectAction(data: any) {
    let year = 0;
    let winner = null;
    if (data?.year) {
      year = data.year.value;
    }
    if (data?.winner) {
      switch (data?.winner?.value) {
        case 2:
          winner = true;
          break;
        case 3:
          winner = false;
          break;

        default:
          break;
      }
    }
    this.yearFilter = year;
    this.winnerFilter = winner;
    this.pageIndex = 0;
    this.getDataFull();
  }

  pageChange(data: any) {
    this.pageIndex = data?.pageIndex ? data?.pageIndex : 0;
    this.pageSize = data?.pageSize ? data?.pageSize : 10;
    this.getDataFull();
  }
}
