import React, { useState, useReducer, useEffect } from "react";
import { Inbox } from "react-feather";
import styled from "styled-components";

import {
  acceptApplication,
  declineApplication,
  queryApplications,
} from "../actions/applications";
import docReducer from "../reducers/docReducer";
import Break from "../components/break";

import Dropdown from "../components/dropdown";
import Application from "../layouts/application";
import { DisplaySm } from "../styles/typography";
import { DashBox, DashboxTitleSection } from "../components/staticElements";

const StyledInbox = styled.div`
  ul {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
  }
`;

const ApplicationInbox = ({ project, removeAlert, className, reFetch }) => {
  const [docs, dispatchDocs] = useReducer(docReducer, {
    open: { status: "idle", all: [] },
    accepted: { status: "idle", all: [] },
    declined: { status: "idle", all: [] },
  });
  const [counts, setCounts] = useState({
    open: 0,
    accepted: 0,
    declined: 0,
  });

  useEffect(() => {
    if (project != null) {
      setCounts({
        open: project.applicationRefs?.open?.length || 0,
        accepted: project.applicationRefs?.accepted?.length || 0,
        declined: project.applicationRefs?.declined?.length || 0,
      });
    }
  }, [project]);
  const fetchApplications = async (docType) => {
    dispatchDocs({
      type: "LOAD",
      docType,
    });
    try {
      const docs = await queryApplications(docType, project.slug);
      if (docs.length) {
        dispatchDocs({
          type: "SET",
          docType,
          payload: docs,
        });
      } else {
        dispatchDocs({
          type: "SWITCH_VIEW",
          docType,
          viewType: "open",
        });
      }
    } catch (error) {
      console.error(error);
      //TODO
      // dispatchDocs({
      //   type: "ERROR",
      //   docType,
      //   errorMsg: "There was an error retrieving Documents from the DB",
      //   details: error,
      // });
    }
  };

  const acceptContributor = async (applicant, applicationID) => {
    try {
      await acceptApplication(project, applicant, applicationID);
      reFetch();
      dispatchDocs({
        type: "MOVE",
        from: "open",
        to: "accepted",
        id: applicationID,
      });
      setCounts((prevCounts) => ({
        open: prevCounts.open - 1,
        accepted: prevCounts.accepted + 1,
        declined: prevCounts.declined,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const declineContributor = async (applicant, applicationID) => {
    try {
      await declineApplication(project, applicant, applicationID);
      reFetch();
      dispatchDocs({
        type: "MOVE",
        from: "open",
        to: "declined",
        id: applicationID,
      });
      setCounts((prevCounts) => ({
        open: prevCounts.open - 1,
        accepted: prevCounts.accepted,
        declined: prevCounts.declined + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  //TODO probably a good case for useMemo
  const checkForNew = () => {
    if (project?.applicationRefs?.open) {
      return Object.keys(project.applicationRefs.open).length > 0
        ? "New!"
        : false;
    } else {
      return false;
    }
  };
  return (
    <StyledInbox className={className}>
      <DashBox>
        <div className="top-section">
          <DashboxTitleSection className="display">
            <Inbox />
            <DisplaySm>Application Inbox</DisplaySm>
          </DashboxTitleSection>
          <Break type="hard" />
        </div>
        <Dropdown
          title="Open Applications"
          count={counts.open}
          status={docs.open.status}
          alert={checkForNew()}
          type="open"
          dispatchDocs={dispatchDocs}
          fetchApplications={fetchApplications}
        >
          {docs.open.all?.map((doc) => (
            <li key={doc.id}>
              <Application
                doc={doc}
                acceptContributor={acceptContributor}
                declineContributor={declineContributor}
              />
            </li>
          ))}
        </Dropdown>
        <Dropdown
          title="Accepted Applications"
          status={docs.accepted.status}
          count={counts.accepted}
          type="accepted"
          fetchApplications={fetchApplications}
          dispatchDocs={dispatchDocs}
        >
          {docs.accepted.all?.map((doc) => (
            <li key={doc.id}>
              <Application doc={doc} />
            </li>
          ))}
        </Dropdown>
        <Dropdown
          title="Declined Applications"
          status={docs.declined.status}
          count={counts.declined}
          type="declined"
          fetchApplications={fetchApplications}
          dispatchDocs={dispatchDocs}
        >
          {docs.declined.all?.map((doc) => (
            <li key={doc.id}>
              <Application doc={doc} />
            </li>
          ))}
        </Dropdown>
      </DashBox>
    </StyledInbox>
  );
};

export default ApplicationInbox;
