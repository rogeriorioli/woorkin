import React from 'react';

import PageHeaderContainer from './styles';

interface PageTitle {
  title?: string;
  description?: string;
  background?: string;
  height?: string;
}

const PageHeader = ({ background, description, title, height }: PageTitle) => {
  return (
    <PageHeaderContainer background={background} height={height}>
      <div className="container">
        <div className="row">
          <div className="column">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </PageHeaderContainer>
  );
};

export default PageHeader;
