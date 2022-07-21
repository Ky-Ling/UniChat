import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Chats() {
	const history = useHistory();
	const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const getFile = async(url) => {
    const response = await fetch(url);

    // blob method is used for any files, like images or any other type of files that you want to translate
    //    over in binary format.
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpg" })
  }
  
  useEffect(() => {
    if(!user) {
      history.push("/");
      return;
    }

    axios.get("https://api.chatengine.io/users/me", {
      headers: {
        "project-id": "c141e069-ced3-4c69-a68e-84b5a59b0d7d",
        "user-name": user.email,
        "user-secret": user.uid
      }  
    })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        // Prepare all the data to create a new user
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios.post("https://api.chatengine.io/users/", formdata, {
              headers: { "private-key": "e0b7233e-7892-46b0-b605-81a2009a928e" }
            })
              .then(() => setLoading(false))
              .catch((error) => console.log(error))

          })
      })


  }, [user, history])


  if(!user || loading) return "Loading....";

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">UniChat</div>
				<div onClick={handleLogout} className="logout-tab">
					Logout
				</div>
			</div>

			<ChatEngine
				height="calc(100vh-66px)"
				projectID="c141e069-ced3-4c69-a68e-84b5a59b0d7d"
				userName={ user.email }
				userSecret={ user.uid }
			/>
		</div>
	);
}

export default Chats;
