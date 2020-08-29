import React from 'react';
import { withRouter } from ‘react-router-dom‘;
import WithRouterSample from ‘./WithRouterSample‘;
 
const Profile = ({ match }) => {
    const { username } = match.params;
    const profile = data[username];
    if (!profile) {
      return <div>존재하지 않는 사용자입니다.</div>;
    }
    return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>
 
      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};
 
export default withRouter(Profile);