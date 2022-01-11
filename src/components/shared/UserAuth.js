import { Navigate } from 'react-router-dom'

export default function UserAuth({ user, children }) {

	return user.porter === false ? children : <Navigate to='/sign-in' replace />
}

// TypeofUser {Navigate}