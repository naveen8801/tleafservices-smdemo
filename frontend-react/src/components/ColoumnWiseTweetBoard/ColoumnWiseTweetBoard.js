import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import TweetCard from '../TweetsShowBoard/TweetCard/TweetCard';
import './ColoumnWiseTweetBoard.css';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getLatestTweets } from './../../api/api';

function ColoumnWiseTweetBoard(props) {
  const [seconds, setseconds] = useState(30);
  const [RealtimeTweetsList, setRealtimeTweetsList] = useState([]);
  const [incidentTweets, setIncidentTweets] = useState([]);
  const [ComplainTweets, setcomplainTweets] = useState([]);
  const [complimenttweets, setcomplimentTweets] = useState([]);
  const [infoTweets, setInfoTweets] = useState([]);
  const [countData, setCountData] = useState([0, 0, 0, 0]);
  const [load, setload] = useState(true);

  useEffect(() => {
    fetchRealtimeTweets();
  }, [props.isrefreshclicked]);

  useEffect(() => {
    fetchRealtimeTweets(RealtimeTweetsList);
    const interval_new = setInterval(() => {
      fetchRealtimeTweets(RealtimeTweetsList);
    }, 1000 * 30);
    return () => clearInterval(interval_new);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setseconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // console.log(`https://twitter.com/${RealtimeTweetsList[0].handle}/status/${RealtimeTweetsList[0]._id}`);

  const fetchRealtimeTweets = async (previousList) => {
    try {
      setload((load) => (load = true));
      console.log('Realtime fetching......');
      const res = await getLatestTweets();
      var ids = new Set(previousList.map((d) => d._id));
      const merged = [
        ...res.data.filter((d) => !ids.has(d._id)),
        ...previousList,
      ];
      setRealtimeTweetsList((previousList) => (previousList = merged));
      const IncidentList = merged.filter((i) => i.type === 'Incident');
      const ComlplimentList = merged.filter((i) => i.type === 'Compliment');
      const complainList = merged.filter((i) => i.type === 'Complain');
      const InfoList = merged.filter((i) => i.type === 'Info');
      setIncidentTweets((pi) => (pi = IncidentList));
      setcomplainTweets((p) => (p = complainList));
      setcomplimentTweets((p) => (p = ComlplimentList));
      setInfoTweets((p) => (p = InfoList));
      setseconds((seconds) => (seconds = 30));
      let p = 0;
      let n = 0;
      let neu = 0;
      for (let i = 0; i < merged.length; i++) {
        if (merged[i].sentiment === 'Positive') {
          p++;
        } else if (merged[i].sentiment === 'Negative') {
          n++;
        } else {
          neu++;
        }
      }
      setCountData((pi) => (pi = [p + n + neu, p, n, neu]));
      setload((load) => (load = false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    props.countDataTell(countData);
    props.TellMeSeconds(seconds);
  }, [countData, seconds]);

  return (
    <Container fluid className="bg-light cont-coloumn-wise">
      <div className="new-div">
        <h5 className="heading-coloumns">Info</h5>
        <div className="flex-item-board-live">
          {load || infoTweets.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <CircularProgress /> */} Tweets are being fetched or no tweets
            </div>
          ) : (
            <>
              {infoTweets.map((i, index) => (
                <TweetCard
                  id={i._id}
                  key={index}
                  img={i.img}
                  handle={i.handle}
                  text={i.text}
                  type={i.type}
                  time={moment(i.Date).fromNow()}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="new-div">
        <h5 className="heading-coloumns">Incident</h5>
        <div className="flex-item-board-live">
          {load || incidentTweets.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <CircularProgress /> */} Tweets are being fetched or no tweets
            </div>
          ) : (
            <>
              {incidentTweets.map((i, index) => (
                <TweetCard
                  id={i._id}
                  key={index}
                  img={i.img}
                  handle={i.handle}
                  text={i.text}
                  type={i.type}
                  time={moment(i.Date).fromNow()}
                  alert={i.alert}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="new-div">
        <h5 className="heading-coloumns">Complain</h5>
        <div className="flex-item-board-live">
          {load || ComplainTweets.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Tweets are being fetched or no tweets
            </div>
          ) : (
            <>
              {ComplainTweets.map((i, index) => (
                <TweetCard
                  id={i._id}
                  key={index}
                  img={i.img}
                  handle={i.handle}
                  text={i.text}
                  type={i.type}
                  time={moment(i.Date).fromNow()}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="new-div">
        <h5 className="heading-coloumns">Compliment</h5>
        <div className="flex-item-board-live">
          {load || complimenttweets.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Tweets are being fetched or no tweets
            </div>
          ) : (
            <>
              {complimenttweets.map((i, index) => (
                <TweetCard
                  id={i._id}
                  key={index}
                  img={i.img}
                  handle={i.handle}
                  text={i.text}
                  type={i.type}
                  time={moment(i.Date).fromNow()}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ColoumnWiseTweetBoard;
