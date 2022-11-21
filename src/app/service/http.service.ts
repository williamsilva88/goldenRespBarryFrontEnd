import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviesSearch } from '../model/movies-search.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public searchMovies(moviesSearch: MoviesSearch): Observable<any> {
    const url =
      `${environment.hosts.movies}/backend-java/api/movies` +
      moviesSearch.getParamUrl();
    return this.http.get<any>(url);
  }

}
