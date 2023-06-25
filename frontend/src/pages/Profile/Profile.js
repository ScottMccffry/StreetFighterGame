// LiveFeed.js

import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ContentProfile from '../../components/contentProfile/ContentProfile';
import ItemsProfile from '../../components/itemsProfile/ItemsProfile';
import Items from '../../components/items/Items'

const API_BASE_URL = 'http://127.0.0.1:5000';


  const Profile = () => {
    const [userData, setUserData] = useState(null);
    const { walletAddress } = useParams();
  
    useEffect(() => {
      const fetchUserData = async () => {
        // replace this URL with the URL of your actual API
        const result = await axios.get(`${API_BASE_URL}/users/${walletAddress}`);
        setUserData(result.data);
      };
  
      fetchUserData();
    }, [walletAddress]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-48 hidden lg:block shrink-0" />
      <div className="grow ">
        <ContentProfile />
        <ItemsProfile />
      </div>
    </div>
  );
};

export default Profile;