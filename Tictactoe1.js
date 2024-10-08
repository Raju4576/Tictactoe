import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Tictactoe1 = () => {
    const [btn, setbtns] = useState(["", "", "", "", "", "", "", "", ""]);
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const btnClick = (index) => {
        if (btn[index] !== "" || winner) {
            return;
        }

        const newBtns = [...btn];
        newBtns[index] = isXNext ? 'X' : 'O';
        setbtns(newBtns);
        setIsXNext(!isXNext);
    };

    const win = () => {
        if ((btn[0] && btn[0] === btn[1] && btn[0] === btn[2]) ||
            (btn[3] && btn[3] === btn[4] && btn[3] === btn[5]) ||
            (btn[6] && btn[6] === btn[7] && btn[6] === btn[8]) ||
            (btn[0] && btn[0] === btn[3] && btn[0] === btn[6]) ||
            (btn[1] && btn[1] === btn[4] && btn[1] === btn[7]) ||
            (btn[2] && btn[2] === btn[5] && btn[2] === btn[8]) ||
            (btn[0] && btn[0] === btn[4] && btn[0] === btn[8]) ||
            (btn[2] && btn[2] === btn[4] && btn[2] === btn[6])) {

            setWinner(`${btn[0] || btn[3] || btn[6]} is the winner!`);
        }
    };

    const draw = () => {
        if (btn.every((value) => value !== "") && !winner) {
            setWinner("It's a draw!");
        }
    };

    const resetGame = () => {
        setbtns(["", "", "", "", "", "", "", "", ""]); // Resetting the button states
        setIsXNext(true);
        setWinner(null);
    };

    useEffect(() => {
        win();
        draw();
    }, [btn]);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.row}>
                    {btn.map((item, index) => (
                        <Pressable style={styles.btn} onPress={() => btnClick(index)} key={index}>
                            <Text style={styles.txt}>{item}</Text>
                        </Pressable>
                    ))}
                </View>
                <Pressable style={{ width: 80, marginTop: 10, backgroundColor: 'grey', padding: 10, borderRadius: 20, justifyContent: 'center', alignSelf: 'center' }} onPress={resetGame}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>RESET</Text>
                </Pressable>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'red' }}>{winner}</Text>
            </View>
        </View>
    )
}

export default Tictactoe1;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    btn: {
        height: 100,
        width: 100,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    txt: {
        color: 'white',
        fontSize: 80,
    },
});
