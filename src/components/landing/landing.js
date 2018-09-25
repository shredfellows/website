import React from 'react';

import './landing.css';

import sflogo from '../../assets/img/shred-logo-landing.png';

export default class Landing extends React.Component {
  render() {
    return(
      <section className="landing-overlay">
        <img alt="shred fellows logo" src={sflogo} />
      </section>
    );
  }
}