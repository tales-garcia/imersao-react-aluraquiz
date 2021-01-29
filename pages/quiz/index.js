import styled from 'styled-components'
import db from '../../db.json';
import Footer from '../../src/components/Footer';
import QuizBackground from '../../src/components/QuizBackground';
import GithubCorner from '../../src/components/GithubCorner';
import QuizLogo from '../../src/components/QuizLogo';
import QuizWidget from '../../src/components/QuizWidget';

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

export default function Quiz() {
    return (
        <QuizBackground backgroundImage={db.bg} >
            <QuizContainer>
                <QuizLogo />
                <QuizWidget db={db} />
                <Footer />
            </QuizContainer>
            <GithubCorner />
        </QuizBackground>
    )
}