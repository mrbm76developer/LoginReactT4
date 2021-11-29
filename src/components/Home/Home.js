import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import './Home.css';
import Button from "../UI/Button/Button";
import AuthContext from "../Store/AuthContext";

const Home = (props) => {
    const ctx=useContext(AuthContext);
  return (
    <Card className="home">
      <h1>Welcome back!</h1>
        <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
