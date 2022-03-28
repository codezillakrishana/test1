import { Component } from 'react';
import {  Route, } from 'react-router-dom';
import Presidential  from './presidential/index';
import Dashboard from './dashboard/index';

class ViewMain extends Component {
  render() {
    return (
        <>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/presidential"
            element={<Presidential />}
          />
        </>
    );
  }
}

export default ViewMain;
