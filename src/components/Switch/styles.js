import styled, { css } from 'styled-components';
import db from '../../../db.json';

export const Container = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const Option = styled.li`
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : 'rgba(63, 81, 181, 0.2)'};

    ${({ wrong }) => wrong && css`
        background-color: ${({ theme }) => theme.colors.wrong};
    `}

    ${({ correct }) => correct && css`
        background-color: ${({ theme }) => theme.colors.success};
    `}

    border-radius: ${db.theme.borderRadius};
    padding: 10px 20px;
    cursor: pointer;

    & + li {
        margin-top: 8px;
    }
`;
