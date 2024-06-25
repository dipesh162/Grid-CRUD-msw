// mocks.js
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser';

// Static
import catsArr from '../static/cats'


// Utility functions to interact with localStorage

// Fetch data handler
const getData = () => {
  const localData = localStorage.getItem('data')?.length>0 ? localStorage.getItem('data') : null
  const data = localData ? JSON.parse(localData) : catsArr;
  setData(data)
  return data 
};

// Set data handler
const setData = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

// Update data handler
const updateData = (id, dataToUpdate)=>{
  const localData = localStorage.getItem('data')
  const items = JSON.parse(localData)
  const newData = items.map((data)=> data.position == id ? {...dataToUpdate} : data)
  setData(newData)
  return newData
}

// Delete data handler
const deleteData = (id)=>{
  const localData = localStorage.getItem('data')
  const items = JSON.parse(localData)
  const newData = items.filter((data)=> data.position!=id)
  setData(newData)
  return newData
}

// Mock Service Worker handlers
const handlers = [  

  // Fetch data
  http.get('/api/data', (req, res) => {
    const data = getData()
    return HttpResponse.json(data);
  }),

  // Add data
  http.post('/api/data', async ({ request }) => {
    const allData = new Map()
    // Read the intercepted request body as JSON.
    const newData = await request.json()
 
    // Push the new post to the map of all posts.
    allData.set(newData.id, newData)
    setData(newData);
    return HttpResponse.json(newData, { status: 201 })
  }),

  // Update data
  http.patch('/api/data/:id', async ({ params, request }) => {
    const { id } = params;
    const dataToUpdate = await request.json()
    const data = updateData(id, dataToUpdate)
    return HttpResponse.json(data)
  }),

  // Delete data
  http.delete('/api/data/:id', ({ params }) => {
    const { id } = params;
    const data = deleteData(id)
    return HttpResponse.json(data)
  }),
];

// Set up the worker
export const worker = setupWorker(...handlers);
