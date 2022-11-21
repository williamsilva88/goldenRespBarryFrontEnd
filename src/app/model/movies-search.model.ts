export interface MoviesSearch {
  page?: number | null;
  size?: number | null;
  winner?: boolean | null;
  year?: number | null;
  projection?: string | null;
}

export class MoviesSearch implements MoviesSearch {
  constructor(
    page?: number | null,
    size?: number | null,
    winner?: boolean | null,
    year?: number | null,
    projection?: string | null
  ) {
    this.page = page || page === 0 ? page : null;
    this.size = size || size === 0 ? size : null;
    this.winner = winner?.toString() === 'false' || winner?.toString() === 'true' ? winner : null;
    this.year = year ? year : null;
    this.projection = projection ? projection : null;
  }

  getParamUrl() {
    let url = '';
    const page = this.page || this.page === 0 ? `page=${this.page}` : '';
    const size = this.size || this.size === 0 ? `size=${this.size}` : '';
    const winner =
      this.winner?.toString() === 'false'
        ? `winner=false`
        : this.winner?.toString() === 'true'
        ? `winner=true`
        : '';
    const year = this.year ? `year=${this.year}` : '';
    const projection = this.projection ? `projection=${this.projection}` : '';

    const mount = (url: string, param: string) => {
      if (url && param) {
        url = `${url}&${param}`;
      } else if (!url && param) {
        url = `?${param}`;
      }
      return url;
    };

    url = mount(url, page);
    url = mount(url, size);
    url = mount(url, winner);
    url = mount(url, year);
    url = mount(url, projection);
    return url;
  }
}
