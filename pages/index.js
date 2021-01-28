import styled from 'styled-components'
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import GithubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';
import { useRouter } from 'next/router';

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
        <Widget title={db.title}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button disabled={!name} type="submit">
              Jogar
            </button>
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
