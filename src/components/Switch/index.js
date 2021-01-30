import React from 'react';
import Button from '../Button';
import { Container, Option } from './styles';
import { motion, useAnimation } from 'framer-motion';

export default function Switch({ alternatives, selected, setSelected, correct, goToNextQuestion, ...rest }) {
    const [submited, setSubmited] = React.useState(false);
    const control = useAnimation();

    const handleSubmit = React.useCallback(async () => {
        setSubmited(true);

        await sleep(3000);

        setSubmited(false);
        goToNextQuestion();
    }, [goToNextQuestion]);

    const sleep = React.useCallback((ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }, [])

    React.useEffect(() => {
        control.set('hidden');
        control.start('shown');
    }, [alternatives]);

    return (
        <>
            <Container {...rest}>
                {alternatives.map((alternative, index) => (
                    <Option
                        key={index}
                        onClick={!submited ? (() => setSelected(index)) : undefined}
                        active={selected === index}
                        wrong={selected === index && submited && selected !== correct}
                        correct={selected === index && submited && selected === correct}
                        custom={index}
                        as={motion.li}
                        variants={{
                            shown: custom => ({
                                opacity: 1,
                                visibility: 'unset',
                                x: '0',
                                transition: { delay: (custom + 3.1) * 0.2, duration: 0.4 }
                            }),
                            hidden: { visibility: 'hidden', opacity: 0, x: '-35px' }
                        }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 1.03 }}
                        initial="hidden"
                        animate={control}
                    >
                        {alternative}
                    </Option>
                ))}
            </Container>
            <Button disabled={selected === undefined || submited} onClick={handleSubmit}>Confirmar</Button>
        </>
    );
}