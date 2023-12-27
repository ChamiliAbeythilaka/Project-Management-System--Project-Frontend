// import React, { useState, useEffect } from "react";
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import InputGroup from 'react-bootstrap/InputGroup'
// import * as yup from 'yup';
// import * as formik from 'formik'
// import { saveProjectData, updateProjectData, getClientDataForDropdown } from "../../../services/G3APIService";
// import { getProject } from "../../../services/G3APIService";

// export default function Create(props) {
//   const [startdate, setStartdate] = useState(new Date());
//   const [estimatedEndDate, setEstimatedEndDate] = useState(new Date());
//   const [isPending, setIsPending] = useState(false);
//   const [updatedData, setupdatedData] = useState(null);
//   const [clientData, setClientData] = useState(null);

//   useEffect(() => {
//     getClientDataForDropdown().then((response) => {
//       setClientData(response.data);
//     });

//    props.projectId && getProject(props.projectId).then((response) => {
//       setupdatedData({
//         Name: response.data.name,
//         Key: response.data.key,
//         ClientId: response.data.clientId,
//         ReportedBy: response.data.reportedBy,
//         Type: response.data.type,
//         Lead: response.data.lead,
//         StartDate: setStartdate(new Date(response.data.startDate)),
//         EndDate:  setEstimatedEndDate(new Date(response.data.endDate)),
//         Budget: response.data.budget,
//         EstimatedTime: response.data.estimatedTime,
//         Status: response.data.status,
//         Description: response.data.description
//       })
//     });
//   }, [props.projectId])
  
//   var initialValues = {
//     Name: "",
//     Key: "",
//     ClientId: 0,
//     ReportedBy: "1",
//     Type: "1",
//     Lead: "",
//     StartDate: startdate,
//     EndDate: estimatedEndDate,
//     Budget: 0,
//     EstimatedTime: '0',
//     Status: 0
//   }

//   const saveProject = (data) => {
//     if(!props.isEdit){
//       setIsPending(true);
//       saveProjectData(data).then(response => {
//         setIsPending(false);
//         props.callbackModal(true);
//       })
//     }
//     else {
//       setIsPending(true);
//       updateProjectData(props.projectId, data).then(response => {
//         setIsPending(false);
//         props.callbackModal(true);
//       })
//     }

//   };

//   const schema = yup.object().shape({
//     Name: yup.string().required(),
//     Key: yup.string().required(),
//     Description: yup.string().required(),
//     ClientId: yup.number(),
//     ReportedBy: yup.string().required(),
//     EstimatedTime: yup.string(),
//     StartDate: yup.date(),
//     EndDate: yup.date(),
//     Lead: yup.string().required(),
//     Budget: yup.string(),
//     Status: yup.number().required()
//   });

//   const { Formik } = formik;

//   return (
    
//     <div className="mx-3">
//         <Formik
//       validationSchema={schema}
//       onSubmit={saveProject}
//       initialValues={updatedData ? updatedData : initialValues}
//       enableReinitialize
//     >
//       {({
//         handleSubmit,
//         handleChange,
//         values,
//         touched,
//         errors,
//         setFieldValue
//       }) => {
//       return (<Form onSubmit={handleSubmit} noValidate>
//       <Row>
//        <Form.Group as={Col} md="12" className="mb-3">
//           <Form.Label className="required-field">Project Name</Form.Label>
//           <Form.Control type="text"
//           name="Name"
//           placeholder="Project Name"
//           value={values.Name}
//           onChange={handleChange}
//           isValid={touched.Name && !errors.Name}
//           isInvalid={!!errors.Name}/>
//           <Form.Control.Feedback type="invalid">
//             { errors.Name }
//           </Form.Control.Feedback>
//         </Form.Group>
      
//         <Form.Group as={Col} md="12" controlId="validationCustom01" className="mb-3">
//           <Form.Label className="required-field">Key</Form.Label>
//           <Form.Control type="text" 
//           name="Key"
//           value={values.Key}
//           onChange={handleChange}
//           isValid={touched.Key && !errors.Key}
//           isInvalid={!!errors.Key}/>
//           <Form.Control.Feedback type="invalid">
//             { errors.Key }
//           </Form.Control.Feedback>
//         </Form.Group>
//         </Row>

