import { useState, useEffect } from "react";
import api from "../services/api";
import './ApplicationList.css';

function ApplicationList({ onEdit, refresh, filteredApplications }) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (filteredApplications) {
            setApplications(filteredApplications);
            setLoading(false);
        } else {
            fetchApplications();
        }
    }, [refresh, filteredApplications]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await api.getAllApplications();
            setApplications(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load applications');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) {
            return;
        }

        try {
            await api.deleteApplication(id);
            fetchApplications(); // Refresh the list
        } catch (err) {
            alert('Failed to delete application');
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="applications-list">
            <h2>My Job Applications ({applications.length})</h2>

            {applications.length === 0 ? (
                <p>No applications yet. {filteredApplications ? 'Try a different search criteria' : 'Create your first one!'}</p>
            ): (
                <div className="applications-grid">
                    {applications.map(app => (
                        <div key={app.id} className="application-card">
                            <div className="card-header">
                                <div>
                                    <h3>{app.positionTitle}</h3>
                                    <p className="company">{app.companyName}</p>
                                </div>

                                <div className="card-actions">
                                    <button
                                        className="btn-icon"
                                        onClick={() => onEdit(app)}
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn-icon"
                                        onClick={() => handleDelete(app.id)}
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <span className={`status status-${app.status.toLowerCase()}`}>
                                {app.status.replace('_', ' ')}
                            </span>

                            <p className="date">Applied: {app.applicationDate}</p>

                            {app.notes && <p className="notes">{app.notes}</p>}

                            {app.jobUrl && (
                                <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="job-link">
                                    View Job Posting
                                </a>
                            )}
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default ApplicationList;