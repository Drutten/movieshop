export default interface IProduct {
    title: string;
    id: number;
    overview: string;
    poster_path: string;
    release_date: string
    genre_ids: number[];
}


//https://api.themoviedb.org/3/movie/{movie_id}?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US

//https://api.themoviedb.org/3/movie/latest?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US

//https://api.themoviedb.org/3/movie/top_rated?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&page=1

//https://api.themoviedb.org/3/movie/popular?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&page=1

//https://api.themoviedb.org/3/search/movie?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&query=batman%20&page=1&include_adult=false