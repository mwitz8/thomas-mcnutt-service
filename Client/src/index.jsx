import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import App from './components/App';
import '../dist/styles.css';

// eslint-disable-next-line no-undef

const generateClassName = createGenerateClassName({
  productionPrefix: 'thomas',
  seed: 'McNutt',
});

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}><App /></StylesProvider>, document.getElementById('thomas'),
);
