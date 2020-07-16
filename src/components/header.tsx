import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'gatsby';

interface Props extends HTMLAttributes<HTMLElement> {
  siteTitle: string;
}

const Header: FunctionComponent<Props> = ({ siteTitle = '', ...props }) => (
  <header className="bg-purple-900 mb-6" {...props}>
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-white text-3xl m-0">{siteTitle}</h1>
    </div>
  </header>
);

export default Header;