//         <Row>
//         <Form.Group as={Col} md="6" controlId='validationCustom04' className="mb-3">
//              <Form.Label>Client Name</Form.Label>
//                 <Form.Select name="ClientId" value={values.ClientId} onChange={handleChange}>
//                 <option value ={0}>-Select Client-</option>
//                 {clientData && clientData.map((client) => (             
//                 <option value ={client.value} key={client.value}>{client.name}</option>
//                 ))}
//                 </Form.Select>

//         </Form.Group>

//         <Form.Group as={Col} md="6" controlId='validationCustom04' className="mb-3">
//              <Form.Label className="required-field">Reported By</Form.Label>
//                 <Form.Select name="ReportedBy" value={values.ReportedBy} onChange={handleChange}>
//                       <option value ='1'>Bimal Perera</option>
//                       <option value='2'>Nadun Wijethunga</option>
//                 </Form.Select> 
//                 <Form.Control.Feedback type="invalid">
//                     Please select a Person.
//                 </Form.Control.Feedback>   
//         </Form.Group> 
//         </Row>

//        <Row>
//         <Form.Group className="mb-3">
//             <Form.Label className="required-field">Description</Form.Label>
//             <Form.Control
//               name="Description"
//                as='textarea'
//                rows={3}
//                type='textarea'
//                onChange={handleChange}
//                value={values.Description}
//                isValid={touched.Description && !errors.Description}
//                isInvalid={!!errors.Description}
//             ></Form.Control>
//             <Form.Control.Feedback type="invalid">
//                 Please provide a Description.
//             </Form.Control.Feedback>
//         </Form.Group>
//         </Row>

//         <Row>
//         <Form.Group as={Col} md="6" controlId='validationCustom04' className="mb-3">
//              <Form.Label className="required-field">Type</Form.Label>
//                 <Form.Select placeholder='' name="Type" value={values.Type} onChange={handleChange}>
//                     <option value="1"></option>
//                     <option value="2">Mobile Application</option>
//                     <option value="3">Web Application</option>
//                     <option value="4">Desktop Application</option>
//                     <option value="5">E-commerce Application</option>
//                     <option value="6">Enterprise Applications</option>
//                     <option value="7">Game Development</option>
//                 </Form.Select>    
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="validationCustomUsername" className="mb-3">
//           <Form.Label>Estimated Time</Form.Label>
//           <InputGroup>
//             <Form.Select
//             name="EstimatedTime"
//             value={values.EstimatedTime} onChange={handleChange}              
//               placeholder="Select estimated time" 
//               min={null} 
//               max={500}
//             >
//               {[...Array(501).keys()].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </Form.Select>

//             <InputGroup.Text id="basic-addon2">Hours</InputGroup.Text>
//           </InputGroup>
//         </Form.Group>
//         </Row>
      
//           <Row>
//             <Form.Group as={Col} md="6" controlId="formGroupStartdate" className="mb-3">
//               <Form.Label>Start Date</Form.Label>
//               <DatePicker
//                 id="date-picker-Startdate"
//                 selected={startdate}
//                 onChange={date => {
//                   setStartdate(date);
//                   setFieldValue("StartDate", date);
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 className="form-control"
//                 name="StartDate"
//                 isValid={touched.StartDate && !errors.StartDate}
//                 isInvalid={!!errors.StartDate}
//               />
//             </Form.Group>

//             <Form.Group as={Col} md="6" controlId="formGroupEstimatedEndDate" className="mb-3">
//               <Form.Label>Estimated End Date</Form.Label>
//               <DatePicker
//                 id="date-picker-Estimated-End-Date"
//                 selected={estimatedEndDate}
//                 onChange={date => {
//                   setEstimatedEndDate(date);
//                   setFieldValue("EndDate", date);
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 className="form-control"
//                 name="EndDate"
//                 isValid={touched.EndDate && !errors.EndDate}
//                 isInvalid={!!errors.EndDate}
//               />
//             </Form.Group>
//           </Row>
          
