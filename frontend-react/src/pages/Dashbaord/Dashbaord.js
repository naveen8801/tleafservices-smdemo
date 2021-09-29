import React, { useState, useEffect } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import TweetsShowBoard from '../../components/TweetsShowBoard/TweetsShowBoard';
import './Dashbaord.css';
import FilterDiv from '../../components/FilterDiv/FilterDiv';
import CategoryCounter from '../../components/CategoryCounter/CategoryCounter';
import { getLatestTweets } from './../../api/api';
import TypeColoumnChart from '../../components/Charts/TypeColoumnChart/TypeColoumnChart';
import SentimentPieChart from '../../components/Charts/SentimentPieChart/SentimentPieChart';
import GaugeChart from 'react-gauge-chart/dist/GaugeChart';
import CategoryGaugeChart from '../../components/Charts/CategoryGaugeChart/CategoryGaugeChart';
import HistoricDataCard from '../../components/HistoricDataCard/HistoricDataCard';

function Dashbaord() {
  const [sectionIndex, setsectionIndex] = useState(0);
  const [filters, setfilters] = useState([]);
  const [RealtimeTweetsList, setRealtimeTweetsList] = useState([]);
  const [LastHourTweetsList, setLastHourTweetsList] = useState([]);
  const [seconds, setseconds] = useState(0);

  const activeTopBarSection = (index) => {
    setsectionIndex(index);
  };
  const TellMeFilters = (list_) => {
    setfilters(list_);
  };

  useEffect(() => {
    fetchRealtimeTweets(RealtimeTweetsList);
    const interval_new = setInterval(() => {
      fetchRealtimeTweets(RealtimeTweetsList);
    }, 1000 * 60);
    return () => clearInterval(interval_new);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setseconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchRealtimeTweets = async (previousList) => {
    try {
      console.log('Realtime fetching......');
      const res = await getLatestTweets();
      var ids = new Set(previousList.map((d) => d._id));
      const merged = [
        ...res.data.filter((d) => !ids.has(d._id)),
        ...previousList,
      ];
      setRealtimeTweetsList((previousList) => (previousList = merged));
      setseconds((seconds) => (seconds = 0));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistoricData = async () => {
    console.log('historic data fetched fetched');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-topbar">
        <TopBar
          HistoricDataFetch={() => fetchHistoricData}
          active={sectionIndex}
          activeCheck={(index) => activeTopBarSection(index)}
        />
      </div>
      <div className="dashboard-content">
        {sectionIndex === 0 ? (
          <div className="social-feed-div">
            <TweetsShowBoard
              TweetList={RealtimeTweetsList}
              realtime
              filters={filters}
              seconds={seconds}
            />
            <FilterDiv filters={(list) => TellMeFilters(list)} />
          </div>
        ) : null}
        {sectionIndex === 1 ? (
          <div className="last-hour-div">
            <div className="last-hour-sub-div">
              <div className="last-hour-content-data">
                <div>
                  <HistoricDataCard />
                </div>
                {/* <div
                  style={{ width: '300px', display: 'flex', flexWrap: 'wrap' }}
                >
                 
                  <CategoryCounter title="Incident" value={23} />
                  <CategoryCounter title="Info" value={13} />
                  <CategoryCounter title="Other" value={33} />
                </div> */}
                <SentimentPieChart />
              </div>
              <div className="last-hour-content">
                <TweetsShowBoard
                  TweetList={LastHourTweetsList}
                  filters={filters}
                />
              </div>
            </div>
            <FilterDiv filters={(list) => TellMeFilters(list)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashbaord;
