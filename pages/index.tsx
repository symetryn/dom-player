import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Player from "../components/molecules/player/player";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Player />
    </div>
  );
};

export default Home;
