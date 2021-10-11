import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { PressStart } from "./src/screens/PressStart";
import { GameSetting } from "./src/screens/GameSetting";
import { GiveRole } from "./src/screens/GiveRole";
import { subjectDatas } from "./src/Utils/Data/subjectLists";
import { getRandomWord } from "./src/Utils/Logic/subjectFunc";
import { setPlayerRole } from "./src/Utils/Logic/setPlayer";
import { Vote } from "./src/screens/Vote";
import { theme } from "./src/Utils/Theme/theme";
import { BottomBannerAds } from "./src/Utils/Admob/Admob";

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${p=>p.theme.black};
  position: relative;
`;

export default function App() {
  const [gameStep, setGameStep] = useState(0);
  const [playerCnt, setPlayerCnt] = useState(3);
  const [selectModal, setSelectModal] = useState(false);
  const [subjectText, setSubjectText] = useState(Object.keys(subjectDatas)[0]);
  const [playWord, setPlayWord] = useState() 
  const [liarNumber, setLiarNumber] = useState();

  useEffect(()=>{
    if(gameStep === 2){
      setLiarNumber(setPlayerRole(playerCnt))
      setPlayWord(getRandomWord(subjectDatas[subjectText]))
    }
  },[gameStep])

  const toNextStep = () => {
    setGameStep((prev) => prev + 1);
  };

  const resetGameStep = ()=>{
    setGameStep(0)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  });

  return (
    <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Wrapper>
            {gameStep === 0 && <PressStart toNextStep={toNextStep} />}
            {gameStep === 1 && (
              <GameSetting
              playerCnt={playerCnt}
              setPlayerCnt={setPlayerCnt}
              selectModal={selectModal}
              setSelectModal={setSelectModal}
              subjectText={subjectText}
              setSubjectText={setSubjectText}
              toNextStep={toNextStep}
              />
              )}
            {gameStep === 2 && (
              <GiveRole
              subjectText={subjectText}
              playerCnt={playerCnt}
              liarNumber={liarNumber}
              playWord={playWord}
              toNextStep={toNextStep}
              />
              )}
            {gameStep === 3 && (
              <Vote
              playerCnt={playerCnt}
              liarNumber={liarNumber}
              subjectText={subjectText}
              playWord={playWord}
              resetGameStep={resetGameStep}
              />
              )}
            <BottomBannerAds />
            <StatusBar style="auto" />
          </Wrapper>
        </SafeAreaView>
    </ThemeProvider>
  );
}
