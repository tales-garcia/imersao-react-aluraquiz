import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.contrastText};
  padding: 10px 20px;
  font-size: 18px;
  font-weight:  500;
  font-family: 'Lato', serif;
  cursor: pointer;

  &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
  }
`;