const BASE_URL = 'http://localhost:4000';

// routes used for frontend
const API_PATHS = {
    BASE_URL,
    AUTH: {
        REGISTER: '/api/register',
        LOGIN: '/api/login',
        GET_PROFILE: '/api/profile',
    },
    RESUME: {
        CREATE: '/api/resume',
        GET_ALL: '/api/resume',
        GET_BY_ID: (id) => `/api/resume/${id}`,
        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    },
    image: {
        UPLOAD_IMAGE: 'api/upload-image'
    }
};

export default API_PATHS;
