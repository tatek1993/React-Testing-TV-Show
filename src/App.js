import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";
import {fetchShow} from './api/fetchShow';

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];
    console.log('seasons', seasons);

    // useEffect(() => {
    //   const fetchShow = () => {
    //     axios
    //       .get(
    //         "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
    //       )
    //       .then(res => {
    //         setShow(res.data);
    //         setSeasons(formatSeasons(res.data._embedded.episodes));
    //       });
    //   };
    //   fetchShow();
    // }, []);

    
  useEffect(() => {
    fetchShow()
      .then(res => {
        console.log('fetchShow .then', res);
        setShow(res.data);
        setSeasons(formatSeasons(res.data._embedded.episodes));
       
        
        console.log('fetchShow .then', formatSeasons(res.data._embedded.episodes));
      })
      .catch(err => {
        return err;
      });
    
  }, []);


  const handleSelect = e => {
    setSelectedSeason(e.value);
  };
console.log('show', show);
  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
        data-testid="seasons-test"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
