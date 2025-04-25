import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchStoryById, deleteStory } from '../services/api.js';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getStory = async () => {
      try {
        setLoading(true);
        const data = await fetchStoryById(id);
        setStory(data);
        setError(null);
      } catch (err) {
        setError('Failed to load the story. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStory();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete the story. Please try again.');
        console.error(err);
      }
    }
  };

  const getDepartmentBadgeClass = (department) => {
    return `department-badge department-${department}`;
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!story) {
    return <div className="alert alert-warning mt-3">Story not found.</div>;
  }

  return (
    <div className="story-detail">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{story.title}</h1>
        <span className={getDepartmentBadgeClass(story.department)}>
          {story.department}
        </span>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <p className="card-text">{story.content}</p>
        </div>
      </div>

      <div className="d-flex gap-2">
        <Link to="/" className="btn btn-secondary">
          Back to Stories
        </Link>
        <Link to={`/edit/${story.id}`} className="btn btn-primary">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StoryDetail;