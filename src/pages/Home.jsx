import React from "react";
import { Link } from "react-router-dom";

import Layout from "../layouts/layout";

const HomePage = () => (
  <Layout>
    <h1>This is a test!</h1>
    <div>
      <Link to="/projects" role="button">
        View Projects
      </Link>
    </div>
  </Layout>
);

export default HomePage;
