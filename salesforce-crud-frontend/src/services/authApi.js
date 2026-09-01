import api from './api';
export const authApi={me:async()=>{const r=await api.get('/auth/me');return r.data;}};
