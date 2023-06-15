import React from 'react';
import BetsHistory from '../../components/betsHistory/BetsHistory';
import LiveStream from '../../components/liveStream/LiveStream';
import TwitchChat from '../../components/twitchChat/TwitchChat';
import LiveData from '../../components/liveData/LiveData';

const Fight = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen p-4">
      <div className="w-48 hidden lg:block shrink-0" />
      <div className="flex-grow relative">
        <div className="flex flex-col md:flex-row justify-between h-1/2 mt-2">
          <div className="h-full md:w-full md:pr-2 flex items-center justify-center ">
            <div className="w-full h-full">
              <LiveStream />
            </div>
          </div>
          <div className="h-full md:w-1/2 md:pl-2 flex items-center justify-center md:pr-4">
            <div className="w-full">
              <LiveData />
            </div>
          </div>
        </div>
        <div className="w-full mt-2 md:absolute md:top-1/2 md:translate-y-1/2 md:pr-4">
          <BetsHistory />
        </div>
      </div>
      <TwitchChat />
    </div>
  );
};

export default Fight;