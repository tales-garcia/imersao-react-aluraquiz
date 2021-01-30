import React from 'react';
import NextLink from 'next/link';

export default React.forwardRef(function Link({ href, children, className, ...rest }, ref) {
  return (
    <NextLink href={href}>
        <a ref={ref} className={className} {...rest}>{children}</a>
    </NextLink>
  );
});
