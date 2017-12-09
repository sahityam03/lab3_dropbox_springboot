const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const getMe = () =>
    fetch(`${api}/users/getMe`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status === 201)
        { 
        return res.json();
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doAboutEdit = (payload) =>
    fetch(`${api}/users/doAboutEdit`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const changeDeleteStatus = (name, path) =>
    fetch(`${api}/users/changeDeleteStatus`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: '{ "filename" : '+JSON.stringify(name)+', "filepath" : '+JSON.stringify(path)+'}'
    }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const changeStar = (name, path, status) =>
    fetch(`${api}/users/changeStars`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: '{ "filename" : '+JSON.stringify(name)+' , "filepath" : '+JSON.stringify(path)+' , "status" : '+JSON.stringify(status)+'}'
    }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const sharedocument = (emailids, filename, filepath) =>
    fetch(`${api}/users/sharedocument`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: '{ "filename" : '+JSON.stringify(filename)+' , "filepath" : '+JSON.stringify(filepath)+' , "emailids" : '+JSON.stringify(emailids)+'}'
    }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addFolder = (foldername, folderpath) =>
    fetch(`${api}/users/createFolder`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: '{ "foldername" : '+JSON.stringify(foldername)+' , "path" : '+JSON.stringify(folderpath)+' }'
    }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
      })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doSignOut = () =>
    fetch(`${api}/logout`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
     }).then(res => {
        if(res.status === 201)
        { 
        return res.status;
        }
    })
        .catch(error => {
            console.log("This is error");
            return error;
    });


