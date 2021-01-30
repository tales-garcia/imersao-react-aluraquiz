import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.li)`
    color: ${({ theme }) => theme.colors.contrastText};
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.mainBg};
    border: 2px solid ${({ theme, questionResult }) => questionResult ? theme.colors.success : theme.colors.wrong};

    & + li {
        margin-top: 8px;
    }

    > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    > div > span {
        color: ${({ theme, questionResult }) => questionResult ? theme.colors.success : theme.colors.wrong};
        font-weight: 600;
    }
`;

export const Alternative = styled(motion.li)`
    display: block;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.primary}70;
    border: 2px solid ${({ theme, anwsered }) => anwsered ? theme.colors.contrastText : theme.colors.mainBg};
    border-radius: ${({ theme }) => theme.borderRadius};

    & + li {
        margin-top: 4px;
    }
`;
