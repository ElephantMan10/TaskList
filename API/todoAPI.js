const API_URL = 'http://127.0.0.1:4000'

// ----- GraphQL queries and mutations -----

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const GET_TODO_LISTS =
  `query($username: String!) {
    taskLists(where: { owner: { username: $username } }) {
      id
      title
    }
  }`

const GET_TODO_LIST_ITEMS = 
  `query($id: ID!, $username: String) {
    tasks(
      where: { belongsTo: { id: $id, owner: { username: $username } } }
    ) {
      id
      content
      done
    }
  }`

const CREATE_TODO_LIST =
  `mutation($title: String!, $username: String!) {
    createTaskLists(
      input: {
        title: $title
        owner: { connect: { where: { username: $username } } }
      }
    ) {
      taskLists {
        id
        title
        owner {
          username
        }
      }
    }
  }`

const DELETE_TODO_LIST =
  `mutation($id: ID!, $username: String!) {
    deleteTaskLists(where: { id: $id, owner: { username: $username } }) {
      nodesDeleted
    }
  }`

const CREATE_TODO_ITEM =
  `mutation($id: ID!, $content: String!) {
    createTasks(
      input: {
        content: $content
        belongsTo: {
          connect: { where: { id: $id } }
        }
        done: false
      }
    ) {
      tasks {
        id
        content
        done
      }
    }
  }`

const DELETE_TODO_ITEM =
  `mutation($id: ID!) {
    deleteTasks(where: { id: $id }) {
      nodesDeleted
    }
  }`

const UPDATE_TODO_ITEM =
  `mutation($id: ID!, $done: Boolean!) {
    updateTasks(where: { id: $id }, update: { done: $done }) {
      tasks {
        id
        content
        done
      }
    }
  }`

const GET_USERS =
  `query {
    users {
  	  id
      username
      password
      roles
    }
  }`

const DELETE_USER =
  `mutation($username: String!) {
    deleteUsers(where: { username: $username }) {
      nodesDeleted
    }
  }`

const UPDATE_PASSWORD =
  `mutation($username: String!, $password: String!) {
    updateUsers(where: { username: $username }, update: { password: $password }) {
      users {
        id
        username
        password
      }
    }
  }`

const CREATE_USER =
  `mutation($username: String!, $password: String!, $role: [String!]!) {
    createUsers(
      input: { username: $username, password: $password, roles: $role }
    ) {
      users {
        id
        username
        password
        roles
      }
    }
  }`

// ----- API functions -----

/**
 * Sign in a user
 */
export function signIn(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

/**
 * Sign up a user
 */
export function signUp(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}

/**
 * Get all todo lists of a user
 */
export function getTodoLists(username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: GET_TODO_LISTS,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    })
}

/**
 * Get all todo items of a todo list
 */
export function getTodoListItems(id, username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: GET_TODO_LIST_ITEMS,
      variables: {
        id: id,
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.tasks
    })
    .catch(error => {
      throw error
    })
}

/**
 * Create a todo list
 */
export function createTodoList(title, username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: CREATE_TODO_LIST,
      variables: {
        title: title,
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTaskLists.taskLists
    })
    .catch(error => {
      throw error
    })
}

/**
 * Delete a todo list
 */
export function deleteTodoList(id, username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: DELETE_TODO_LIST,
      variables: {
        id: id,
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.deleteTaskLists.nodesDeleted
    })
    .catch(error => {
      throw error
    })
}

/**
 * Create a todo item
 */
export function createTodoItem(id, content, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: CREATE_TODO_ITEM,
      variables: {
        id: id,
        content: content
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTasks.tasks
    })
    .catch(error => {
      throw error
    })
}

/**
 * Delete a todo item
 */
export function deleteTodoItem(id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: DELETE_TODO_ITEM,
      variables: {
        id: id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.deleteTasks.nodesDeleted
    })
    .catch(error => {
      throw error
    })
}

/**
 * Udapte a todo item
 */
export function updateTodoItem(id, done, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: UPDATE_TODO_ITEM,
      variables: {
        id: id,
        done: done
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.updateTasks.tasks
    })
    .catch(error => {
      throw error
    })
}

/**
 * Get all users
 */
export function getUsers() {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_USERS
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.users
    })
    .catch(error => {
      throw error
    })
}

/**
 * Delete a user
 */
export function deleteUser(username) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: DELETE_USER,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.deleteUsers.nodesDeleted
    })
    .catch(error => {
      throw error
    })
}

/**
 * Update a user's password
 */
export function changePassword(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: UPDATE_PASSWORD,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.updateUsers.users
    })
    .catch(error => {
      throw error
    })
}

/**
 * Create a new user with a given username, password and role
 */
export function createUser(username, password, role) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: CREATE_USER,
      variables: {
        username: username,
        password: password,
        role: role
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createUsers.users
    })
    .catch(error => {
      throw error
    })
}
