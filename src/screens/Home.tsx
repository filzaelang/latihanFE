import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const quizData = [
        {
            id: 1,
            question: "Apa ibukota Indonesia ?",
            options: ["Jakarta", "IKN", "Yogyakarta", "Bukittinggi"],
            answer: "Jakarta",
        },
        {
            id: 2,
            question: "Di mana bung karno lahir ?",
            options: ["Rumah Kontrakan", "Indonesia", "Surabaya", "Bumi"],
            answer: "Rumah Kontrakan",
        }
    ]

    const handleAnswer = async (selectedAnswer: any) => {
        const answer = quizData[currentQuestion]?.answer;
        if (answer === selectedAnswer) {
            setScore((prevScore) => prevScore + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    }

    const handleRestart = async () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
    }

    return (
        <View style={styles.container}>
            {showScore ? <View>
                <Text style={styles.optionStyle}>{score}</Text>
                <TouchableOpacity style={styles.optionContainer} onPress={handleRestart}>
                    <Text style={styles.resetBtnText}>Reset</Text>
                </TouchableOpacity>
            </View> :
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}> {quizData[currentQuestion]?.question} </Text>
                    {quizData[currentQuestion]?.options.map((item) => {
                        return <TouchableOpacity onPress={() => handleAnswer(item)} style={styles.optionContainer}>
                            <Text style={styles.optionStyle}>{item}</Text>
                        </TouchableOpacity>
                    })

                    }
                </View>
            }
        </View>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionContainer: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    optionStyle: {
        color: "green",
        padding: 5,
        alignSelf: "center",
        fontSize: 20,
    },
    optionContainer: {
        borderColor: "black",
        borderWidth: 2,
        marginTop: 10,
    },
    questionText: {
        fontSize: 24,
    },
    resetBtnText: {
        fontSize: 18,
        paddingHorizontal: 10,
    }
}); 