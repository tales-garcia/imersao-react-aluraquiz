import React from 'react';
import Button from '../Button';
import { Container, Option } from './styles';

export default function Switch({ alternatives, selected, setSelected, correct, goToNextQuestion }) {
    const [submited, setSubmited] = React.useState(false);

    const handleSubmit = React.useCallback(async () => {
        setSubmited(true);

        await sleep(3000);

        setSubmited(false);
        goToNextQuestion();
    }, [goToNextQuestion]);

    const sleep = React.useCallback((ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }, [])

    return (
        <>
            <Container>
                {alternatives.map((alternative, index) => (
                    <Option
                        key={index}
                        onClick={!submited ? (() => setSelected(index)) : undefined}
                        active={selected === index}
                        wrong={selected === index && submited && selected !== correct}
                        correct={selected === index && submited && selected === correct}
                    >
                        {alternative}
                    </Option>
                ))}
            </Container>
            <Button disabled={selected === undefined || submited} onClick={handleSubmit}>Confirmar</Button>
        </>
    );
}