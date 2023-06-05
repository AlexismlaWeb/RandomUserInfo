import "./App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCity } from "@fortawesome/free-solid-svg-icons";

function HomeScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var rawResponse = await fetch("https://randomuser.me/api/?results=10");
      var res = await rawResponse.json();
      var data = res.results;
      if (res) {
        setUser(data);
      }
    }
    fetchData();
  }, []);

  const SeeMore = (index) => {
    console.log(user[index]);
    navigate("/UserProfil", {
      state: {
        user: user[index],
      },
    });
  };

  if (user) {
    var mapUserRandom = user.map((val, index) => {
      return (
        <div className="HomeCard" key={index}>
          <div style={{ marginBlock: "2vh" }}>
            <img alt={val.name.last} src={val.picture.large} className="img" />
            <h3 style={{ marginBlock: "15px", fontWeight: "500" }}>
              {val.name.first} {val.name.last}
            </h3>
            <div className="contener_button">
              <p className="font_mobile">
                <FontAwesomeIcon icon={faGlobe} className="icon" />
                {val.location.country}
              </p>
              <p style={{ fontWeight: "300", fontSize: "0.7rem", margin: 0 }}>
                <FontAwesomeIcon icon={faCity} className="icon" />
                {val.location.city}
              </p>
            </div>
          </div>
          <div className="contener_button">
            <button
              className="button"
              name="more"
              onClick={() => SeeMore(index)}
            >
              See more
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "10px",
          alignItems: "center",
        }}
        className="body"
      >
        {mapUserRandom}
      </div>
    </div>
  );
}

export default HomeScreen;
