import React from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Container, Alternative } from './styles';

export default function Result({ data, questionNumber, question }) {
    const [isOpen, setIsOpen] = React.useState(undefined);
    const control = useAnimation();

    const toggleOn = React.useCallback(async () => {
        if(isOpen) {
            await control.start('hidden');
        }
        setIsOpen(!isOpen);
    }, [control, isOpen, setIsOpen]);

    React.useEffect(() => {
        if(isOpen) {
            control.set('hidden');
            control.start('shown');
        }
    }, [isOpen, control]);


    return (
        <Container
            questionResult={data.correct}
            layout
            onClick={toggleOn}
        >
            <div>Pergunta {questionNumber + 1} <span>{data.correct ? 'Acertou' : 'Errou'}</span></div>
            <AnimatePresence>{isOpen && (
                <motion.section
                    style={{ overflow: 'hidden' }}
                    layout
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                >
                    <h4>{question.title}</h4>
                    <p>{question.description}</p>
                    <ul>
                        {question.alternatives.map((alternative, index) => (
                            <Alternative
                                anwsered={index === data.anwser}
                                custom={index}
                                key={index}
                                variants={{
                                    shown: custom => ({
                                        x: '0%',
                                        opacity: 1,
                                        transition: { delay: custom * 0.2 }
                                    }),
                                    hidden: custom => ({
                                        x: '-20%',
                                        opacity: 0,
                                        transition: { delay: custom * 0.2 }
                                    })
                                }}
                                animate={control}
                            >
                                {alternative}
                            </Alternative>
                        ))}
                    </ul>
                </motion.section>
            )}</AnimatePresence>
        </Container>
    );
}