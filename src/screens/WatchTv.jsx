import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

import Nav from "../components/Nav";

import "./WatchTv.css";
import Row from "../components/Row";

const optsLarge = {
  height: "540",
  width: "850",
};

const optsSmall = {
  height: "fit",
  width: "fit",
};

function WatchTv() {
  const [details, setDetails] = useState();
  const { id } = useParams();

  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }

  const trailer = details?.videos.results.find((vid) => vid.type === "Trailer");
  const any_video = details?.videos.results[0]?.key;

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos`;
      const reponse = await fetch(url);
      const responseJson = await reponse.json();
      console.log(responseJson);
      setDetails(responseJson);
    };

    fetchData();
  }, [id]);

  return (
    <div className="watchMovie__outer">
      <Nav />

      <div
        className="watchMovie__banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${details?.backdrop_path}")`,
          backgroundPosition: "center center",
          opacity: "60%",
        }}
      >
        <div className="watchMovie__contents">
          <div className="watchMovie__video">
            <YouTube
              opts={optsLarge}
              videoId={trailer ? trailer?.key : any_video}
            />
          </div>

          <div className="watchMovie__details">
            <p className="watchMovie__title">{details?.original_name}</p>
            <div className="watchMovie__vote_date">
              <p className="watchMovie__vote">{details?.vote_average}</p>
              <p className="watchMovie__date">{details?.release_date}</p>
            </div>
            <p className="watchMovie__overview">
              {truncate(details?.overview, 300)}
            </p>
            <button className="watchMovie__button">My List</button>
          </div>

          <div className="watchMovie__videoSmall">
            <YouTube
              opts={optsSmall}
              videoId={trailer ? trailer?.key : any_video}
            />
          </div>
        </div>
      </div>

      <div className="watchMovie__more-like-this">
        <div>
          <Row
            title="More like this"
            fetchUrl={`
            tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`}
          />
        </div>
      </div>
    </div>
  );
}

export default WatchTv;
