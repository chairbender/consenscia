import PaperList from './PaperList.jsx'
import SiteWideHeader from './SiteWideHeader.jsx'
import PaperCreator from './PaperCreator.jsx'
import ReactDOM from 'react-dom'
import React from 'react'
import '../sass/main.scss'

ReactDOM.render(
  <div>
    <SiteWideHeader />
    <div className="container">
      <PaperList />
      <PaperCreator />
    </div>
  </div>,

  document.getElementById('app'));
