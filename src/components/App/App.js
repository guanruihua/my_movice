import React,{useState, useEffect, useReducer} from 'react'
import "./App.css";
import Header from "../Header/Header"
import Search from "../Search/Search"
import Movie from "../Movie/Movie"

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=16f467aa";

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST"://seacrch_movies_request
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_MOVIES_SUCCESS"://search_movies_success
        return {
          ...state,
          loading: false,
          movies: action.payload
        };
      case "SEARCH_MOVIES_FAILURE"://search_movies_failure
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  };


const App = () => {

    // const [loading, setLoading] = useState(true);
    // const [movies, setMovies] = useState([]);
    // const [errorMessage, setErrorMessage] = useState(null);
    const [state, dispath] = useReducer(reducer, initialState);

    // useEffect(()=>{
    //     fetch(MOVIE_API_URL)
    //         .then(response => response.json())
    //         .then(jsonResponse => {
    //             setMovies(jsonResponse.Search);
    //             setLoading(false);
    //             console.log(jsonResponse);
    //         })
    // },[]);

    // const search = searchValue => {
    //     setLoading(true);
    //     setErrorMessage(null);

    //     fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=16f467aa`)
    //         .then(response => response.json())
    //         .then(jsonResponse => {
    //             if(jsonResponse.response === "True"){
    //                 setMovies(jsonResponse.Search);
    //                 setLoading(false);
    //                 console.log(jsonResponse.Search)
    //             }else{
    //                 setErrorMessage(jsonResponse.Error);
    //                 setLoading(false);
    //             }
    //         })

    // }

    useEffect(()=>{
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                dispath({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                })
                console.log(jsonResponse.Search)
            })
    },[]);

    

    const search = searchValue => {
        dispath({
            type: "SEARCH_MOVIES_REQUEST"
        });
        console.log(searchValue);
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=16f467aa`)
            .then(response=> response.json())
            .then(jsonResponse => {
                if(jsonResponse.Response === "True"){
                    dispath({
                        type:"SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    })
                    console.log(jsonResponse.Search)
                }else {
                    dispath({
                        type: "SEARCH_MOVIES_FAILURE",
                        payload: jsonResponse.error
                    })
                    
                }
            })
    }

    const { movies, errorMessage, loading } = state;

    return (
        <div className="App">
            <Header text = "FINDMOVIE"/>
            <Search search={search}/>
            <p className="App-intro">Sharing a few of our favourite moives</p>
            <div className="movies">
                {loading && !errorMessage ? (
                    <span>loading...</span>
                ):(
                    movies.map((movie, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </div>
        </div>
    )
}

export default App
