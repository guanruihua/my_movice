import React from 'react'
const DEFAULT_PLACEHOLDER_IMAGE =  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({movie}) => {
    const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    const flag = movie.Poster === "N/A";
    return (
        <div className="movie">
            <h2 style={{
                width:"200px",
                overflow: "hidden",
                textOverflow:"ellipsis",
                whiteSpace: "nowrap"
            }}>{movie.Title}</h2>
            <div>
                <img
                   width = "200"
                   height = "300"
                   alt={`The moive titled: ${movie.Title}`} 
                    src={poster}
                    />
                {flag?(<div><h2>Can't find the poster</h2></div>):(
                    null
                )}
                <p>({movie.Year})</p>
            </div>
        </div>
    )
}

export default Movie
