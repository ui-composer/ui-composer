import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput } from 'react-native';

import {
  BackgroundColor,
  Box,
  Button,
  compose,
  HStack,
  Spacer,
  Text,
  VStack,
  VStackProps,
} from '@ui-composer/react';

import level1Words from '../data/level1-words';
import level2Words from '../data/level2-words';
import level3Words from '../data/level3-words';
import socket from '../utils/socket';

// const numberOfTrys = 6;
const wordLength = 5;
const activeLevel = 1;

const levels = {
  1: level1Words,
  2: level2Words,
  3: level3Words,
};

function getRandomWord() {
  const arr = levels[activeLevel];
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const LetterContainer = compose(Box, {
  width: 70,
  minWidth: 70,
  height: 72,
  borderRadius: 'roundedLarge',
  borderColor: 'line',
  borderWidth: 1,
  backgroundColor: 'secondary',
});

type LetterProps = {
  word: string;
  letter: string;
  answer: string;
  completed: boolean;
  selected: boolean;
  activeCursor: boolean;
} & React.ComponentProps<typeof LetterContainer>;

const Letter = memo(function Letter(props: LetterProps) {
  const { word, letter, answer, completed, selected, activeCursor, ...otherProps } = props;
  const backgroundColor: BackgroundColor = useMemo(() => {
    if (completed) {
      if (letter === answer) {
        return 'positiveWash';
      }
      if (word.includes(letter)) {
        return 'warningWash';
      }
      return 'secondary';
    } else {
      if (selected) {
        return 'backgroundAlternate';
      }
    }

    return 'background';
  }, [selected, completed, letter, answer, word]);

  return (
    <LetterContainer
      backgroundColor={backgroundColor}
      borderColor={activeCursor ? 'primary' : undefined}
      {...otherProps}
    >
      <Text
        alignItems="center"
        height={70}
        justifyContent="center"
        lineHeight={72}
        textAlign="center"
        variant="display2"
      >
        {letter?.toLowerCase()}
      </Text>
    </LetterContainer>
  );
});

Letter.displayName = 'Letter';

// const cachedState = [
//   [undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined],
// ];

function Row({ word, active, completed }: { word: string; active: boolean; completed: boolean }) {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState('');
  const [selectionColumn, setSelectionColumn] = useState<number | undefined>();
  const textArray = text.split('');
  const textLength = textArray.length;
  const [letter1, letter2, letter3, letter4, letter5] = textArray;
  const [answer1, answer2, answer3, answer4, answer5] = word.split('');
  const selectionSections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ];

  const getOnPressHandler = useCallback(
    (columnNumber: number) => {
      return () => {
        if (text === '') {
          setSelectionColumn(undefined);
          inputRef.current?.focus();
        } else {
          inputRef.current?.focus();
          setSelectionColumn(columnNumber);
        }
      };
    },
    [text]
  );

  const handleOnChangeText = useCallback((val: string) => {
    setText(val);
  }, []);

  const handleOnKeyPress = useCallback(() => {
    setSelectionColumn(undefined);
  }, []);

  useEffect(() => {
    if (completed) {
      setSelectionColumn(undefined);
    }
  }, [completed]);

  const selection = selectionColumn ? selectionSections[selectionColumn - 1] : undefined;

  return (
    <HStack pointerEvents={completed ? 'none' : undefined}>
      <TextInput
        style={{
          opacity: 0,
          position: 'absolute',
        }}
        autoCapitalize="none"
        autoCorrect={false}
        editable={active}
        maxFontSizeMultiplier={1}
        maxLength={wordLength}
        placeholder={word}
        pointerEvents="none"
        ref={inputRef}
        returnKeyType="done"
        selection={selection ? { start: selection[0], end: selection[1] } : undefined}
        selectionColor="transparent"
        spellCheck={false}
        value={text}
        onChangeText={handleOnChangeText}
        onKeyPress={handleOnKeyPress}
      />
      <Letter
        activeCursor={selectionColumn === 1 || (active && text === '')}
        answer={answer1}
        completed={completed}
        letter={letter1}
        selected={selectionColumn === 1}
        word={word}
        onTouchStart={getOnPressHandler(1)}
      />
      <Spacer />
      <Letter
        activeCursor={selectionColumn === 2 || (active && !!letter1 && textLength === 1)}
        answer={answer2}
        completed={completed}
        letter={letter2}
        selected={selectionColumn === 2}
        word={word}
        onTouchStart={getOnPressHandler(2)}
      />
      <Spacer />
      <Letter
        activeCursor={
          selectionColumn === 3 || (active && !!letter1 && !!letter2 && textLength === 2)
        }
        answer={answer3}
        completed={completed}
        letter={letter3}
        selected={selectionColumn === 3}
        word={word}
        onTouchStart={getOnPressHandler(3)}
      />
      <Spacer />
      <Letter
        activeCursor={
          selectionColumn === 4 ||
          (active && !!letter1 && !!letter2 && !!letter3 && textLength === 3)
        }
        answer={answer4}
        completed={completed}
        letter={letter4}
        selected={selectionColumn === 4}
        word={word}
        onTouchStart={getOnPressHandler(4)}
      />
      <Spacer />
      <Letter
        activeCursor={
          selectionColumn === 5 ||
          (active && !!letter1 && !!letter2 && !!letter3 && !!letter4 && textLength === 4)
        }
        answer={answer5}
        completed={completed}
        letter={letter5}
        selected={selectionColumn === 5}
        word={word}
        onTouchStart={getOnPressHandler(5)}
      />
    </HStack>
  );
}

const Game = memo((props: VStackProps) => {
  const [gameState, setGameState] = useState({ activeRow: 1, completedRows: [] as number[] });
  const word = useRef(getRandomWord()).current;

  const handleSubmitRow = useCallback(() => {
    setGameState(prev => {
      return {
        activeRow: prev.activeRow + 1,
        completedRows: [...prev.completedRows, prev.activeRow],
      };
    });
  }, []);

  useLayoutEffect(() => {
    const start = Date.now();
    socket.emit('ping', () => {
      console.log(`pong (latency: ${Date.now() - start} ms)`);
    });
  }, []);

  return (
    <VStack
      alignItems="center"
      flexGrow={1}
      height="100%"
      justifyContent="flex-start"
      spacing={2}
      {...props}
    >
      <Row
        active={gameState.activeRow === 1}
        completed={gameState.completedRows.includes(1)}
        word={word}
      />
      <Spacer maxVertical={2} />
      <Row
        active={gameState.activeRow === 2}
        completed={gameState.completedRows.includes(2)}
        word={word}
      />
      <Spacer maxVertical={2} />
      <Row
        active={gameState.activeRow === 3}
        completed={gameState.completedRows.includes(3)}
        word={word}
      />
      <Spacer maxVertical={2} />
      <Row
        active={gameState.activeRow === 4}
        completed={gameState.completedRows.includes(4)}
        word={word}
      />
      <Spacer maxVertical={2} />
      <Row
        active={gameState.activeRow === 5}
        completed={gameState.completedRows.includes(5)}
        word={word}
      />
      <Spacer maxVertical={2} />
      <Row
        active={gameState.activeRow === 6}
        completed={gameState.completedRows.includes(6)}
        word={word}
      />
      <Spacer maxVertical={6} />
      <Button variant="positiveWash" onPress={handleSubmitRow}>
        Submit
      </Button>
      <Button variant="warning" onPress={handleSubmitRow}>
        Give up
      </Button>
    </VStack>
  );
});

Game.displayName = 'Game';

export default Game;
