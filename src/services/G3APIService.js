import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5148/api" 
});

export async function saveProjectData(data) {
    await client.post('/projects', data)
    .then((response) => {
        return response
    })
}

export async function getProjects() {
   return await client.get('/projects')
    .then((response) => {
        return response
    })
}

export async function getProject(projectId) {
    return await client.get(`/projects/${projectId}`)
     .then((response) => {
         return response
     })
 }

export async function deleteProject(projectId) {
    await client.delete(`/projects/${projectId}`)
    .then((response) => {
        return response
    })
}

export async function updateProjectData(projectId, data) {
    await client.put(`/projects/${projectId}`, data)
    .then((response) => {
        return response
    })
}


//Companies
export async function getCompanies() {
    return await client.get('/companies')
     .then((response) => {
         return response
     })
 }

 export async function deleteCompany(companyId) {
    await client.delete(`/companies/${companyId}`)
    .then((response) => {
        return response
    })
}

export async function getCompany(companyId) {
    return await client.get(`/companies/${companyId}`)
     .then((response) => {
         return response
     })
 }

 export async function saveCompanyData(data) {
    await client.post('/companies', data)
    .then((response) => {
        return response
    })
}

export async function updateCompanyData(companyId, data) {
    await client.put(`/companies/${companyId}`, data)
    .then((response) => {
        return response
    })
}


///Documents
export async function uploadDocument(data) {
    await client.post('/documents', data)
    .then((response) => {
        return response
    })
}

export async function getDocuments() {
    return await client.get('/documents')
     .then((response) => {
         return response
     })
 }

 //Download Document
 export async function downloadDocument(documentId){
   return axios({
        url: `http://localhost:5148/api/documents/${documentId}`,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        return response
    });
 }

 export async function deleteDocument(documentId) {
    await client.delete(`/documents/${documentId}`)
    .then((response) => {
        return response
    })
}

export async function getProjectDataForDropdown() {
    return await client.get('/projects/GetProjectsForDropdown')
     .then((response) => {
         return response
     })
 }
 

//////People
export async function getClients() {
    return await client.get('/clients')
     .then((response) => {
         return response
     })
 }

 export async function deleteClient(clientId) {
    await client.delete(`/clients/${clientId}`)
    .then((response) => {
        return response
    })
}

export async function getClient(clientId) {
    return await client.get(`/clients/${clientId}`)
     .then((response) => {
         return response
     })
 }

 export async function saveClientData(data) {
    await client.post('/clients', data)
    .then((response) => {
        return response
    })
}

export async function updateClientData(clientId, data) {
    await client.put(`/clients/${clientId}`, data)
    .then((response) => {
        return response
    })
}

export async function getClientDataForDropdown() {
    return await client.get('/clients/GetClientsForDropdown')
     .then((response) => {
         return response
     })
 }


 ////////////////Task

 export async function saveTaskData(data) {
    await client.post('/projects/AddTask', data)
    .then((response) => {
        return response
    })
}

export async function getAssignedTasks() {
    return await client.get('/dashboard/GetAssignedTasks')
     .then((response) => {
         return response
     })
 }