//         <Row>
//         <Form.Group as={Col} md="6" controlId="validationCustomUsername" className="mb-3">
//           <Form.Label>Estimated Budget</Form.Label>
//           <InputGroup>
//             <Form.Select 
//               name="Budget"
//               value={values.Budget} onChange={handleChange}
//               placeholder="Select estimated budget" 
//               min={null} 
//               max={500}
//             >
//               {[...Array(491)].map((_,num) => (
//                 <option key={num} value={(num +10)*1000}>
//                   {(num + 10)*1000}
//                 </option>
//               ))}
//             </Form.Select>

//             <InputGroup.Text id="basic-addon2">LKR</InputGroup.Text>
//           </InputGroup>
//         </Form.Group>

//         <Form.Group as={Col} md="6" controlId="validationCustomUsername" className="mb-3">
//           <Form.Label>Hourly Rate</Form.Label>
//           <InputGroup>
//             <Form.Select 
             
//               placeholder="Select estimated time" 
//               min={null} 
//               max={500}
//             >
//               {[...Array(501).keys()].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </Form.Select>

//             <InputGroup.Text id="basic-addon2">LKR</InputGroup.Text>
//           </InputGroup>
//         </Form.Group>

//         </Row> 
//                 <Row>
//           <Form.Group as={Col} md="6" controlId="formGroupLead" className="mb-3">
//                 <Form.Label className="required-field">Lead</Form.Label>
//                 <Form.Control type="text" name="Lead"
//           placeholder="Lead"
//           value={values.Lead}
//           onChange={handleChange}
//           isValid={touched.Lead && !errors.Lead}
//           isInvalid={!!errors.Lead}/>
//                 <Form.Control.Feedback type="invalid">
//                     Please provide Lead's Name.
//                 </Form.Control.Feedback> 
//           </Form.Group>

//           <Form.Group as={Col} md="6" controlId="formGroupType" className="mb-3">
//           <Form.Label className="required-field">Status</Form.Label>
//           <Form.Select
//             name="Status"
//             value={values.Status} onChange={handleChange}
//           >
//             <option value={0}>Upcoming</option>
//             <option value={1}>InProgress</option>
//             <option value={2}>Done</option>
//             <option value={3}>Overdue</option>
//           </Form.Select>
//           <Form.Control.Feedback type="invalid">
//                     Please select Status.
//                 </Form.Control.Feedback>
//         </Form.Group>
        
//           <br/>
//           <Form.Group className="mb-3">
//               <Button type="submit" className="btn btn-primary float-end" disabled={isPending}>
//                 {isPending ? 'Saving...' : 'Submit'}
//               </Button>
//               <Button as="input" type="reset" value="Cancel" className="btn btn-light me-2 float-end"/> 
//           </Form.Group>
//           </Row>  
//     </Form>)}}
//     </Formik>
//     </div>
     

// );

// }

 import React, { useState, useEffect } from "react";
 import Col from 'react-bootstrap/Col';
 import Form from 'react-bootstrap/Form';
 import Row from 'react-bootstrap/Row';
 import Button from 'react-bootstrap/Button';
 import DatePicker from 'react-datepicker';
 import 'react-datepicker/dist/react-datepicker.css';
 import InputGroup from 'react-bootstrap/InputGroup'
 import * as yup from 'yup';
 import * as formik from 'formik'
 import { saveProjectData, updateProjectData, getClientDataForDropdown } from "../../../services/G3APIService";
 import { getProject } from "../../../services/G3APIService";

