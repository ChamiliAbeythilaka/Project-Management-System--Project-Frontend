import { React, useEffect, useState } from "react";
import "./project.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getProjects } from "../../services/ClientServices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Create from "./CreateEdit/Create";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteProject } from "../../services/G3APIService";
import Badge from "react-bootstrap/Badge";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search"



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
  const [statusAll, setStatusAll] = useState(-1);
  const [projects, setProjects] = useState(null);
  const [allProjects, setAllProjects] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const [loadProjects, setLoadProjects] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [show, setShow] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [itemToEdit, setItemToEdit] = useState("");
  //const [showTaskPopup, setShowTaskPopup] = useState(false);
  //const [itemToAddTask, setItemToAddTask] = useState("");
  const [ProjectData, setProjectData] = useState([]);
  const [DataProject, setDataProject] = useState([]);
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState("");


  const handleChange = (e) => {
    let value = +e.target.value;
    setStatusAll(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const callbackModal = (load) => {
    setLoadProjects(true);
    setLgShow(false);
  };

  const openDeletePopup = (projectId) => {
    setItemToDelete(projectId);
    setShow(true);
  };

  const openEditPopup = (projectId) => {
    setItemToEdit(projectId);
    setShowEditPopup(true);
  };


  const callbackEditModal = (load) => {
    setShowEditPopup(false);
    load && props.callbackModal(true);
  };

  const deleteProjectItem = () => {
    setIsPending(true);
    deleteProject(itemToDelete).then((response) => {
      setIsPending(false);
      callbackModal(true);
      setShow(false);
    });
  };

  const getProjectStatus = (status) => {
    if (status === 0) {
      return (
        <Badge pill bg="secondary">
          Upcoming
        </Badge>
      );
    } else if (status === 1) {
      return (
        <Badge pill bg="warning">
          In Progress
        </Badge>
      );
    } else if (status === 2) {
      return (
        <Badge pill bg="success">
          Done
        </Badge>
      );
    } else {
      return (
        <Badge pill bg="danger">
          Overdue
        </Badge>
      );
    }
  };

  const handleDeletePopupClose = () => setShow(false);


  useEffect(() => {
    getProjects().then((res) => {
      setProjectData(res.data);
      setAllProjects(res.data);

    });

  }, [ProjectData]);


  return (
    <div className="project">
      <div className="projectglass">
        <div className="p-4">
          <h4 className="ps-4">Projects</h4>
          {/* <Row className="align-items-center justify-content-between" xs={10}> */}
            <Form className="d-flex">
              <Col md={4} className="ps-0">

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

              <Col md={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={statusAll}
                    label="status"
                    onChange={handleChange}
                  >
                    <MenuItem value={-1}>All</MenuItem>
                    <MenuItem value={0}>Upcoming</MenuItem>
                    <MenuItem value={1}>In Progress</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>
                    <MenuItem value={3}>Overdue</MenuItem>
                  </Select>
                </FormControl>
              </Col>

              <div className="createproject">
                <Button onClick={() => setLgShow(true)}>Create</Button>

                <Modal
                  size="lg"
                  show={lgShow}
                  onHide={() => setLgShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Create Project
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Create callbackModal={callbackModal} isEdit={false} />
                  </Modal.Body>
                </Modal>
              </div>
            </Form>
          {/* </Row> */}
          <br />


          <div style={{ height: "100%" }}>
            <Table striped bordered>
              <thead className="bg-dark text-light">
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Lead</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ProjectData.length === 0 && (
                  <p className="p-3 fw-bold">No Data to Display</p>
                )}


                {/* {ProjectData.map((data, index) => { */}
                {ProjectData.filter(item => { debugger; return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) && (statusAll == -1 || item.status == statusAll)}).map((data) => (

                

                    <tr>
                      <td className="text-center">{data.projectId}</td>
                      <td className="text-center">{data.name}</td>
                      <td className="text-center"> {getProjectStatus(data.status)}</td>
                      <td className="text-center">{data.lead}</td>
                      <td className="text-center">
                        <AiFillEdit
                          size={20}
                          onClick={() => openEditPopup(data.projectId)}
                        />{" "}
                        |{" "}
                        <AiFillDelete
                          size={20}
                          color="red"
                          onClick={() => openDeletePopup(data.projectId)}
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
              <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Edit Project
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Create
                  callbackModal={callbackEditModal}
                  projectId={itemToEdit}
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
                Are you sure you want to delete this project? This action cannot be
                undone.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeletePopupClose}>
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteProjectItem}
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

