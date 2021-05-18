import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ViewerType, NotifyType } from '@/lib/types';
import { withAuth } from '@/hocs/withAuth';
import { Books } from '@/pages/Books';
import { Home } from '@/pages/Home';
import { Host } from '@/pages/Host';
import { Listing } from '@/pages/Listing';
import { Listings } from '@/pages/Listings';
import { NotFound } from '@/pages/NotFound';
import { User } from '@/pages/User';
import { Login } from '@/pages/Login/Login';
import { Notification, Types } from '@/components/Notification';
import { Header } from '@/components/Header';

import './app.css';

type Props = {
  viewer: ViewerType;
  notify: NotifyType;
  setViewer: (viewer: ViewerType) => void;
  setNotify: (notify: NotifyType) => void;
};

export const App = withAuth((props) => {
  const { viewer, notify, setViewer, setNotify } = props as Props;

  return (
    <div className={viewer.id ? 'app app_white' : 'app'}>
      {notify.status && (
        <Notification
          type={notify.type as Types}
          message={notify.message}
          onClose={() =>
            setNotify({
              status: false,
              type: '',
              message: ''
            })
          }
        />
      )}

      <Router>
        <Header viewer={viewer} setViewer={setViewer} setNotify={setNotify} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route path="/listings/:location" component={Listings} />
          <Route
            path="/profile/:id"
            render={(props) => <User {...props} viewer={viewer} />}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} setViewer={setViewer} setNotify={setNotify} />
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
});
