import React from 'react';
import LoginForm from '../../components/loginForm/LoginForm';
import OTPForm from '../../components/OTPForm/OTPForm';
import WidgetBar from '../../components/widgetBar/WidgetBar';
import RevenueGraph from '../../components/revenueGraph/RevenueGraph';
import Table from '../../components/table/Table';
import DailyTraffic from '../../components/dailyTraffic/DailyTraffic';
import AccordeonAddDb from '../../components/accordeonAddDb/AccordeonAddDB';

const Home = () => {
  return <div className="flex flex-col md:flex-row h-full">
  <div className="w-48 hidden lg:block shrink-0" />
  <div className="grow">
    <WidgetBar/>
    <div className="flex md:flex-row mt-2">
      <div className="w-full md:w-1/2 mr-1">
        <RevenueGraph/>
      </div>
      <div className="w-full md:w-1/2 ml-1 mr-2">
        <Table/>
      </div>
    </div>
    <div className="flex md:flex-row mt-2">
    <div className="w-full md:w-1/2 mr-1">
    <AccordeonAddDb />
    </div>
    <div className="w-full md:w-1/2 ml-1 mr-2">
    < DailyTraffic/>
    </div>
    </div>
    
  </div>
</div>
};

export default Home;