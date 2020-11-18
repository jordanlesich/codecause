import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { ArrowLeft } from "react-feather";

import { useAuth } from "../Hooks/useAuth";
import Stepper from "../stepper/stepper";
import StepperMap from "../stepper/stepperMap";
import Spinner from "../components/spinner";
import Button from "../components/button";
import { sendApplication } from "../actions/applications";
import Layout from "../layouts/layout";
import CenteredLayout from "../layouts/centeredLayout";
import Jumbotron from "../components/jumbotron";
import { applyError, applySuccess } from "../copy/stepperCopy";
import { StepperProvider } from "../contexts/stepperContext";
import { applyInstructions } from "../helpers/stepperHelper";
import SideMenu from "../components/sideMenu";

const data = Object.freeze(applyInstructions);

const Apply = () => {
  const { user } = useAuth();
  const { id, step, frame } = useParams();
  const history = useHistory();
  const [stepperState, setStepperState] = useState("inSession");
  const [slug, setSlug] = useState("");

  if (!user) {
    return <Redirect to="/login" />;
  }

  const submitStepper = async (data) => {
    setStepperState("loading");
    try {
      await sendApplication(id, data);
      setStepperState("success");
    } catch (error) {
      console.error(error);
      setStepperState("error");
    }
  };

  const goToProject = (e) => {
    if (slug !== "") {
      history.push(slug);
    } else {
      history.push(`/project/${id}`);
    }
  };

  const routeByValue = (e) => {
    history.push(e.target.value);
  };

  const reset = () => {
    setSlug("");
    setStepperState("inSession");
    history.push(`/project/${id}/apply/0/0`);
  };

  const getJumbotron = (stepperState) => {
    switch (stepperState) {
      case "loading":
        return <Spinner />;
      case "error":
        return (
          <Jumbotron
            copy={applyError}
            buttonSection={
              <>
                <Button
                  fn={routeByValue}
                  content="Feedback"
                  className="secondary"
                  value="/feedback"
                />
                <Button fn={reset} content="Try Again" className="primary" />
              </>
            }
          />
        );
      case "success":
        return (
          <Jumbotron
            copy={applySuccess}
            buttonSection={
              <>
                <Button
                  fn={routeByValue}
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
                fn={routeByValue}
                value={`/project${id}`}
                withIcon={<ArrowLeft size="2.4rem" />}
                content="Back to Whitepaper"
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
          route={`/project/${id}/apply`}
          step={parseInt(step)}
          frame={parseInt(frame)}
          steps={data}
        >
          <Layout sideMenu={sideMenu}>
            <Stepper submit={submitStepper} />
          </Layout>
        </StepperProvider>
      ) : (
        <CenteredLayout>{getJumbotron(stepperState)}</CenteredLayout>
      )}
    </>
  );
};

export default Apply;
