import React, { useState, useContext } from "react";
import styled from "styled-components";
import { PlusCircle } from "react-feather";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

import { AuthContext } from "../contexts/authContext";
import EditModal from "../components/editModal";
import WarnDeleteModal from "../components/warnDeleteModal";
import AddSectionModal from "../components/addSectionModal";
import MoveSectionModal from "../components/moveSectionModal";
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
  const [sections, setSections] = useState([...project.body]);
  const [editModal, toggleEdit] = useToggle(false);
  const [deleteModal, toggleDelete] = useToggle(false);
  const [addModal, toggleAdd] = useToggle(false);
  const [moveModal, toggleMove] = useToggle(false);
  // const [applyModal, toggleApply] = useToggle(false);
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

  const selectAndDisplay = (index, action) => {
    const toggleModalEnum = Object.freeze({
      edit: toggleEdit,
      delete: toggleDelete,
      add: toggleAdd,
      move: toggleMove,
    });
    setSelectedSection({ ...sections[index] });
    toggleModalEnum[action]();
  };

  const saveSections = (newSections, toggleFn) => {
    replaceSections(
      newSections,
      project.slug,
      setSections,
      setLoading,
      toggleFn
    );
    setSelectedSection({});
  };

  const saveAdd = (newSection) => {
    saveSections([...sections, newSection], toggleAdd);
  };

  const saveDelete = (e) => {
    e.preventDefault();
    const newSections = sections.filter(
      (section) => section.id !== selectedSection.id
    );
    saveSections(newSections, toggleDelete);
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
    saveSections(newSections, toggleEdit);
  };
  const handleEditTyping = (e) => {
    setSelectedSection({ ...selectedSection, [e.target.name]: e.target.value });
  };
  const saveMove = (e) => {
    const newIndex = e.target.value;
    const filteredSections = sections.filter(
      (section) => section.id !== selectedSection.id
    );
    const newSections = [
      ...filteredSections.slice(0, newIndex),
      { ...selectedSection },
      ...filteredSections.slice(newIndex, sections.length),
    ];
    setSelectedSection(sections[newIndex]);
    saveSections(newSections, toggleMove);
  };

  return (
    <>
      <Paper>
        {editModal && (
          <EditModal
            toggleModal={toggleEdit}
            handleEditTyping={handleEditTyping}
            saveEdit={saveEdit}
            selectedSection={selectedSection}
          />
        )}
        {deleteModal && (
          <WarnDeleteModal
            toggleModal={toggleDelete}
            saveDelete={saveDelete}
            selectedSection={selectedSection}
          />
        )}
        {addModal && (
          <AddSectionModal toggleModal={toggleAdd} saveAdd={saveAdd} />
        )}
        {moveModal && (
          <MoveSectionModal
            toggleModal={toggleMove}
            saveMove={saveMove}
            sections={sections}
            currentIndex={sections.findIndex(
              (s) => s.id === selectedSection.id
            )}
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
        <Button content={<PlusCircle />} className="primary" fn={toggleAdd} />
      </Paper>
    </>
  );
};

export default WhitePaper;
