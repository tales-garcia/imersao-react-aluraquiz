import React from 'react';
import Switch from '../../../src/components/Switch';
import Widget from '../../../src/components/Widget';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const GoBack = styled.span`
  margin-right: 12px;
  cursor: pointer;
`;

const Result = styled.li`
    color: ${({ theme }) => theme.colors.contrastText};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.primary}70;
    border: 2px solid ${({ theme, questionResult }) => questionResult ? theme.colors.success : theme.colors.wrong};

    & + li {
        margin-top: 8px;
    }

    > span {
        color: ${({ theme, questionResult }) => questionResult ? theme.colors.success : theme.colors.wrong};
        font-weight: 600;
    }
`;

export default function QuizWidget({ db }) {
    const { back } = useRouter();
    const [selected, setSelected] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);
    const [question, setQuestion] = React.useState(0);
    const [results, setResults] = React.useState([]);

    const goToNextQuestion = React.useCallback(() => {
        setResults([...results, db.questions[question].answer === selected]);
        setQuestion(question + 1);
        setSelected(undefined);
    }, [question, selected, setQuestion, setSelected, setResults]);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 100);
    }, []);

    return loading ? (
        <Widget title="Carregando...">
            Carregando...
        </Widget>
    ) : (
            <Widget
                title={(
                    <>
                        {db.questions[question] ? (
                            <>
                                <GoBack onClick={back}>{"<"}</GoBack>
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
                        <h3>{db.questions[question].title}</h3>
                        <p>{db.questions[question].description}</p>

                        <Switch
                            alternatives={db.questions[question].alternatives}
                            correct={db.questions[question].answer}
                            selected={selected}
                            setSelected={setSelected}
                            goToNextQuestion={goToNextQuestion}
                        />
                    </>
                ) : (
                        <>
                            <p>Você acertou {results.filter(result => result).length} de {db.questions.length} questões!</p>
                            <ul>
                                {results.map((result, index) => (
                                    <Result questionResult={result} key={index}>
                                        Pergunta {index + 1} <span>{result ? 'Acertou' : 'Errou'}</span>
                                    </Result>
                                ))}
                            </ul>
                        </>
                    )}
            </Widget>
        );
}