// Update the API URL to match your actual running backend
const API_URL = 'https://localhost:7200/api';

export const fetchStories = async () => {
  const response = await fetch(`${API_URL}/Story`);
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
};

export const fetchStoryById = async (id) => {
  const response = await fetch(`${API_URL}/Story/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch story');
  }
  return response.json();
};

export const createStory = async (story) => {
  const response = await fetch(`${API_URL}/Story`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(story),
  });
  if (!response.ok) {
    throw new Error('Failed to create story');
  }
  return response.json();
};

export const updateStory = async (id, story) => {
  const response = await fetch(`${API_URL}/Story/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(story),
  });
  if (!response.ok) {
    throw new Error('Failed to update story');
  }
  return response;
};

export const deleteStory = async (id) => {
  const response = await fetch(`${API_URL}/Story/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete story');
  }
  return response;
};