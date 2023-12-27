import { React, useEffect, useState } from "react";
import "./companies.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddNewCompany from "./AddNewCompany";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "react-bootstrap/Badge";
import { getCompanies } from "../../services/ClientServices";
import { deleteCompany } from "../../services/G3APIService";



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
  const [companies, setCompanies] = useState(null);
  const [allCompanies, setAllCompanies] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const [loadCompanies, setLoadCompanies] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [show, setShow] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [itemToEdit, setItemToEdit] = useState("");
  const [CompanyData, setCompanyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  const openDeletePopup = (companyId) => {
    setItemToDelete(companyId);
    setShow(true);
  };

  const openEditPopup = (companyId) => {
    setItemToEdit(companyId);
    setShowEditPopup(true);
  };

 
  
  const callbackEditModal = (load) => {
    setShowEditPopup(false);
    load && props.callbackModal(true);
  };

  const deleteCompanytItem = () => {
    setIsPending(true);
    deleteCompany(itemToDelete).then((response) => {
      setIsPending(false);
      callbackModal(true);
      setShow(false);
    });
  };

  const getCompanyStatus = (status) => {
    if (status === 1) {
      return (
        <Badge pill bg="success">
          Active
        </Badge>
      );
    } else if (status === 0) {
      return (
        <Badge pill bg="secondary">
          InActive
        </Badge>
      );
    }
  };

  const handleDeletePopupClose = () => setShow(false);




  useEffect(() => {
    getCompanies().then((res) => {
      setCompanyData(res.data);
      setAllCompanies(res.data);
      
    });
  
  }, [CompanyData]);

  //searchbar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    let value = +e.target.value
    setStatusAll(e.target.value);
  };

  const callbackModal = (load, fromEdit = false) => {
    !fromEdit && setLgShow(false);
    load && setLoadCompanies(load);
  };

  return (
    <div className="people">
      <div className="peopleglass">
        <div className="p-4">
          <h4 className="ps-4">Companies</h4> 
          {/* <Row className="align-items-center justify-content-between" xs={10}> */}
          <Form className="d-flex">
              
        
              <Col md={5}>
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
              <Col md={5}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-helper-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={statusAll}
                    label="status"
                    onChange={handleChange}
                  >
                    <MenuItem value="-1">All</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Col>

                <div className="addmember">
                  <Button md={4} onClick={() => setLgShow(true)}>
                    Add Company
                  </Button>

           
                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Add Company
                      </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <AddNewCompany callbackModal={callbackModal} isEdit={false}/>
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
            <th className="text-center">Company Name</th>
            <th className="text-center">Owner Name</th>
            <th className="text-center">Status</th>

            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {CompanyData.length === 0 && (
            <p className="p-3 fw-bold">No Data to Display</p>
          )}
          
          {CompanyData.filter(item => { debugger; return item.companyName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) && (statusAll == -1 || item.status == statusAll)}).map((row) => (
            <tr>
              <td className="text-center">{row.companyId}</td>
              <td className="text-center">{row.companyName}</td>
              <td className="text-center">{row.ownerName}</td>
              <td className="text-center">
                {getCompanyStatus(row.status)}
              </td>
             
              <td className="text-center">
              
                <AiFillEdit
                  size={20}
                  onClick={() => openEditPopup(row.companyId)}
                />{" "}
                |{" "}
                <AiFillDelete
                  size={20}
                  color="red"
                  onClick={() => openDeletePopup(row.companyId)}
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
            Edit Company
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewCompany
            callbackModal={callbackEditModal}
            companyId={itemToEdit}
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
            onClick={deleteCompanytItem }
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
