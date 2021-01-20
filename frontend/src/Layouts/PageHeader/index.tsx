import React from 'react';

import PageHeaderContainer from './styles';

interface PageTitle {
  title: string;
  description: string;
  background: string;
}

const PageHeader = ({ background, description, title }: PageTitle) => {
  return (
    <PageHeaderContainer background={background}>
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
