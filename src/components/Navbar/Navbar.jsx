import React, {useCallback, useEffect, useState} from 'react';
import './Navbar.scss'
import {Link} from "react-router-dom";
import logo from "../../images/icons8-film-64.png"
import debounce from "debounce";
import MovieController from "../../controllers/movie.controller";
import NavbarFilmList from "./NavbarFilmList";
import {useNavigate} from "react-router";



const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [films, setFilms] = useState([])
  const changeHandler = (e) => {
    setSearchQuery(e.target.value)
  }
  const debounceInput = useCallback(debounce(changeHandler, 500), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(searchQuery.length > 1){
      MovieController.search(searchQuery).then(data => {
        setFilms(data)
      })
    }else{
      setFilms([])
    }
  },[searchQuery])

  const router = useNavigate()

  return (
    <div className='navbar'>
      <div className="container">
        <div className="navbar__flex">
          <div className="navbar__logo">
            <Link to='/'>
              <img src={logo} alt="logo"/>
            </Link>
          </div>
          <div className="navbar__categories">
            <Link to='/genres/movies' className="navbar__link">
              Movies
            </Link>
            <Link to='/genres/series' className="navbar__link">
              Series
            </Link>
            <Link to='/genres/cartoons' className="navbar__link">
              Cartoons
            </Link>
            <Link to='/genres/tv' className="navbar__link">
              TV Shows
            </Link>
          </div>
          <div className="navbar__wide-area">
            {/*TODO: Change to custom input*/}
            <form onSubmit={e => {
              e.preventDefault();
              router(`/genres/search/${e.target.firstChild.value}`)
            }}>
              <input
                className={'navbar__search'}
                type="text"
                onChange={debounceInput}
                placeholder={'Find movie'}
              />
            </form>
            {films.length > 0 ? <NavbarFilmList films={films} clearFilms={setSearchQuery}/> : null}
          </div>
          <Link to={'/account'}>
            <div className='navbar__account'>
              <img src="" alt=""/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;