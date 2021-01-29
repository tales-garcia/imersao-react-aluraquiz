import styled from 'styled-components'
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import GithubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';
import { useRouter } from 'next/router';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

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

const QuizLink = styled(Link)`
  width: 100%;
  display: block;
  text-decoration: none;
  border: 0;
  background-color: ${({ theme }) => theme.colors.primary}70;
  transition: opacity .3s;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.contrastText};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  * + & {
    margin-top: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.contrastText};
  font-size: 18px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.primary};
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
          {db.external.map(link => {
            const [projectName, username] = link
            .replace('https://', '')
            .replace(/\//g, '')
            .replace('.vercel.app', '')
            .split('.');

            return (
              <QuizLink
                href={`/quiz/${!!username ? username : ''}_${projectName}`}
                // onClick={() => router.push(`/quiz/${!!username ? username : ''}_${projectName}`)}
                key={`${username}_${projectName}`}
              >
                {`${!!username ? username + '/' : ''}${projectName}`}
              </QuizLink>
            )
          })}
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner />
    </QuizBackground>
  )
}
