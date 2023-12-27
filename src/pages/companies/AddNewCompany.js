import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import * as formik from 'formik';
import { getCompany, saveCompanyData, updateCompanyData } from "../../services/G3APIService";


function AddNewCompany(props) {
  const [updatedData, setupdatedData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { Formik } = formik;

  useEffect(() => {
    props.companyId && getCompany(props.companyId).then((response) => {
      setupdatedData({
        CompanyName: response.data.companyName,
        OwnerName: response.data.ownerName,
        Status: response.data.status,
        ContactNumber: response.data.contactNumber,
        CompanyEmail: response.data.companyEmail,
        StartDate: new Date(response.data.startDate),
      })
    });
  }, [props.companyId])

  const saveCompany = (data) => {
    if (!props.isEdit) {
      setIsPending(true);
      saveCompanyData(data).then(response => {
        setIsPending(false);
        props.callbackModal(true);
      })
    }
    else {
      setIsPending(true);
      updateCompanyData(props.companyId, data).then(response => {
        setIsPending(false);
        props.callbackModal(true);
      })
    }
  };

  const schema = yup.object().shape({
    OwnerName: yup.string().required(),
    CompanyName: yup.string().required(),
    Status: yup.string().required(),
    ContactNumber: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required(),
    CompanyEmail: yup.string().email().required(),
    StartDate: yup.string().nonNullable().required()
  });

  var initialValues = {
    OwnerName: "",
    CompanyName: "",
    Status: "1",
    ContactNumber: "",
    CompanyEmail: "",
    StartDate: ""
  }

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={saveCompany}
        initialValues={updatedData ? updatedData : initialValues}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue
        }) => {
          return (
            <Form onSubmit={handleSubmit} noValidate>
              <Row>
                <Form.Group as={Col} md="6" controlId="formGroupName" className="mb-3">
                  <Form.Label className="required-field">Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="OwnerName"
                    value={values.OwnerName}
                    isValid={touched.OwnerName && !errors.OwnerName}
                    isInvalid={errors.OwnerName && touched.OwnerName}
                    onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">
                    {errors.OwnerName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGroupEmployeeId" className="mb-3">
                  <Form.Label className="required-field">Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="CompanyName"
                    value={values.CompanyName}
                    isValid={touched.CompanyName && !errors.CompanyName}
                    isInvalid={errors.CompanyName && touched.CompanyName}
                    onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">
                    {errors.CompanyName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="formGroupType" className="mb-3">
                  <Form.Label className="required-field">Status</Form.Label>
                  <Form.Select
                    name="Status"
                    value={values.Status} onChange={handleChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select Status.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="contactNumber" className="mb-3">
                  <Form.Label className="required-field">Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="ContactNumber"
                    value={values.ContactNumber}
                    isValid={touched.ContactNumber && !errors.ContactNumber}
                    isInvalid={errors.ContactNumber && touched.ContactNumber}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ContactNumber}
                  </Form.Control.Feedback>
                </Form.Group>

              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="formBasicEmail">
                  <Form.Label>Company Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="CompanyEmail"
                    value={values.CompanyEmail}
                    isValid={touched.CompanyEmail && !errors.CompanyEmail}
                    isInvalid={errors.CompanyEmail && touched.CompanyEmail}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.CompanyEmail}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGroupStartdate">
                  <Form.Label className="required-field">Joined Date</Form.Label>
                  <DatePicker
                    id="date-picker-Startdate"
                    selected={(values.StartDate && new Date(values.StartDate)) || null}
                    dateFormat="MM/dd/yyyy"
                    className={(errors.StartDate && touched.StartDate) ? "form-control is-invalid" : 'form-control'}
                    name="StartDate"
                    onChange={val => {
                      setFieldValue("StartDate", val)
                    }}
                    isValid={touched.StartDate && !errors.StartDate}
                    isInvalid={errors.StartDate && touched.StartDate}
                  />
                  {(errors.StartDate && touched.StartDate) && <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                    {errors.StartDate}
                  </Form.Control.Feedback>}
                </Form.Group>

              </Row>
              <br />
              <Form.Group className="mb-3">
                <Button type="submit" className="btn btn-primary float-end" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Submit'}
                </Button>
                <Button as="input" type="reset" value="Cancel" className="btn btn-light me-2 float-end" />
              </Form.Group>
            </Form>)
        }}
      </Formik>
    </div>
  );
}

export default AddNewCompany;
