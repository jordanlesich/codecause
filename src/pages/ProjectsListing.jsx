import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, Tag, Info } from "react-feather";

import TabMenu from "../components/tabMenu";
import TagSearch from "../tabs/tagSearch";
import Tab from "../components/tab";
import Layout from "../layouts/layout";
import ProjectListItem from "../components/projectListItem";
import { getProjects, queryProjectsByTag } from "../actions/project";
import { getColor } from "../helpers/palette";

const ListingSpace = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 2.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .listing-section {
    position: relative;
    z-index: 0;
    .listing-title {
      font-size: 3rem;
      margin-bottom: 2.5rem;
      font-weight: 300;
    }
  }
  /* .tag-section {
    margin-right: 6vw;
    background-color: ${getColor(
    "lightgrey"
  )};

    aside {
      height: 20rem;
      border-radius: 4px;
      width: 10rem;
      border: 1px solid ${getColor(
    "lightBorder"
  )};
    }
  } */
`;

const ProjectsPage = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setProjects(await getProjects());
    };
    if (projects == null) {
      fetchProjects();
    }
  }, []);
  const queryByTag = async ({ field, value }) => {
    setProjects(null);
    const newProjects = await queryProjectsByTag(field, value);
    setProjects(newProjects);
  };
  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "index",
          tabButton: <Info value="r" />,
          tabCard: <Tab content="Search For Projects" />,
        },
        {
          value: "chat",
          tabButton: <Tag value="tag-search" />,
          tabCard: <TagSearch queryByTag={queryByTag} />,
        },
        {
          value: "contributors",
          tabButton: <Search value="search" />,
          tabCard: <Tab content="Liked Projects" />,
        },
      ]}
    />
  );

  const renderProjects = () => {
    if (projects === null) {
      return <h1 className="listing-title"> Loading...</h1>;
    }
    if (projects.length === 0) {
      return <h1 className="listing-title"> No Results Found</h1>;
    }
    if (projects.length) {
      return (
        <>
          <h1 className="listing-title">{projects.length} Active Projects</h1>
          <ul>
            {projects.map((project) => (
              <ProjectListItem project={project} key={project.id} />
            ))}
          </ul>
        </>
      );
    } else {
      return <h1 className="listing-title"> Whoops! Something went wrong.</h1>;
    }
  };

  return (
    <Layout sideMenu={sideMenu}>
      <ListingSpace>
        <section className="listing-section">{renderProjects()}</section>
      </ListingSpace>
    </Layout>
  );
};

export default ProjectsPage;
