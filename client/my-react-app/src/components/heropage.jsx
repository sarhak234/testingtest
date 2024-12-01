import React, { useState, useEffect } from 'react';
import Header from './header';
import Questions from './questions';
import axios from 'axios';

function HeroPage() {
  
  return (
    <>
    <Header/>
    <Questions/>
    </>
  );
}

export default HeroPage;
