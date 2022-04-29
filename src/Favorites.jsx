import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import axios from 'axios';
const key = config.API_KEY;

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
