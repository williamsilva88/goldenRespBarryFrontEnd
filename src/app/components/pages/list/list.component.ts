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

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.initData();
    this.getDataFull(0, 15, 0);
  }

  initData() {
    this.data = [];
    this.columns = [
      {
        name: 'ID',
        field: 'id',
        headerStyle: {},
        filter: false,
      },
      {
        name: 'Year',
        field: 'year',
        headerStyle: {},
        filter: true,
        filterType: 'number',
      },
      {
        name: 'Title',
        field: 'title',
        headerStyle: {},
        filter: false,
      },
      {
        name: 'Winner?',
        field: 'winner',
        headerStyle: {},
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

  getDataFull(
    page: number,
    size: number,
    year: number,
    winner: boolean | null = null
  ) {
    this.httpService
      .searchMovies(new MoviesSearch(page, size, winner, year, null))
      .subscribe((obj: any) => {
        if (obj?.content?.length > 0) {
          this.data = obj.content;
        } else {
          this.data = [];
        }
      });
  }

  filterSelectAction(data: any) {
    console.log('data:', data);
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
    this.getDataFull(0, 15, year, winner);
  }
}
