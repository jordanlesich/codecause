import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import { TagSearchProvider } from "../contexts/tagSearchContext";
import SideMenu from "../components/sideMenu";
import TagSearch from "../tabs/tagSearch";
import MainPanel from "../tabs/mainPanel";
import InfoButton from "../components/infoButton";
import Chip from "../components/chip";
import Layout from "../layouts/layout";
import ProjectListItem from "../components/projectListItem";
import {
  getProjects,
  queryProjectsByTag,
  queryProjectsByName,
} from "../actions/project";
import { listingInfo } from "../copy/infoText";
import { DisplayLg, DisplayMd, BodySm, HeaderMd } from "../styles/typography";

const ListingSpace = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .listing-section {
    width: 100%;
  }

  .title-section {
    display: flex;
    align-items: flex-end;
    margin-bottom: 2.4rem;
    span {
      transform: translate(0.32rem, -0.24rem);
    }
  }
  .tag-chips {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.6rem;
    button {
      margin-right: 1.6rem;
      margin-bottom: 0.8rem;
    }
  }
`;

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState(null);
  const [sideMenu, setSideMenu] = useState("main");
  const { user } = useAuth();
  console.log("rendering listing");
  const routerData = props.location.state;

  //this useEffect is used to list projects when someone chooses to search
  //projects by tag from another page. The router props passes in the query state.
  //this useEffect listens to that state, if it undefined (router's choice, null doesn't work)
  //then we fetch all projects. If there is state, we fetch with that query.
  useEffect(() => {
    if (routerData !== undefined) {
      queryByTag(routerData);
    } else {
      fetchProjects();
    }
  }, [routerData]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const fetchProjects = async () => {
    const projects = await getProjects();
    setProjects(projects);
  };
  const queryByTag = async ({ field, value }) => {
    setProjects(null);
    const newProjects = await queryProjectsByTag(field, value);
    setProjects(newProjects);
  };

  const queryByName = async (name) => {
    if (name === "") return;
    const result = await queryProjectsByName(name);
    setProjects(result);
  };

  const switchSideMenu = (e) => {
    const val = e.target.value;
    if (val === sideMenu) {
      setSideMenu("main");
    } else {
      setSideMenu(val);
    }
  };
  const info = (
    <div className="modal-body">
      <DisplayMd className="title">{listingInfo.title}</DisplayMd>
      <ul className="section-list">
        {listingInfo.sections.map((section) => (
          <li key={section.heading} className="section">
            <HeaderMd className="section-heading">{section.heading}</HeaderMd>
            <BodySm>{section.body}</BodySm>
          </li>
        ))}
      </ul>
    </div>
  );

  const sidePanel = (
    <SideMenu
      currentOption={sideMenu}
      options={{
        main: <MainPanel queryByName={queryByName} />,
        skill: (
          <TagSearch
            tagType="skill"
            sideMenu={setSideMenu}
            key="skill-search"
          />
        ),
        cause: (
          <TagSearch
            tagType="cause"
            sideMenu={setSideMenu}
            key="cause-search"
          />
        ),
        solution: (
          <TagSearch
            tagType="solution"
            sideMenu={setSideMenu}
            key="solution-search"
          />
        ),
      }}
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
          <div className="title-section">
            <DisplayLg>Browse</DisplayLg>
            <InfoButton className="info-btn" toggle content={info} />
          </div>
          <div className="tag-chips">
            <Chip
              initialStr="Cause Tags"
              value="cause"
              fn={switchSideMenu}
              selected={sideMenu === "cause"}
            />
            <Chip
              initialStr="Solution Tags"
              value="solution"
              fn={switchSideMenu}
              selected={sideMenu === "solution"}
            />
            <Chip
              initialStr="Skill Tags"
              value="skill"
              fn={switchSideMenu}
              selected={sideMenu === "skill"}
            />
          </div>
          <ul className="listing-section">
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
    <TagSearchProvider setProjects={setProjects}>
      <Layout sideMenu={sidePanel}>
        <ListingSpace>{renderProjects()}</ListingSpace>
      </Layout>
    </TagSearchProvider>
  );
};

export default ProjectsPage;
