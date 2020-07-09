import React, { FunctionComponent, ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';

interface Props {
  children: ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
