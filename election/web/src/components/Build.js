import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import 'github-markdown-css'
const ReactMarkdown = require('react-markdown')
const mdPath = require('../data/buildpagecontent.md')

function Build() {
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    fetch(mdPath).then((response) => response.text()).then((text) => {
      setMarkdown(text)
    })
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Build for US General Election 2020</title>
        <meta
          name="title"
          content="APIs Related to US General Election 2020"
        />
      </Helmet>
      <div className="jumbotron">
        <h1>Build for US General Election 2020</h1>
      </div>
      <div className="Build">
      <div className='markdown-body'>
        <ReactMarkdown
          source={markdown}
          escapeHtml={false}
        />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Build;
