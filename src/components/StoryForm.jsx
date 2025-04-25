import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStoryById, createStory, updateStory } from '../services/api.js';

// Enum mapping for department values
const DEPARTMENT_ENUM = {
  'SALES': 0,
  'MARKETING': 1, 
  'DEVELOPMENT': 2,
  'OTHER': 3
};

const StoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    department: 'DEVELOPMENT'
  });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      if (isEditing) {
        try {
          setLoading(true);
          const story = await fetchStoryById(id);
          setFormData({
            id: story.id,
            title: story.title,
            content: story.content,
            department: story.department
          });
          setError(null);
        } catch (err) {
          setError('Failed to load the story for editing.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadStory();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        // For editing, convert department to a number if it's a string
        const updatedStory = {
          ...formData,
          department: typeof formData.department === 'string' 
            ? DEPARTMENT_ENUM[formData.department] 
            : formData.department
        };
        
        await updateStory(id, updatedStory);
        navigate(`/story/${id}`);
      } else {
        // For creating, convert department string to its numeric enum value
        const storyToCreate = {
          title: formData.title,
          content: formData.content,
          department: DEPARTMENT_ENUM[formData.department]
        };
        
        console.log('Creating new story with data:', storyToCreate);
        
        const newStory = await createStory(storyToCreate);
        
        console.log('Received response:', newStory);
        
        // Navigate to the story detail page using the ID from the response
        navigate(`/story/${newStory.id}`);
      }
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} the story. Please try again.`);
      console.error(err);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="story-form">
      <h1>{isEditing ? 'Edit Story' : 'Create New Story'}</h1>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter story title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Enter story content"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <select
            className="form-select"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="DEVELOPMENT">Development</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Story' : 'Create Story'
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(isEditing ? `/story/${id}` : '/')}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryForm;