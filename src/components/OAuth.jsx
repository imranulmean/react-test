import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const fireBaseGoogleResult = await signInWithPopup(auth, provider);
      await AWSCognitoId(fireBaseGoogleResult);
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

  const AWSCognitoId= async(fireBaseGoogleResult) =>{

     //console.log('googleResult._tokenResponse.oauthIdToken',fireBaseGoogleResult._tokenResponse.oauthIdToken);
  
      AWS.config.region = 'us-east-1';
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:b0a755d9-bcfb-4784-929f-9742e02b4e64', // MAKE SURE YOU REPLACE THIS
        Logins: {
          'accounts.google.com': fireBaseGoogleResult._tokenResponse.oauthIdToken
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





// function onSignIn(googleToken) {
//   // Google have OK'd the sign-in
//   // pass the token into our web app
//   console.log("encoded token");
//   console.log(googleToken);  
//   credentialExchange(googleToken);
// }

// function credentialExchange(googleToken) {
//   // Create a decoded version of the token so we can print things out

//   console.log("Creating decoded token...");
//   const googleTokenDecoded = parseJwt(googleToken.credential);
  
//   // Output some details onto the browser console to show the token working
//   console.log("ID: " + googleTokenDecoded.sub);
//   console.log('Full Name: ' + googleTokenDecoded.name);
//   console.log("Email: " + googleTokenDecoded.email);
  
//   if (googleTokenDecoded['sub']) {
    
//     // We can't access anything in AWS with a google token...
//     // ... so we need to exchange it using Cognito for AWS credentials
//     console.log("Exchanging Google Token for AWS credentials...");
//     AWS.config.region = 'us-east-1'; 
//     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//       IdentityPoolId: 'us-east-1:5ab5b15a-4e23-43ce-8ef0-743d7d0e07e0', // MAKE SURE YOU REPLACE THIS
//       Logins: {
//         'accounts.google.com': googleToken.credential
//       }
//     });

//     // Now lets obtain the credentials we just swapped
//     AWS.config.credentials.get(function(err) {
//       if (!err) {
//         console.log('showing AWS.config.credentials');
//         console.log(AWS.config.credentials);
//         console.log('Exchanged to Cognito Identity Id: ' + AWS.config.credentials.identityId);
//         // if we are here, things are working as they should...
//         // ... now lets call a function to access images, generate signed URL's and display
//         accessImages();
//       } else {
//         // if we are here, bad things have happened, so we should error.
//         document.getElementById('output').innerHTML = "<b>YOU ARE NOT AUTHORISED TO QUERY AWS!</b>";
//         console.log('ERROR: ' + err);
//       }
//     });

//   } else {
//     console.log('User not logged in!');
//   }
// }

// function accessImages() {
  
//   // Using the temp AWS Credentials, lets connect to S3
//   console.log("Creating Session to S3...");
//   var s3 = new AWS.S3();
//   var params = {
//     Bucket: "private-app-bucket" // MAKE SURE YOU REPLACE THIS
//   }; 

//   // If we are here, things are going well, lets list all of the objects in the bucket
//   s3.listObjects(params, function(err, data) {
//     console.log("Listing objects in patchesprivate bucket...");
//     if (err) {
//       document.getElementById('output').innerHTML = "<b>YOU ARE NOT AUTHORISED TO QUERY AWS!</b>";
//       console.log(err, err.stack);
//     } else {
//       console.log('AWS response:');
//       console.log(data);
//       var href = this.request.httpRequest.endpoint.href;
//       var bucketUrl = href + data.Name + '/';
      
//       // for all of the images in the bucket, we need to generate a signedURL for the object
//       var photos = data.Contents.map(function(photo) {
//         var photoKey = photo.Key;
        
//         console.log("Generating signedURL for : " + photoKey);
//         var url = s3.getSignedUrl ('getObject', {
//           Bucket: data.Name,
//           Key: photoKey
//         })

//         //var photoUrl = bucketUrl + encodeURIComponent(photoKey);
//         return getHtml([
//           '<span>',
//             '<div>',
//               '<br/>',
//               '<a href="' + url + '" target="_blank"><img style="width:224px;height:224px;" src="' + url + '"/></a>',
//             '</div>',
//             '<div>',
//               '<span>',
//               '</span>',
//             '</div>',
//           '</span>',
//         ]);
//       });

//       // let's take those signedURL's, create a HTML page, and display it in the web browser
//       var htmlTemplate = [ '<div>',   getHtml(photos), '</div>']
//       console.log("Creating and returning html...")
//       document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
//     }    

//   });
// }

// // A utility function to create HTML.
// function getHtml(template) {
//   return template.join('\n');
// }

// // A utility function to decode the google token
// function parseJwt(token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace('-', '+').replace('_', '/');
//   var plain_token = JSON.parse(window.atob(base64));
//   return plain_token;
// };