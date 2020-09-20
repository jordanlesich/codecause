import React, { useState, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

import { AuthContext } from "../contexts/authContext";
import EditModal from "../components/editModal";
import Section from "../components/section";
import Button from "../components/button";
import DynamicSection from "../components/dynamicSection";
import Tag from "../components/tag";
import useToggle from "../Hooks/useToggle";
import { getColor } from "../helpers/palette";
import { replaceSections } from "../actions/project";

const Paper = styled.div`
  grid-column: 3/4;
  background-color: ${getColor("white")};
  border: 1px solid ${getColor("lightBorder")};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: none;
  color: rgba(41, 41, 41, 1);
  padding-top: 3rem;
  .top-section {
    margin: 3rem 6rem 3rem 4rem;
  }
  .paper-title {
    line-height: 48px;
    font-size: 3.2rem;
    font-weight: 300;
    margin: 0rem 6rem 3rem 4rem;
  }
  .heading {
    font-size: 1.8rem;
    letter-spacing: -0.022em;
    font-weight: 600;
    margin-bottom: 0.5rem;
    word-break: break-word;
    padding-right: 6rem;
  }
`;

const handleDateFormat = (date) => format(date, "MM/dd/yyyy");
const getDate = (project) => {
  if (project.lastUpdated) return handleDateFormat(project.lastUpdated);
  if (project.timeCreated) return handleDateFormat(project.timeCreated);
  else return "Error: No date found";
};

const WhitePaper = ({ project }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [sections, setSections] = useState(project.body);
  const [editModal, toggleModal] = useToggle(false);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});

  const searchByTag = ({ field, value }) => {
    history.push({
      pathname: "/projects",
      state: { field, value },
    });
  };
  const getBodytext = () => {
    if (!sections) {
      return <h2>Error: Sections not found</h2>;
    } else if (sections?.length === 0) {
      return <h2>There are no more sections</h2>;
    } else if (!user?.profile) {
      return <h2>Must have an account to see project details</h2>;
    } else if (user.profile.displayName === project.creator) {
      return sections.map((section, index) => {
        return (
          <DynamicSection
            id={section.id}
            key={section.id}
            index={index}
            label={section.label}
            text={section.text}
            selectAndDisplay={selectAndDisplay}
          >
            {section.text}
          </DynamicSection>
        );
      });
    } else if (user?.profile) {
      return sections.body.map((section) => (
        <Section key={section.id} label={section.label}>
          <p>{section.text}</p>
        </Section>
      ));
    } else {
      return <h2>There was an unknown error</h2>;
    }
  };

  const selectAndDisplay = (index) => {
    setSelectedSection({ ...sections[index] });
    toggleModal(true);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const newSections = sections.map((section) => {
      if (section.id === selectedSection.id) {
        return selectedSection;
      } else {
        return section;
      }
    });
    replaceSections(
      newSections,
      project.slug,
      setSections,
      setLoading,
      toggleModal
    );
  };
  const handleEditTyping = (e) => {
    setSelectedSection({ ...selectedSection, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Paper>
        {editModal && (
          <EditModal
            toggleModal={toggleModal}
            handleEditTyping={handleEditTyping}
            saveEdit={saveEdit}
            selectedSection={selectedSection}
          />
        )}
        <h2 className="paper-title">{project.name || "Error: No Title"}</h2>
        <div>
          <div className="top-section">
            {project.creator} is building a{" "}
            <Tag
              type="solution"
              text={project.solutionTag}
              fn={searchByTag}
              value={project.solutionTag}
            />{" "}
            for
            <Tag
              type="cause"
              text={project.causeTag}
              fn={searchByTag}
              value={project.causeTag}
            />
            <p>
              They are looking for:{" "}
              {project.skillTags.map((tag) => (
                <Tag
                  type="skill"
                  text={tag}
                  key={tag}
                  fn={searchByTag}
                  value={tag}
                />
              ))}
            </p>
            <p>Last updated: {getDate(project)}</p>
          </div>
          {getBodytext()}
        </div>
      </Paper>
    </>
  );
};

export default WhitePaper;
