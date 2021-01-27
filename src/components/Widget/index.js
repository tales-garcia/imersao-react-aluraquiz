import React from 'react';
import { Container } from './styles';

export default function Widget({ title, children }) {
    return (
        <Container>
            {title &&
            (<Container.Header>
                <h1>{title}</h1>
            </Container.Header>)}
            <Container.Content>
                {children}
            </Container.Content>
        </Container>
    );
}