import { GoogleAuthProvider, getAuth, signInWithPopup, getRedirectResult } from 'firebase/auth'
import app from '../Firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {

        try {

            const result = await getRedirectResult(auth);  // Correct way to get the redirect result
            if (result) {
                const user = result.user;
                console.log('Signed in user:', user);

                // Send the user info to your backend API
                const response = await fetch('https://mern-estate-project-2-5d8i.onrender.com/api/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                    }),
                });
                const data = await res.json();
                console.log("data", data);
                dispatch(signInSuccess(data));
            } navigate('/profile')
        } catch (error) {
            console.log("cant sigin with google")

        }
    }


    return (
        <button onClick={handleGoogleClick} type="button" className='bg-red-700 rounded-lg p-3 text-white hover:bg-red-600'>Continue with Google</button>
    );
};

export default OAuth;