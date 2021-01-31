import "./App.css";
import { config } from "./config";

function App() {
  const auth = () => {
    const url = `${config.instagramApi}oauth/authorize?client_id=${config.appId}&redirect_uri=${config.api}auth&scope=user_profile,user_media&response_type=code`;
    console.log("url", url);
    window.location.href = url;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={auth}
        >
          Авторизация
        </div>
      </header>
    </div>
  );
}

export default App;
