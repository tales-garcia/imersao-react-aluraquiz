import React from 'react';
import Switch from '../../../src/components/Switch';
import Widget from '../../../src/components/Widget';
import styled from 'styled-components';
import BackLinkArrow from '../BackLinkArrow';
import loading from '../../assets/lotties/loading.json';
import wrong from '../../assets/lotties/wrong.json';
import correct from '../../assets/lotties/correct.json';
import Lottie from 'react-lottie';
import { AnimateSharedLayout, motion, useAnimation } from 'framer-motion';
import Result from '../Result';
import { useRouter } from 'next/router';

const GoBack = styled(BackLinkArrow)`
  margin-right: 16px;
  cursor: pointer;
  text-align: center;
`;

const NextQuestion = styled(motion.div)`
    position: absolute;
    top: 24px;
    width: calc(100% - 64px);
`;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const correctOptions = {
    loop: true,
    autoplay: true,
    animationData: correct,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const wrongOptions = {
    loop: true,
    autoplay: true,
    animationData: wrong,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function QuizWidget({ db }) {
    const [selected, setSelected] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);
    const [question, setQuestion] = React.useState(0);
    const { nickname } = useRouter().query;
    const [results, setResults] = React.useState([]);
    const questionControl = useAnimation();
    const answerControl = useAnimation();



    const goToNextQuestion = React.useCallback(async () => {
        setResults([...results, {
            correct: db.questions[question].answer === selected,
            anwser: selected
        }]);
        answerControl.set('right');
        await Promise.all([
            answerControl.start('come'),
            questionControl.start('go')
        ]);

        await sleep(1000);
        answerControl.set('come');
        answerControl.start('go');

        setQuestion(question + 1);
        setSelected(undefined);

    }, [question, selected, setQuestion, setSelected, setResults]);

    const sleep = React.useCallback(ms => new Promise(resolve => setTimeout(resolve, ms)));

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, []);

    React.useEffect(() => {
        questionControl.set('right');
        questionControl.start('come');
    }, [question]);

    return loading ? (
        <Widget title="Carregando...">
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
            />
        </Widget>
    ) : (
            <Widget
                title={(
                    <>
                        {db.questions[question] ? (
                            <>
                                <GoBack href='/' />
                                Pergunta {question + 1} de {db.questions.length}
                            </>
                        ) : (
                                'Resultado'
                            )}
                    </>
                )}
                image={question !== db.questions.length && db.questions[question].image}
            >
                {question !== db.questions.length ? (
                    <>
                        <motion.div
                            variants={{
                                come: { x: '0%', opacity: 1 },
                                right: { x: '100%', opacity: 0 },
                                go: { x: '-100%', opacity: 0 }
                            }}
                            initial={!!question && "right"}
                            animate={questionControl}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h3>{db.questions[question].title}</h3>
                            <p>{db.questions[question].description}</p>
                            <Switch
                                alternatives={db.questions[question].alternatives}
                                correct={db.questions[question].answer}
                                selected={selected}
                                setSelected={setSelected}
                                goToNextQuestion={goToNextQuestion}
                            />
                        </motion.div>
                        {!!results.length && (
                            <NextQuestion
                                variants={{
                                    come: { x: '0%' },
                                    right: { x: '120%' },
                                    go: { x: '-120%' }
                                }}
                                initial="right"
                                animate={answerControl}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <Lottie
                                    options={!results[question] ? results[question-1].correct ? correctOptions : wrongOptions
                                    :
                                    results[question].correct ? correctOptions : wrongOptions}
                                />
                            </NextQuestion>
                        )}
                    </>
                ) : (
                        <>
                            <p>{!!nickname && `Parabéns ${nickname}! `}Você acertou {results.filter(result => result.correct).length} de {db.questions.length} questões!</p>
                            <ul>
                                <AnimateSharedLayout>
                                    {results.map((result, index) => (
                                        <Result
                                            data={result}
                                            key={index}
                                            questionNumber={index}
                                            question={db.questions[index]}
                                        />
                                    ))}
                                </AnimateSharedLayout>
                            </ul>
                        </>
                    )}
            </Widget>
        );
}