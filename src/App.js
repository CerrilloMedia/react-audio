import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumPage: false
    };
  }

  albumPage(path) {
    this.setState({
        albumPage: (path === "/album/:slug")
    });
  };

  toggleResizeEvent() {
      console.log("WindowCheck fired");
      var footer = document.getElementsByClassName("footer")[0];
      var pageHeight = document.getElementsByTagName("html")[0].getBoundingClientRect().height;
      var rootHeight = document.getElementById("root").getBoundingClientRect().height;

      if (typeof footer != 'undefined') {
        pageHeight > rootHeight ? footer.style.position = "fixed" : footer.style.position = "inherit";
      }
  };

  render() {

    return (
      <div className="App">
      <NavigationBar />
        <main>
          <Route exact path="/"       render={ (props) => <Landing {...props} toggleResizeEvent={ () => this.toggleResizeEvent() } /> } />
          <Route exact path="/library" render={ (props) => <Library {...props} toggleResizeEvent={ () => this.toggleResizeEvent() } /> } />
          <Route path="/album/:slug"  render={ (props) => <Album {...props} albumPage={(path) => this.albumPage(path)} />} />
        </main>
        { !this.state.albumPage && <Footer/> }
      </div>
    );
  }
}

export default App;
