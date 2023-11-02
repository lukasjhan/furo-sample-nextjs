import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

const authenticateWithCode = async (code) => {
  const { data } = await axios.post(
    'https://api.furo.one/sessions/code/authenticate',
    { code },
    { headers: { origin: 'localhost:3000' } }
  );
  return data;
};

const getUserInfo = async (token) => {
  const { data } = await axios.get('https://api.furo.one/users/me', {
    headers: { authorization: `Bearer ${token}` },
  });
  return data;
};

const gotoLoginPage = () => {
  const loginUrl = `https://auth.furo.one/login/${CLIENT_ID}`;
  window.location.href = loginUrl;
};

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  function onClick() {
    if (!CLIENT_ID) {
      alert('Please set CLIENT_ID in pages/index.js');
      return;
    }
    gotoLoginPage();
  }

  useEffect(() => {
    if (!code) return;
    console.log('query', code);
    authenticateWithCode(code)
      .then((data) => getUserInfo(data.access_token))
      .then((data) => {
        console.log('data', data);
        document.getElementById('data').innerText = JSON.stringify(
          data,
          null,
          2
        );
      });
  }, [code]);

  return (
    <div className={styles.container}>
      <img id="logo" alt="Vue logo" src="furo.svg" height={100} />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button type="button" onClick={onClick}>
        Login
      </button>
      <div
        id="data"
        style={{
          backgroundColor: 'black',
          color: 'white',
          marginTop: '60px',
          whiteSpace: 'pre',
        }}
      ></div>
    </div>
  );
}
