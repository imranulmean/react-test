import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      await AWSCognitoId(result);
      return;
      // '/api/auth/google'
      const signInApiURL=`https://0ko7jyglbb.execute-api.us-east-1.amazonaws.com/mern-state-auth/mern-state-auth-signip`;
      const res = await fetch(signInApiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'arn'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          queryParam:"google"
        }),
      });
      const data = await res.json();
      // dispatch(signInSuccess(data));
      if(data.success){

        navigate('/');
    }      

    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  const AWSCognitoId= async(googleResult) =>{

    console.log('Firebase',googleResult);
    // console.log('accessToken',googleResult.user.accessToken);
    // console.log('idtoken',googleResult._tokenResponse.idToken);
  
      AWS.config.region = 'us-east-1';
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:b0a755d9-bcfb-4784-929f-9742e02b4e64', // MAKE SURE YOU REPLACE THIS
        Logins: {
          'accounts.google.com': googleResult.user.accessToken
        }
      });
      AWS.config.credentials.get(function(err) {
        if (!err) {
          console.log('showing AWS.config.credentials');
          console.log(AWS.config.credentials);
          console.log('Exchanged to Cognito Identity Id: ' + AWS.config.credentials.identityId);
          // accessImages();
        } else {
         console.log(err);
        }
      });   
  }
  return (
    <>
      <button
        onClick={handleGoogleClick}
        type='button'
        className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
      >
        Continue with google
      </button>    
    
    </>

  );
}
