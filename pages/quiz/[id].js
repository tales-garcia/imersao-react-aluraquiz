import React from 'react';
import QuizWidget from '../../src/components/QuizWidget';
import Footer from '../../src/components/Footer';
import QuizBackground from '../../src/components/QuizBackground';
import GithubCorner from '../../src/components/GithubCorner';
import QuizLogo from '../../src/components/QuizLogo';
import styled, { ThemeProvider } from 'styled-components';

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

export default function OtherQuiz({ externalDb }) {
    return (
        <ThemeProvider theme={externalDb.theme}>
            <QuizBackground backgroundImage={externalDb.bg} >
                <QuizContainer>
                    <QuizLogo />
                    <QuizWidget db={externalDb} />
                    <Footer />
                </QuizContainer>
                <GithubCorner />
            </QuizBackground>
        </ThemeProvider>
    )
}

export async function getServerSideProps(context) {
    const [username, projectName] = context.query.id.split('_');
    const parsedUrl = `https://${projectName}${!!username ? '.' + username : ''}.vercel.app/api/db`;

    const externalDb = await (await fetch(parsedUrl)).json();

    return {
        props: {
            externalDb
        }
    };
}