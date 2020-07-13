import React, { HTMLAttributes } from 'react';

const Small = (props: HTMLAttributes<HTMLDivElement>) => (
  <small className="text-red-600" {...props} />
);

export { Small };
