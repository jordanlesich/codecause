import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import styled from "styled-components";
import { MoreVertical, User } from "react-feather";

import Button from "./button";
import { OverlayContext } from "../contexts/overlayContext";
import { BodySm } from "../styles/typography";
import { getColor } from "../helpers/palette";
import { format } from "date-fns";
import { manageRoles } from "../copy/comingSoon";
import ComingSoon from "../modals/comingSoon";
import Warning from "../modals/warning";
import { useHistory } from "react-router";

const StyledUserItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  .user-button {
    padding: 1.1rem 0;
    color: ${getColor("blue300")};
    width: 30%;
    :hover,
    :focus {
      color: ${getColor("blue400")};
    }
  }
  .role {
    width: 30%;
  }
  .more {
    padding: 1.8rem;
    color: ${getColor("grey400")};
    :hover,
    :focus {
      background-color: ${getColor("grey100")};
      color: ${getColor("grey500")};
    }
  }
  .more-btn-wrapper {
    position: relative;
    margin-left: auto;
    margin-right: 0.8rem;
  }

  .more-menu-button {
    padding: 0;
  }
  .more-menu-dropdown {
    position: absolute;
    background-color: ${getColor("white")};
    width: 18rem;
    right: 0;
    border: 1px solid ${getColor("lightBorder")};
    border-radius: 0 0 4px 4px;
  }
  .dropdown-item {
    padding: 0.2rem;
    padding-left: 1.8rem;
    :hover {
      background-color: ${getColor("grey100")};
    }
  }
`;

const UserListItem = ({ user, handleRemoveUser }) => {
  const { openModalWithContent, closeModal } = useContext(OverlayContext);
  const [moreMenu, setMoreMenu] = useState(false);
  const history = useHistory();
  const clickRef = useRef(null);

  const toggleSetMoreMenu = () => setMoreMenu((prevState) => !prevState);

  const handleDeleteUser = async () => {
    await handleRemoveUser(user.id);
    closeModal();
  };

  const handleClickRole = () => {
    openModalWithContent(
      <ComingSoon body={manageRoles} primaryFn={closeModal} />
    );
  };
  const handleDeleteModal = () => {
    openModalWithContent(
      <Warning
        body={`Are you sure you want to remove ${user.displayName} from the project?`}
        title="Warning"
        primaryFn={handleDeleteUser}
        secondaryFn={closeModal}
      />
    );
  };
  const handleClick = useCallback((e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setMoreMenu(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  const goToUser = () => {
    history.push(`/user/${user.id}`);
  };
  return (
    <StyledUserItem key={user.id}>
      <Button
        withIcon={<User />}
        className="text-button user-button"
        content={user.displayName}
        fn={goToUser}
      />
      <BodySm className="role">{user.role || "Not Yet Assigned"}</BodySm>
      <BodySm>{format(user.timeJoined, "MM/dd/yyyy")}</BodySm>
      <div className="more-btn-wrapper" ref={clickRef}>
        <Button
          iconButton={<MoreVertical />}
          className="icon-button more"
          fn={toggleSetMoreMenu}
        />
        {moreMenu && (
          <div className="more-menu-dropdown">
            <div className="dropdown-item">
              <Button
                content="Manage Roles"
                className="text-button"
                fn={handleClickRole}
              />
            </div>
            <div className="dropdown-item">
              <Button
                content="Remove Contributor"
                className="text-button"
                fn={handleDeleteModal}
              />
            </div>
          </div>
        )}
      </div>
    </StyledUserItem>
  );
};

export default UserListItem;
