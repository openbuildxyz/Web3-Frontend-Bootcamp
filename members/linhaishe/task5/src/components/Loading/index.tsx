import React from 'react';
import './index.scss';

function Loading({ isLoading }) {
  return <>{isLoading && <div className='loading-wrap'>loading...</div>}</>;
}

export default Loading;
