import { Navigate } from 'react-router-dom'

export default function PorterAuth({ user, children }) {

	return user.porter === true ? children : <Navigate to='/sign-in' replace />
}

// TypeofUser {Navigate}