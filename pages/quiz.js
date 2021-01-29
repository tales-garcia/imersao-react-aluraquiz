import styled from 'styled-components'
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import GithubCorner from '../src/components/GithubCorner';
import Switch from '../src/components/Switch';
import Widget from '../src/components/Widget';
import { useRouter } from 'next/router';
import QuizLogo from '../src/components/QuizLogo';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

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
    background-color: rgba(63, 81, 181, 0.2);
    border: 2px solid ${({ theme, questionResult }) => questionResult ? theme.colors.success : theme.colors.wrong};

    & + li {
        margin-top: 8px;
    }

    > span {
        color: ${({ theme, questionResult }) => questionResult ? theme.colors.success : theme.colors.wrong};
        font-weight: 600;
    }
`;

export default function Quiz() {
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

    return (
        <QuizBackground backgroundImage={db.bg} >
            <QuizContainer>
                <QuizLogo />
                {loading ? (
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
                    )}
                <Footer />
            </QuizContainer>
            <GithubCorner />
        </QuizBackground>
    )
}