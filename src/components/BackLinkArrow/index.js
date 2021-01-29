import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledLink = styled(Link)`
  transition: .3s;
  width: 28px;
  height: 28px;
  display: inline-block;
  &:hover {
    opacity: .5;
  }
  svg {
    width: 28px;
    height: 28px;
  }
`;

const SVG = styled.svg`
  vertical-align: middle;
`;

export default function BackLinkArrow({ href, className }) {
  return (
    <StyledLink href={href} className={className}>
      <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="white" fillOpacity="0.87" />
      </SVG>
    </StyledLink>
  );
}
