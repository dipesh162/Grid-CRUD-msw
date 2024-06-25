// GET request helper
const fetchGet = async (url) => {
    try {
      const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error on fetcing the data', error);
        throw error;
    }
};
  

// POST request helper
const fetchPost = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error on saving the data', error);
        throw error;
    }
};

// PATCH request helpers 
const fetchPatch = async (url,data) => {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating the data', error);
        throw error;
    }  
}

// DELETE request helper
const fetchDelete = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting the item:', error);
        throw error;
    }
};

export {fetchGet, fetchPost, fetchPatch, fetchDelete}