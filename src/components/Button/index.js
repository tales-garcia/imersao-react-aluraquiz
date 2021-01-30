import React from 'react';
import { Container } from './styles';

export default function Button({ children, ...rest }) {
    return (
        <Container
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            {...rest}
        >
            {children}
        </Container>
    );
}