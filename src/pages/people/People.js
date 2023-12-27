import React, { useState, useEffect } from "react";
import "./people.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import AddPeopleForm from "./AddPeopleForm";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Table from "react-bootstrap/Table";
import { getClients } from "../../services/ClientServices";
import { deleteClient } from "../../services/G3APIService";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,
  flexGrow: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Customer(props) {
  const [statusAll, setStatusAll] = useState("");
  const [clients, setClients] = useState(null);
  const [allClients, setAllClients] = useState(null);
  const [loadPeople, setLoadPeople] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [itemToEdit, setItemToEdit] = useState("");
  const [show, setShow] = useState(false);
  const [ClientData, setClientData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);


  const openDeletePopup = (personId) => {
    setItemToDelete(personId);
    setShow(true);
  };

  const openEditPopup = (personId) => {
    setItemToEdit(personId);
    setShowEditPopup(true);
  };

  const handleDeletePerson = () => {
      setIsPending(true);
      deleteClient(itemToDelete).then((response) => {
      setIsPending(false);
      callbackModal(true);
      setShow(false);
    });
  };

  const callbackEditModal = (load) => {
    setShowEditPopup(false);
    load && props.callbackModal(true);
  };

  const handleDeletePopupClose = () => setShow(false);


  useEffect(() => {
    getClients().then((res) => {
      setClientData(res.data);
      setAllClients(res.data);

    });

  }, [ClientData]);


  const handleChange = (e) => {
    //let value = +e.target.value;
    setStatusAll(e.target.value);
  };

  //searchbar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const [lgShow, setLgShow] = useState(false);

  const callbackModal = (load, fromEdit = false) => {
    !fromEdit && setLgShow(false);
    load && setLoadPeople(load);
  };


  return (
    <div className="people">
      <div className="peopleglass">
        <div className="p-4">
          <h4 className="ps-4">Clients</h4>
          <Row className="align-items-center justify-content-between" xs={10}>
            <Form className="d-flex">
              <Col md={2} className="ps-0">


                <Box sx={{ flexGrow: 1, marginLeft: 0 }}>
                  <Toolbar>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                        onChange={handleSearchChange}
                      />
                    </Search>
                  </Toolbar>
                </Box>


              </Col>
            
              <div className="newclient">
                <Button onClick={() => setLgShow(true)}>Add Client</Button>
                <Modal
                  size="normal"
                  show={lgShow}
                  onHide={() => setLgShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Box>
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Add Client Person
                      </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <AddPeopleForm
                        callbackModal={callbackModal}
                        isEdit={false}
                      />
                    </Modal.Body>
                  </Box>
                </Modal>
              </div>
            </Form>
          </Row>
          <br />

          <div style={{ height: "100%" }}>
            <Table striped bordered>
              <thead className="bg-dark text-light">
                <tr>
                  <th className="text-center">Client ID</th>
                  <th className="text-center">Client Name</th>
                  <th className="text-center">Client Type</th>
                  <th className="text-center">Company</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>

                {ClientData.length === 0 && (
                  <p className="p-3 fw-bold">No Data to Display</p>
                )}

                  {ClientData.filter(client => client.clientName.toLowerCase().includes(searchTerm) || client.company.toLowerCase().includes(searchTerm)).map((data) => ( 
                  
                  <tr key={data.clientId}>
                    <td className="text-center">{data.clientId}</td>
                    <td className="text-center">{data.clientName}</td>
                    <td className="text-center">{data.clientTypeName}</td>
                    <td className="text-center">{data.company}</td>
                    <td className="text-center">
                      <AiFillEdit
                        size={20}
                        onClick={() => openEditPopup(data.clientId)}
                      />{" "}
                      |{" "}
                      <AiFillDelete
                        size={20}
                        color="red"
                        onClick={() => openDeletePopup(data.clientId)}
                      />
                    </td>
                    </tr>
                  ))}


            </tbody>
            </Table>

            {/* Edit PopUp */}
            <Modal
              size="lg"
              show={showEditPopup}
              onHide={() => setShowEditPopup(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Edit Person
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <AddPeopleForm
                  callbackModal={callbackEditModal}
                  personId={itemToEdit}
                  isEdit={true}
                />
              </Modal.Body>
            </Modal>

            {/* Delete Confirmation PopUp */}
            <Modal show={show} onHide={handleDeletePopupClose}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this person? This action cannot be
                undone.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeletePopupClose}>
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeletePerson}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

        </div>
      </div>
    </div>
  );
}





