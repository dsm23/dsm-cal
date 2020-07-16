import React, { HTMLAttributes } from 'react';

const Small = (props: HTMLAttributes<HTMLElement>) => (
  <small className="text-red-600" {...props} />
);

export { Small };
