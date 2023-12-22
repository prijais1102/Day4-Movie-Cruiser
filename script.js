var datafav = [];
var data = [];debugger;
async function getMovies() {
  var res = await fetch("http://localhost:3000/movies");
  data = await res.json();
  displayMovies(data);
  getFav();
}
getMovies();
async function getFav() {
  var res = await fetch("http://localhost:3000/favourites");
  datafav = await res.json();
  getFavourites(datafav);
}

function displayMovies(data) {
  for (i = 0; i < data.length; i++) {
    document.getElementById("movies").innerHTML += `<div class="card">
    <div class="card-body">
    <img src=${data[i].posterPath} class="card-img-top" alt="Image">
    <p class="card-title h-100">${data[i].title}</p>
    <p class="card-text">${data[i].releaseDate}</p>
    <button type="button" id=${data[i].id} onclick="addFavourite(id)" class="btn btn-primary">Add to Favourite</button>
    </div>
    </div>`;
  }
}
function getFavourites(datafav) {
  for (i = 0; i < datafav.length; i++) {
    document.getElementById("favourites").innerHTML += `<div class="card">
    <div class="card-body">
    <img src=${datafav[i].posterPath} class="card-img-top" alt="Image">
    <p class="card-title h-100">${datafav[i].title}</p>
    <p class="card-text">${datafav[i].releaseDate}</p>
    <button type="button" id=${datafav[i].id} onclick="deleteFavourite(id)" class="btn btn-danger">Remove</button>
    </div>
    </div>`;
  }
}
async function deleteFavourite(id)
{
    const response = await fetch("http://localhost:3000/favourites/"+id,{
        method:"DELETE",
    });
    datafav = await response.json();
    console.log(datafav);
    getFavourites(datafav);
}

async function addFavourite(id) {
    const reponsemovie = await fetch("http://localhost:3000/movies/"+id);
    const result =await reponsemovie.json(); 
    const count=datafav.filter(x=>x.title == result.title);
    if(count==0)
    {
      const response = await fetch("http://localhost:3000/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieID: result.movieID,
          title: result.title,
          releaseDate: result.releaseDate,
          posterPath: result.posterPath,
          id:result.id
        }),
      });
      datafav = await response.json();
      getFavorites(datafav);
    }
    else
  {
    alert("Movie already exists");
  }
    }



