import React from 'react';
import Switch from '../../../src/components/Switch';
import Widget from '../../../src/components/Widget';
import styled from 'styled-components';
import BackLinkArrow from '../BackLinkArrow';
import loading from '../../assets/lotties/loading.json';
import Lottie from 'react-lottie';
import { AnimateSharedLayout, motion, useAnimation } from 'framer-motion';
import Result from '../Result';

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


export default function QuizWidget({ db }) {
    const [selected, setSelected] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);
    const [question, setQuestion] = React.useState(0);
    const [results, setResults] = React.useState([]);
    const questionControl = useAnimation();
    const ref = React.useRef(null);
    const ref2 = React.useRef(null);

    const goToNextQuestion = React.useCallback(async () => {
        await questionControl.start('go');
        questionControl.set('come');

        setResults([...results, {
            correct: db.questions[question].answer === selected,
            anwser: selected
        }]);
        setQuestion(question + 1);
        setSelected(undefined);

        if (ref2.current) {
            ref2.current.style.opacity = 1;
            ref2.current.style.transform = 'unset';
        }
        if (ref.current) {
            ref.current.style.visibility = 'hidden';
        }
    }, [question, selected, setQuestion, setSelected, setResults]);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, []);

    React.useEffect(() => {
        questionControl.set('come');
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
                            ref={ref2}
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
                        {!!db.questions[question + 1] && (
                            <NextQuestion
                                variants={{
                                    come: { x: 'calc(100% + 32px)', opacity: 0 },
                                    right: { x: '200%', opacity: 0 },
                                    go: { x: '0%', opacity: 1, visibility: 'unset' }
                                }}
                                ref={ref}
                                initial="right"
                                animate={questionControl}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <h3>{db.questions[question + 1].title}</h3>
                                <p>{db.questions[question + 1].description}</p>
                                <Switch
                                    alternatives={db.questions[question + 1].alternatives}
                                    correct={db.questions[question + 1].answer}
                                    selected={undefined}
                                    style={{ visibility: 'hidden' }}
                                    setSelected={setSelected}
                                    goToNextQuestion={goToNextQuestion}
                                />
                            </NextQuestion>
                        )}
                    </>
                ) : (
                        <>
                            <p>Você acertou {results.filter(result => result).length} de {db.questions.length} questões!</p>
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