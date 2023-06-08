import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

export default function Home() {
  function onClick() {
    window.Furo.loginWithRedirect();
  }

  useEffect(() => {
    window.Furo.init({
      // Your client id
      clientId: "",
      // Your redirect uri
      redirectUri: "http://localhost:3000",
    }).then((user) => {
      if (!user) return;
      console.log(user);
      document.getElementById("data").innerHTML = JSON.stringify(user, null, 2);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <script src="/FuroSDK.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button type="button" onClick={onClick}>
        Login
      </button>
      <div
        id="data"
        style={{
          backgroundColor: "black",
          color: "white",
          marginTop: "60px",
          whiteSpace: "pre",
        }}
      ></div>
    </div>
  );
}
