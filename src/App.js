import { useEffect, useState } from "react";
import "./App.css";
import { config } from "./config";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [images, setImages] = useState([]);

  const auth = () => {
    const url = `${config.instagramApi}oauth/authorize?client_id=${config.appId}&redirect_uri=${config.api}auth&scope=user_profile,user_media&response_type=code`;
    console.log("url", url);
    window.location.href = url;
  };

  const getUserPhotos = () => {
    fetch(
      `https://graph.instagram.com/${userId}/media?fields=media_url,thumbnail_url,media_type&access_token=${token}`
    )
      .then((data) => data.json())
      .then((json) => {
        setImages(json.data);
      });
  };

  useEffect(() => {
    if (window.location.href.includes("token")) {
      const substr = window.location.href
        .split("token?accessToken=")[1]
        .split("&userId=");
      const curToken = substr[0];
      const curUserId = substr[1].split("#_")[0];

      setUserId(curUserId);
      setToken(curToken);
      console.log(curUserId, curToken);
      if (curUserId && curToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        window.location.href = "/";
      }
    }
  }, [token, userId]);
  console.log(images);
  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <div
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={auth}
          >
            Авторизация
          </div>
        ) : (
          <div
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={getUserPhotos}
          >
            Получить фотки
          </div>
        )}
      </header>
      {images.map((item) => {
        return (
          <img
            key={
              item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url
            }
            src={
              item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url
            }
            alt={""}
            height="100px"
            width="100px"
          />
        );
      })}
    </div>
  );
}

export default App;