export default function Create(props) {
 
  const [isPending, setIsPending] = useState(false);
  const [updatedData, setupdatedData] = useState(null);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    getClientDataForDropdown().then((response) => {
      setClientData(response.data);
    });

    props.projectId &&
      getProject(props.projectId).then((response) => {
        setupdatedData({
          Name: response.data.name,
          //Key: response.data.key,
          ClientId: response.data.clientId,
          ReportedBy: response.data.reportedBy,
          Type: response.data.type,
          Lead: response.data.lead,
          StartDate: new Date(response.data.startDate),
          EndDate: new Date(response.data.endDate),
          Budget: response.data.budget,
          EstimatedTime: response.data.estimatedTime,
          HourlyRate:response.data.hourlyRate,
          Status: response.data.status,
          Description: response.data.description,
        });
      });
  }, [props.projectId]);

  var initialValues = {
    Name: "",
    //Key: "",
    ClientId: "",
    ReportedBy: "",
    //Discription:"",
    Type: "",
    Lead: "",
    StartDate: "",
    EndDate:"",
    Budget: 0,
    HourlyRate:"",
    EstimatedTime: "0",
    Status: 0,
  };

  //new add
  const checkValid=(touched,error) =>{
    if(touched && !error){
      return"is-valid";
    }
  }

  const saveProject = (data) => {
    if (!props.isEdit) {
      setIsPending(true);
      saveProjectData(data).then((response) => {
        setIsPending(false);
        props.callbackModal(true);
        
      });

    } else {
      setIsPending(true);
      updateProjectData(props.projectId, data).then((response) => {
        setIsPending(false);
        props.callbackModal(true);
       
      });
    }
  };

  const schema = yup.object().shape({
    Name: yup.string().required(),
    // Key: yup.string().required(),
    Description: yup.string().required(),
    ClientId: yup.number().required(),
    ReportedBy: yup.string().required(),
    EstimatedTime: yup.string(),
    // StartDate: yup.string().nonNullable(),
    //EndDate: yup.date().nonNullable(),
    StartDate: yup.date().required('Start date is required'),
    EndDate: yup.date().required('End date is required')
    .min(yup.ref('StartDate'), 'End date must be greater than or equal to start date'),
    Lead: yup.string().required(),
    Budget: yup.string().required(),
    HourlyRate:yup.string(),
    Status: yup.number().required(),
    Type:yup.string().required(),
  });

  const { Formik } = formik;


  return (
    <div className="mx-3">
      <Formik
        validationSchema={schema}
        onSubmit={saveProject}
        initialValues={updatedData ? updatedData : initialValues}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          //resetForm,
          setFieldValue,
        }) => {
          return (
            <Form onSubmit={handleSubmit} noValidate>
              <Row>
                <Form.Group as={Col} md="12" className="mb-3">
                  <Form.Label className="required-field">
                    Project Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    placeholder="Project Name"
                    value={values.Name}
                    onChange={handleChange}
                    isValid={touched.Name && !errors.Name}
                    isInvalid={!!errors.Name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Name}
                  </Form.Control.Feedback>
                </Form.Group>

        
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustom04"
                  className="mb-3"
                >
                  <Form.Label className="required-field">Client Name</Form.Label>
                  <Form.Select
                    name="ClientId"
                    value={values.ClientId}
                    className={checkValid(touched.ClientId,errors.ClientId)}
                    isInvalid={touched.ClientId && errors.ClientId}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}             
                  >
                    <option>-Select Client-</option>
                    {clientData &&
                      clientData.map((client) => (
                        <option value={client.value} key={client.value}>
                          {client.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    client is required
                  </Form.Control.Feedback>
                  
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustom04"
                  className="mb-3"
                >
                  <Form.Label className="required-field">
                    Reported By
                  </Form.Label>
                  <Form.Select
                    name="ReportedBy"
                    value={values.ReportedBy}
                    //onChange={handleChange}
                    className={checkValid(touched.ReportedBy,errors.ReportedBy)}
                    isInvalid={touched.ReportedBy && errors.ReportedBy}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option>-Select RepotedBy-</option>
                    <option value="1">Bimal Perera</option>
                    <option value="2">Nadun Wijethunga</option>
                    <option value="3">Sandun Perera</option>
                    <option value="4">ABC Perera</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a Employee Reported.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Form.Label className="required-field">
                    Description
                  </Form.Label>
                  <Form.Control
                    name="Description"
                    as="textarea"
                    rows={3}
                    type="textarea"
                    onChange={handleChange}
                    value={values.Description}
                    isValid={touched.Description && !errors.Description}
                    isInvalid={!!errors.Description}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a Description.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustom04"
                  className="mb-3"
                >
                  <Form.Label className="required-field">Type</Form.Label>
                  <Form.Select
                    placeholder=""
                    name="Type"
                    value={values.Type}
                    className={checkValid(touched.Type,errors.Type)}
                    isInvalid={touched.Type && errors.Type}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      //resetForm();
                      handleChange(e);
                    }}
                    //onChange={handleChange}
                  >
                    <option>-Select Project Type-</option>
                    <option value="1">Mobile Application</option>
                    <option value="2">Web Application</option>
                    <option value="3">Desktop Application</option>
                    <option value="4">E-commerce Application</option>
                    <option value="5">Enterprise Applications</option>
                    <option value="6">Game Development</option>
                    
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please Select the project type.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustomUsername"
                  className="mb-3"
                >
                  <Form.Label>Estimated Time</Form.Label>
                  <InputGroup>
                    <Form.Select
                      name="EstimatedTime"
                      value={values.EstimatedTime}
                      onChange={handleChange}
                      placeholder="Select estimated time"
                      min={null}
                      max={500}
                    >
                      {[...Array(501).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </Form.Select>

                    <InputGroup.Text id="basic-addon2">Hours</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row>
                
                <Form.Group as={Col} md="6" controlId="formGroupStartdate">
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    id="date-picker-Startdate"
                    selected={
                      (values.StartDate && new Date(values.StartDate)) 
                    }
                    dateFormat="MM/dd/yyyy"
                    className={
                      errors.StartDate && touched.StartDate
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="StartDate"
                    onChange={(val) => {
                      setFieldValue("StartDate", val);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGroupStartdate">
                  <Form.Label>Estimated End Date</Form.Label>
                  <DatePicker
                    id="date-picker-Estimated-End-Date"
                    selected={
                      (values.EndDate && new Date(values.EndDate)) 
                    }
                    dateFormat="MM/dd/yyyy"
                    className={
                      errors.EndDate && touched.EndDate
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="EndDate"
                    onChange={(val) => {
                      setFieldValue("EndDate", val);
                    }}
                  />
                  
                </Form.Group>
            
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustomUsername"
                  className="mb-3"
                >
                  <Form.Label>Estimated Budget</Form.Label>
                  <InputGroup>
                    <Form.Select
                      name="Budget"
                      value={values.Budget}
                      onChange={handleChange}
                      placeholder="Select estimated budget"
                      min={null}
                      max={500}
                    >
                      {[...Array(491)].map((_,index) => (
                        <option key={index} value={(index + 10) * 1000}>
                          {(index + 10)*1000}
                        </option>
                      ))}
                    </Form.Select>

                    <InputGroup.Text id="basic-addon2">LKR</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustomUsername"
                  className="mb-3"
                >
                  <Form.Label>Hourly Rate</Form.Label>
                  <InputGroup>
                    <Form.Select
                      name="HourlyRate"
                      value={values.HourlyRate}
                      onChange={handleChange}
                      placeholder="Select estimated time"
                      min={null}
                      max={500}
                    >
                      {[...Array(501).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </Form.Select>

                    <InputGroup.Text id="basic-addon2">LKR</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="formGroupLead"
                  className="mb-3"
                >
                  <Form.Label className="required-field">Project Manager</Form.Label>
                  <Form.Control
                    type="text"
                    name="Lead"
                    placeholder="Lead"
                    value={values.Lead}
                    onChange={handleChange}
                    isValid={touched.Lead && !errors.Lead}
                    isInvalid={!!errors.Lead}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide Lead's Name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  controlId="formGroupType"
                  className="mb-3"
                >
                  <Form.Label className="required-field">Status</Form.Label>
                  <Form.Select
                    name="Status"
                    value={values.Status}
                    onChange={handleChange}
                  >
                    <option value={0}>Upcoming</option>
                    <option value={1}>InProgress</option>
                    <option value={2}>Done</option>
                    <option value={3}>Overdue</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select Status.
                  </Form.Control.Feedback>
                </Form.Group>

                <br />
                <Form.Group className="mb-3">
                  <Button
                    type="submit"
                    className="btn btn-primary float-end"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Submit"}
                  </Button>
                  <Button
                    as="input"
                    type="reset"
                    value="Cancel"
                    className="btn btn-light me-2 float-end"
                  />
                </Form.Group>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
