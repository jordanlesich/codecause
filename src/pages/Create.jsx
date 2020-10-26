import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import Stepper from "../stepper/stepper";
import StepperMap from "../stepper/stepperMap";
import Spinner from "../components/spinner";
import Button from "../components/button";
import { createProject } from "../actions/project";
import { sendFail } from "../actions/epicFails";
import Layout from "../layouts/layout";
import CenteredLayout from "../layouts/centeredLayout";
import Jumbotron from "../components/jumbotron";
import {
  introStepperCopy,
  makeStepperErrorCopy,
  stepperSuccessCopy,
} from "../copy/stepperCopy";
import { StepperProvider } from "../contexts/stepperContext";
import { instructions } from "../helpers/stepperHelper";

const data = Object.freeze(instructions);

const Create = () => {
  const { user } = useAuth();
  const { step, frame } = useParams();
  const history = useHistory();
  const [stepperState, setStepperState] = useState("brief");
  const [errorID, setErrorID] = useState("");
  const [slug, setSlug] = useState("");

  if (!user) {
    return <Redirect to="/login" />;
  }
  const submitStepper = async (data, displayName) => {
    setStepperState("loading");
    try {
      const newSlug = await createProject(data, displayName);
      setSlug(newSlug);
      setStepperState("success");
    } catch (error) {
      console.error(error);
      const errReceipt = await sendFail(
        "stepper-fail-on-submit",
        user,
        data,
        error
      );
      setStepperState("error");
      setErrorID(errReceipt);
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

  const routeByValue = (e) => {
    history.push(e.target.value);
  };
  const back = () => {
    history.goBack();
  };
  const reset = () => {
    setErrorID("");
    setSlug("");
    setStepperState("inSession");
    history.push("/create/0/0");
  };

  const getJumbotron = (stepperState) => {
    switch (stepperState) {
      case "brief":
        return (
          <Jumbotron
            copy={introStepperCopy}
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
            copy={makeStepperErrorCopy(errorID)}
            buttonSection={
              <>
                <Button
                  fn={routeByValue}
                  content="Feedback"
                  className="secondary"
                  value="/feedback"
                />
                <Button
                  fn={reset}
                  content="Try Again"
                  className="primary"
                  value="/error"
                />
              </>
            }
          />
        );
      case "success":
        return (
          <Jumbotron
            copy={stepperSuccessCopy}
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
    }
  };

  return (
    <>
      {stepperState === "inSession" ? (
        <StepperProvider
          step={parseInt(step)}
          frame={parseInt(frame)}
          steps={data}
        >
          <Layout sideMenu={<StepperMap />}>
            <Stepper submit={submitStepper} />
          </Layout>
        </StepperProvider>
      ) : (
        <CenteredLayout>{getJumbotron(stepperState)}</CenteredLayout>
      )}
    </>
  );
};

export default Create;
