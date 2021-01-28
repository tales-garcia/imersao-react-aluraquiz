import styled from 'styled-components'
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import GithubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';
import { useRouter } from 'next/router';
import Button from '../src/components/Button';

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

const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.contrastText};
  font-size: 18px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid #6200EE;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.mainBg};

  & + * {
    margin-top: 8px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.contrastText};
    opacity: 0.6;
  }
`;

export default function Home() {
  const [name, setName] = React.useState();
  const router = useRouter();

  const handleSubmit = React.useCallback(e => {
    e.preventDefault();

    router.push(`/quiz?nickname=${name}`);
  });

  return (
    <QuizBackground backgroundImage={db.bg} >
      <QuizContainer>
        <QuizLogo />
        <Widget title={db.title}>
          <p>{db.description}</p>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button disabled={!name} type="submit">
              Jogar
            </Button>
          </form>
        </Widget>
        <Widget>
          <h1>Quizes da galera</h1>
          <p>Lorem ipsum dolor sit amet...</p>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner />
    </QuizBackground>
  )
}
