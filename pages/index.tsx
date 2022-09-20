import { FaExchangeAlt, FaLeaf } from "react-icons/fa";
import { dropPetal, testConnectivity } from "../helpers/api";
import { useEffect, useState } from "react";

import Button from "../components/button";
import Head from "next/head";
import LogWindow from "../components/log-window";
import type { NextPage } from "next";
import classnames from "classnames";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [logOutput, setLogOutput] = useState("");
  const [connectionSuccessful, setConnectionSuccessful] = useState(false);
  //const [hostName, setHostname]

  const appendLog = (txt: string) => {
    const newText = txt + "\r\n" + logOutput;
    setLogOutput(newText);
  };

  const doDropPetal = (petalNum: number) => {
    dropPetal(petalNum)
      .then((result) => {
        console.log(result);
        appendLog(result);
      })
      .catch((err) => {
        console.error("Error on doDropPetal");
        appendLog("NETWORK ERROR ON DROPPETAL");
        appendLog(err.message);
      });
  };

  const doTestConnectivity = () => {
    testConnectivity()
      .then((result) => {
        console.log(result);
        appendLog(result.data.message);
      })
      .catch((err) => {
        appendLog("ERROR ON CONNECTIVITY TEST");
      });
  };

  useEffect(() => {
    // try to connect
    testConnectivity()
      .then((result) => {
        setConnectionSuccessful(true);
        setLogOutput("Ready!");
      })
      .catch((err) => {
        setConnectionSuccessful(false);
        setLogOutput(
          "ERROR: API service on device is not responding. Check that the python flask app is up and running."
        );
      });
  }, []);

  return (
    <div className="bg-gray-900">
      <Head>
        <title>Enchanted Rose</title>
        <meta name="description" content="Enchanted rose with falling petals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="mb-8">
          <img
            src="/assets/rose.jpg"
            className={classnames(
              { "w-48 rounded-lg": true },
              { "opacity-10": !connectionSuccessful },
              { "opacity-100": connectionSuccessful }
            )}
          />
        </div>
        <h1 className="text-white text-4xl font-semibold leading-loose">
          Enchanted Rose
        </h1>

        <div className="mt-8 mb-4">
          <Button
            onClick={() => {
              doTestConnectivity();
            }}
            iconObj={FaExchangeAlt}
            label="Test connectivity"
          />
        </div>

        <div className="max-w-sm">
          <div className="mt-8 flex justify-center gap-6">
            <div>
              <Button
                onClick={() => doDropPetal(1)}
                iconObj={FaLeaf}
                label="1"
              />
            </div>
            <div>
              <Button
                onClick={() => doDropPetal(2)}
                iconObj={FaLeaf}
                label="2"
              />
            </div>
            <div>
              <Button
                onClick={() => doDropPetal(3)}
                iconObj={FaLeaf}
                label="3"
              />
            </div>
            <div>
              <Button
                onClick={() => doDropPetal(4)}
                iconObj={FaLeaf}
                label="4"
              />
            </div>
          </div>

          <div className="mt-12 w-full mx-auto">
            <LogWindow
              onClearClicked={() => {
                setLogOutput("");
              }}
              text={logOutput}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
