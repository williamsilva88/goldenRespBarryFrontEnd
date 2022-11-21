import { Component, OnInit } from '@angular/core';
import { MoviesSearch } from 'src/app/model/movies-search.model';
import { HttpService } from 'src/app/service/http.service';
import { numberMaskOntime, orderByObject } from 'src/app/shared/utils';

export interface Dashboard {
  listYearsWithMultipleWinners?: DashboardItem;
  topThreeStudiosWithWinners?: DashboardItem;
  producersWithLongestAndShortestIntervalBetweenWinsMaximun?: DashboardItem;
  producersWithLongestAndShortestIntervalBetweenWinsMinimum?: DashboardItem;
  listMovieWinnersByYears?: DashboardItem;
}

export interface DashboardItem {
  title: string;
  data: any[];
  columns: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public dashboard: Dashboard = {};
  public yearFilter = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.initData();
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getProducersMaximunAndMinimum();
  }

  getYearsWithMultipleWinners() {
    this.httpService
      .searchMovies(
        new MoviesSearch(null, null, null, null, 'years-with-multiple-winners')
      )
      .subscribe((list: any) => {
        if (list?.years?.length > 0) {
          if (this.dashboard?.listYearsWithMultipleWinners) {
            this.dashboard.listYearsWithMultipleWinners.data = list.years;
          }
        } else {
          if (this.dashboard?.listYearsWithMultipleWinners) {
            this.dashboard.listYearsWithMultipleWinners.data = [];
          }
        }
      });
  }

  getStudiosWithWinCount() {
    this.httpService
      .searchMovies(
        new MoviesSearch(null, null, null, null, 'studios-with-win-count')
      )
      .subscribe((value: any) => {
        const list: any[] = [];
        if (value?.studios?.length > 0) {
          const studios = orderByObject(value?.studios, 'winCount', 'desc');
          for (let i = 0; i < studios.length; i++) {
            list.push(studios[i]);
            if (list.length === 3) {
              break;
            }
          }
        }
        if (this.dashboard?.topThreeStudiosWithWinners) {
          this.dashboard.topThreeStudiosWithWinners.data = list;
        }
      });
  }

  getProducersMaximunAndMinimum() {
    this.httpService
      .searchMovies(
        new MoviesSearch(
          null,
          null,
          null,
          null,
          'max-min-win-interval-for-producers'
        )
      )
      .subscribe((value: any) => {
        if (value?.max?.length > 0) {
          const max = value?.max[0];
          if (
            this.dashboard
              ?.producersWithLongestAndShortestIntervalBetweenWinsMaximun
          ) {
            this.dashboard.producersWithLongestAndShortestIntervalBetweenWinsMaximun.data =
              [max];
          }
        }
        if (value?.min?.length > 0) {
          const min = value?.min[0];
          if (
            this.dashboard
              ?.producersWithLongestAndShortestIntervalBetweenWinsMinimum
          ) {
            this.dashboard.producersWithLongestAndShortestIntervalBetweenWinsMinimum.data =
              [min];
          }
        }
      });
  }

  getListMovieWinnersByYears() {
    if (!Number(this.yearFilter)) {
      if (this.dashboard?.listMovieWinnersByYears) {
        this.dashboard.listMovieWinnersByYears.data = [];
      }
    } else {
      this.httpService
        .searchMovies(
          new MoviesSearch(null, null, true, Number(this.yearFilter), null)
        )
        .subscribe((list: any) => {
          if (this.dashboard?.listMovieWinnersByYears) {
            this.dashboard.listMovieWinnersByYears.data = list;
          }
        });
    }
  }

  initData() {
    this.dashboard.listYearsWithMultipleWinners = {
      title: 'List years with multiple winners',
      data: [],
      columns: [
        {
          name: 'Year',
          field: 'year',
        },
        {
          name: 'Win Count',
          field: 'winnerCount',
        },
      ],
    };

    this.dashboard.topThreeStudiosWithWinners = {
      title: 'Top 3 studios with winners',
      data: [],
      columns: [
        {
          name: 'Name',
          field: 'name',
        },
        {
          name: 'Win Count',
          field: 'winCount',
        },
      ],
    };

    this.dashboard.producersWithLongestAndShortestIntervalBetweenWinsMaximun = {
      title: 'Maximun',
      data: [],
      columns: [
        {
          name: 'Producer',
          field: 'producer',
        },
        {
          name: 'interval',
          field: 'interval',
        },
        {
          name: 'Previous Year',
          field: 'previousWin',
        },
        {
          name: 'Folliwing Year',
          field: 'followingWin',
        },
      ],
    };

    this.dashboard.producersWithLongestAndShortestIntervalBetweenWinsMinimum = {
      title: 'Minimum',
      data: [],
      columns: [
        {
          name: 'Producer',
          field: 'producer',
        },
        {
          name: 'interval',
          field: 'interval',
        },
        {
          name: 'Previous Year',
          field: 'previousWin',
        },
        {
          name: 'Folliwing Year',
          field: 'followingWin',
        },
      ],
    };

    this.dashboard.listMovieWinnersByYears = {
      title: 'List movie winners by years',
      data: [],
      columns: [
        {
          name: 'Id',
          field: 'id',
        },
        {
          name: 'Year',
          field: 'year',
        },
        {
          name: 'Title',
          field: 'title',
        },
      ],
    };
  }

  getDashboardData(dashboard: any, key: string) {
    return dashboard[key]?.data ? dashboard[key]?.data : [];
  }

  getDashboardColumns(dashboard: any, key: string) {
    return dashboard[key]?.columns ? dashboard[key]?.columns : [];
  }

  getDashboardtitle(dashboard: any, key: string) {
    return dashboard[key]?.title ? dashboard[key]?.title : '';
  }

  validInput(event: any) {
    this.yearFilter = numberMaskOntime(event);
  }

  ngOnDestroy() {}
}
