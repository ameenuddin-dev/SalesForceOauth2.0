import {Link} from 'react-router-dom';
export default function NotFound(){return <div className="flex min-h-screen flex-col items-center justify-center"><h1 className="text-6xl font-bold">404</h1><Link className="mt-5 text-blue-600" to="/dashboard">Dashboard</Link></div>}
