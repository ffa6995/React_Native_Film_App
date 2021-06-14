import ApiKeys from '../utils/ApiKeys';

class ApiCaller {
  async fetchRecommendedMovies(movieID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${ApiKeys.MovieDBConfig.API_KEY}&language=en-US&page=1`,
    ).catch((error) => console.error(error));

    const json = await res.json();

    json.results.map((item) => {
      item.type = 'movie';
    });

    return json;
  }

  async fetchRecommendedSeries(seriesID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesID}/recommendations?api_key=${ApiKeys.MovieDBConfig.API_KEY}&language=en-US&page=1`,
    ).catch((error) => console.error(error));

    const json = await res.json();

    json.results.map((item) => {
      item.type = 'tv';
    });

    return json;
  }

  async fetchSearch(search) {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${ApiKeys.MovieDBConfig.API_KEY}&query=${search}`,
    ).catch((error) => console.error(error));

    const movies = await movieRes.json();

    movies.results.map((item) => {
      item.type = 'movie';
    });

    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${ApiKeys.MovieDBConfig.API_KEY}&query=${search}`,
    ).catch((error) => console.error(error));

    const series = await seriesRes.json();

    series.results.map((item) => {
      item.type = 'tv';
      movies.results.push(item);
    });

    return movies;
  }

  /**
   * Only if also available in Austira.
   * @param {*} movieID
   * @returns
   */
  async fetchMovieProviders(movieID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${ApiKeys.MovieDBConfig.API_KEY}&watch_region=AT`,
    ).catch((error) => console.error(error));

    const movieProviders = await res.json();

    return movieProviders;
  }

  /**
   * Only if also available in Austira.
   * @param {*} seriesID
   * @returns
   */
  async fetchSeriesProviders(seriesID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesID}/watch/providers?api_key=${ApiKeys.MovieDBConfig.API_KEY}&watch_region=AT`,
    ).catch((error) => console.error(error));

    const seriesProviders = await res.json();

    return seriesProviders;
  }

  /**
   *
   * @param {use tv or movie} itemType
   * @param {id of the series or movie} itemID
   * @returns Only the items, if also available in Austira.
   */
  async fetchProviders(itemType, itemID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/${itemType}/${itemID}/watch/providers?api_key=${ApiKeys.MovieDBConfig.API_KEY}&watch_region=AT`,
    ).catch((error) => console.error(error));

    const providers = await res.json();
    return providers;
  }

  async fetchMovieOrSeries(itemType, itemID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/${itemType}/${itemID}?api_key=${ApiKeys.MovieDBConfig.API_KEY}&language=en-US`,
    ).catch((error) => console.error(error));

    const movieOrSeries = await res.json();

    return movieOrSeries;
  }

  async fetchCast(itemType, itemID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/${itemType}/${itemID}/credits?api_key=${ApiKeys.MovieDBConfig.API_KEY}&language=en-US`,
    ).catch((error) => console.error(error));

    const cast = await res.json();

    return cast;
  }

  async fetchSeason(seriesID, seasonID) {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesID}/season/${seasonID}?api_key=${ApiKeys.MovieDBConfig.API_KEY}&language=en-US`,
    );

    const season = await res.json();

    return season;
  }
}

export default ApiCaller;
