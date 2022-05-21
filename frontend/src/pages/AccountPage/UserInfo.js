import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";

import EditUserForm from "../../components/form/EditUserForm";

const UserInfo = (props) => {
  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <p className="mb-0">Full Name</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">
                {props.user && props.user.first_name} {props.user && props.user.last_name}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{props.user && props.user.email}</p>
            </div>
          </div>
          <hr />
          <br></br>
          <div className="justify-content-center">
            <EditUserInfoModal user={props.user} setUser={props.setUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditUserInfoModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Edit</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditUserForm
              user={props.user}
              setUser={props.setUser}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfo;
