import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { DisplaySm } from "../styles/typography";
import { getColor } from "../helpers/palette";
import Button from "../components/button";
import DynamicSection from "../components/dynamicSection";
import { useContext } from "react";
import { OverlayContext } from "../contexts/overlayContext";
import Break from "../components/break";
import AddSection from "../modals/addSection";
import { Plus } from "react-feather";
import { editProjectBody } from "../actions/editProject";

const BodySection = styled.ul`
  list-style: none;
  margin-bottom: 5.6rem;
  .title {
    margin-bottom: 1.6rem;
  }
  .title-section {
    margin-bottom: 2.4rem;
  }
  .section-heading {
    margin-bottom: 0.8rem;
  }
  .add-btn-section {
    position: relative;
    padding-bottom: 2.4rem;
    padding-top: 2.4rem;
    transition: 0.2s all;
    :hover {
      div.soft {
        border-bottom: 1px solid ${getColor("grey300")};
      }
    }
  }
  .plus-icon-btn {
    position: absolute;
    right: 50%;
    top: 0.8rem;
    background-color: ${getColor("white")};
    padding: 1.6rem;
    margin-left: 0.8rem;
    border-radius: 100px;
    border: 1px solid ${getColor("lightBorder")};
    color: ${getColor("grey400")};
    :hover,
    :focus {
      color: ${getColor("grey600")};
    }
  }
`;

const EditBody = ({ project }) => {
  const [sections, setSections] = useState([]);
  const { openModalWithContent, closeModal } = useContext(OverlayContext);

  useEffect(() => {
    if (project != null) {
      setSections(project.body);
    }
  }, [project]);

  const handleEditProject = async (op, params) => {
    try {
      const newSections = await editProjectBody(project.slug, op, params);
      setSections(newSections);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const openAddModal = (e) => {
    const atPosition = e.target?.value || "1";
    openModalWithContent(
      <AddSection
        onSubmit={handleEditProject}
        onCancel={closeModal}
        atPosition={atPosition}
        min={1}
        max={sections.length + 1}
      />
    );
  };

  return (
    <BodySection>
      <div className="title-section">
        <DisplaySm className="title">Edit Project Body</DisplaySm>
        <Break type="hard" />
      </div>
      <div className="add-btn-section">
        <Break type="soft" />
        <Button
          className="plus-icon-btn icon-button"
          iconButton={<Plus />}
          fn={openAddModal}
        />
      </div>
      {sections?.length > 0 &&
        sections.map((section, index) => (
          <li className="section" key={section.id || section.label}>
            <DynamicSection
              id={section.id}
              label={section.label}
              text={section.text}
              numSections={sections.length}
              handleEditProject={handleEditProject}
            />
            <div className="add-btn-section">
              <Break type="soft" />
              <Button
                className="plus-icon-btn icon-button"
                iconButton={<Plus />}
                fn={openAddModal}
                value={`${index + 2}`}
              />
            </div>
          </li>
        ))}
    </BodySection>
  );
};

export default EditBody;
