import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { ArrowLeft } from "react-feather";

import { useAuth } from "../Hooks/useAuth";
import Stepper from "../stepper/stepper";
import StepperMap from "../stepper/stepperMap";
import SideMenu from "../components/sideMenu";
import Spinner from "../components/spinner";
import Button from "../components/button";
import { createProject } from "../actions/project";
import { sendFail } from "../actions/epicFails";
import Layout from "../layouts/layout";
import CenteredLayout from "../layouts/centeredLayout";
import Jumbotron from "../components/jumbotron";
import {
  createProjectBrief,
  makeCreateProjectError,
  createProjectSuccess,
} from "../copy/stepperCopy";
import { StepperProvider } from "../contexts/stepperContext";
import { instructions } from "../helpers/stepperHelper";

import { useViewport } from "../Hooks/useViewport";
import { widthBreakpoint } from "../styles/responsive";
import StepIndicator from "../stepper/stepIndicator";

const data = Object.freeze(instructions);

const Create = () => {
  const { user } = useAuth();
  const { step, frame } = useParams();
  const history = useHistory();
  const [stepperState, setStepperState] = useState("brief");
  const [errorData, setErrorData] = useState({});
  const [slug, setSlug] = useState("");
  const { width } = useViewport();

  if (!user) {
    return <Redirect to="/login" />;
  }
  const submitStepper = async ({
    data = "data was undefined or corrupted",
    user,
  }) => {
    //The arguments are destructured to prevent
    //event objects from interfering with the error reports
    setStepperState("loading");
    try {
      const newSlug = await createProject(data, user);
      setSlug(newSlug);
      setStepperState("success");
    } catch (error) {
      console.error(error);
      setStepperState("error");
      setErrorData({ error: error.toString(), data });
    }
  };

  const handleErrorReport = async () => {
    try {
      await sendFail("stepper-fail-on-submit", user, errorData);
      history.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };
  const startStepper = () => {
    setStepperState("inSession");
  };

  const goToProject = (e) => {
    if (slug !== "") {
      history.push(slug);
    } else {
      history.push("/projects");
    }
  };

  const goTo = (e) => {
    history.push(e.target.value);
  };
  const back = () => {
    history.goBack();
  };
  const reset = () => {
    setErrorData("");
    setSlug("");
    setStepperState("inSession");
    history.push("/create/0/0");
  };

  const getJumbotron = (stepperState) => {
    switch (stepperState) {
      case "brief":
        return (
          <Jumbotron
            copy={createProjectBrief}
            buttonSection={
              <>
                <Button fn={back} content="Maybe Later" className="secondary" />
                <Button
                  fn={startStepper}
                  content="Born Ready"
                  className="primary"
                />
              </>
            }
          />
        );
      case "loading":
        return <Spinner />;
      case "error":
        return (
          <Jumbotron
            copy={makeCreateProjectError()}
            buttonSection={
              <>
                <Button
                  fn={reset}
                  content="Try Again"
                  className="secondary"
                  value="/error"
                />
                <Button
                  fn={handleErrorReport}
                  content="Send Error and Save Project Data"
                  className="primary"
                  value="/feedback"
                />
              </>
            }
          />
        );
      case "success":
        return (
          <Jumbotron
            copy={createProjectSuccess}
            buttonSection={
              <>
                <Button
                  fn={goTo}
                  content="To Listing"
                  className="secondary"
                  value="/listing"
                />
                <Button
                  fn={goToProject}
                  content="Your Project"
                  className="primary"
                  value="newProject"
                />
              </>
            }
          />
        );
      default:
        return (
          <h2>
            Error: Recieved Incorrect stepper state "
            {stepperState == null ? stepperState : "undefined"}"
          </h2>
        );
    }
  };
  const sideMenu = (
    <SideMenu
      currentOption="map"
      options={{
        map: (
          <StepperMap
            topSection={
              <Button
                className="text-button list-button"
                fn={goTo}
                value={`/projects`}
                withIcon={<ArrowLeft size="2.4rem" />}
                content="Back to Listing"
              />
            }
          />
        ),
      }}
    />
  );
  return (
    <>
      {stepperState === "inSession" ? (
        <StepperProvider
          step={parseInt(step)}
          frame={parseInt(frame)}
          steps={data}
          route={`/create`}
        >
          <Layout
            sideMenu={sideMenu}
            indicator={width < widthBreakpoint.tablet && <StepIndicator />}
          >
            <Stepper submit={submitStepper} route={"/create"} />
          </Layout>
        </StepperProvider>
      ) : (
        <CenteredLayout>{getJumbotron(stepperState)}</CenteredLayout>
      )}
    </>
  );
};

export default Create;
