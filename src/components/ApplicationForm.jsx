import { useState } from 'react';
import api from '../services/api';
import './ApplicationForm.css';

function ApplicationForm({ onApplicationCreated, onCancel, editApplication }) {
    const [formData, setFormData] = useState({
        companyName: editApplication?.companyName || '',
        positionTitle: editApplication?.positionTitle || '',
        applicationDate: editApplication?.applicationDate || new Date().toISOString().split('T')[0],
        status: editApplication?.status || 'APPLIED',
        notes: editApplication?.notes || '',
        jobUrl: editApplication?.jobUrl || '',
        followUpDate: editApplication?.followUpDate || '',
        contactName: editApplication?.contactName || '',
        contactEmail: editApplication?.contactEmail || '',
        contactLinkedIn: editApplication?.contactLinkedIn || '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (editApplication) {
                await api.updateApplication(editApplication.id, formData);
            } else {
                await api.createApplication(formData);
            }

            onApplicationCreated();

            if (!editApplication) {
                setFormData({
                    companyName: '',
                    positionTitle: '',
                    applicationDate: new Date().toISOString().split('T')[0],
                    status: 'APPLIED',
                    notes: '',
                    jobUrl: '',
                    followUpDate: '',
                    contactName: '',
                    contactEmail: '',
                    contactLinkedIn: '',
                })
            }
        } catch (err) {
            setError('Failed to save application');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='form-container'>
            <h2>{editApplication ? 'Edit Application' : 'Add New Application'}</h2>
            {error && <div className='error-message'>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='form-group'>
                        <label>Company Name</label>
                        <input
                            type='text'
                            name='companyName'
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>Position Title</label>
                        <input
                            type='text'
                            name='positionTitle'
                            value={formData.positionTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group'>
                        <label>Application Date</label>
                        <input
                            type='date'
                            name='applicationDate'
                            value={formData.applicationDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>Status</label>
                        <select
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value='APPLIED'>Applied</option>
                            <option value='PHONE_SCREEN'>Phone Screen</option>
                            <option value='INTERVIEW'>Interview</option>
                            <option value='TECHNICAL_ASSESSMENT'>Technical Assessment</option>
                            <option value='OFFER'>Offer</option>
                            <option value='WITHDRAWN'>Withdrawn</option>
                            <option value='ACCEPTED'>Accepted</option>
                            <option value='REJECTED'>Rejected</option>
                        </select>
                    </div>
                </div>

                <div className='form-group'>
                    <label>Job URL/Link</label>
                    <input
                        type='url'
                        name='jobUrl'
                        value={formData.jobUrl}
                        onChange={handleChange}
                        placeholder='https://...'
                    />
                </div>

                <div className='form-group'>
                    <label>Follow-Up Date</label>
                    <input
                        type='date'
                        name='followUpDate'
                        value={formData.followUpDate}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label>Contact Name</label>
                    <input
                        type='text'
                        name='contactName'
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder='Recruiter or hiring manager'
                    />
                </div>

                <div className='form-row'>
                    <div className='form-group'>
                        <label>Contact Email</label>
                        <input
                            type='email'
                            name='contactEmail'
                            value={formData.contactEmail}
                            onChange={handleChange}
                            placeholder='example@test.com'
                        />
                    </div>

                    <div className='form-group'>
                        <label>Contact LinkedIn</label>
                        <input
                            type='url'
                            name='contactLinkedIn'
                            value={formData.contactLinkedIn}
                            onChange={handleChange}
                            placeholder='https://linkedin.com/in/...'
                        />
                    </div>
                </div>

                <div className='form-group'>
                    <label>Notes</label>
                    <textarea
                        name='notes'
                        value={formData.notes}
                        onChange={handleChange}
                        rows='4'
                        placeholder='Add any notes about this application'
                    />
                </div>

                <div className='form-actions'>
                    <button type='submit' className='btn btn-primary' disabled={loading}>
                        {loading ? 'Saving...' : (editApplication ? 'Update' : 'Create')} Application
                    </button>
                    {onCancel && (
                        <button type='button' className='btn btn-secondary' onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ApplicationForm;