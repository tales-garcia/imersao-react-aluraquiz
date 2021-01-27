import styled from 'styled-components'
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import GithubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';

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
  return (
    <QuizBackground backgroundImage={db.bg} >
      <QuizContainer>
        <Widget title="The legend of Zelda">
          <p>Lorem ipsum dolor sit amet...</p>
        </Widget>
        <Widget>
          <h1>Quizes da galera</h1>
          <p>Lorem ipsum dolor sit amet...</p>
        </Widget>
      </QuizContainer>
      <Footer />
      <GithubCorner />
    </QuizBackground>
  )
}
