import React from 'react';
import { Container } from './styles';
import { motion } from 'framer-motion';

export default function Widget({ title, children, image, ...rest }) {
    return (
        <Container
            transition={{ delay: 0, duration: 0.4 }}
            as={motion.section}
            variants={{
                shown: { opacity: 1, x: '0' },
                hidden: { opacity: 0, x: '-20%' }
            }}
            initial="hidden"
            animate="shown"
            {...rest}
        >
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