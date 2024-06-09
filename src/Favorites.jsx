import { LocationCard } from "./LocationCard";

function Favorites(props) {

  const refreshFavs = () => {
    console.log('refresh favs / Favorites');
    props.getFavs();
  }

  return (
    <div>
      <p className='grey'>Favorites</p>
      <div className="favs-section">
        {props.favorites.reverse().map(city =>
          // <Link to={{
          //   pathname: `/${city}`,
          //   city,
          //   fromFavorites: true
          // }} key={city}>
          <LocationCard
            key={city} city={city} refreshFavs={refreshFavs}
          />
          // </Link>
        )}
      </div>
    </div>
  );
}

export default Favorites;
