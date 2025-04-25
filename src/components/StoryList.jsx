import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchStories, deleteStory } from '../services/api.js';

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await fetchStories();
      setStories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load stories. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
        setStories(stories.filter(story => story.id !== id));
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

  return (
    <div className="story-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Stories</h1>
        <Link to="/create" className="btn btn-primary">
          Add New Story
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="alert alert-info">No stories available. Create one to get started!</div>
      ) : (
        <div className="row">
          {stories.map((story) => (
            <div className="col-md-6 col-lg-4 mb-4" key={story.id}>
              <div className="card h-100" onClick={() => navigate(`/story/${story.id}`)}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{story.title}</h5>
                    <span className={getDepartmentBadgeClass(story.department)}>
                      {story.department}
                    </span>
                  </div>
                  <p className="card-text">{story.content.length > 100 
                    ? `${story.content.substring(0, 100)}...` 
                    : story.content}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/edit/${story.id}`} className="btn btn-sm btn-primary" onClick={(e) => e.stopPropagation()}>
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={(e) => handleDelete(story.id, e)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryList;