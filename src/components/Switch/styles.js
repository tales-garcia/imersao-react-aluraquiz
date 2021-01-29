import styled, { css } from 'styled-components';

export const Container = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const Option = styled.li`
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.primary + '70'};
    transition: opacity .3s;

    ${({ wrong }) => wrong && css`
        background-color: ${({ theme }) => theme.colors.wrong};
    `}

    ${({ correct }) => correct && css`
        background-color: ${({ theme }) => theme.colors.success};
    `}

    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 10px 20px;
    cursor: pointer;

    & + li {
        margin-top: 8px;
    }
    &:hover {
        opacity: 0.6;
    }
`;
