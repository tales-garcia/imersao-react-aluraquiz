import React from 'react';
import { Container } from './styles';

export default function Widget({ title, children, image }) {
    return (
        <Container>
            {title &&
            (<Container.Header>
                <h1>{title}</h1>
            </Container.Header>)}
            {image &&
            (<img src={image} alt="Question image" />)}
            <Container.Content>
                {children}
            </Container.Content>
        </Container>
    );
}