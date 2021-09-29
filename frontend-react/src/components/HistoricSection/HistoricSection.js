import React, { useState, useEffect } from 'react';
import './HistoricSection.css';
import { Container, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TweetCard from '../TweetsShowBoard/TweetCard/TweetCard';
import { getHistoricTweets } from './../../api/api';

const data = [
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Incident',
  },
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Comment',
  },
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Compliment',
  },
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Compliment',
  },
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Info',
  },
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Incident',
  },
  {
    img: 'asscscc',
    handle: 'naveen8801',
    text: 'this is tweet text,  well done , great work , this is testing, am doing this work , this is going here',
    time: '7 Sept 2021',
    type: 'Comment',
  },
];

function HistoricSection(props) {
  const [AllTweets, setAllTweets] = useState([]);
  const [incidentTweets, setIncidentTweets] = useState([]);
  const [ComplainTweets, setcomplainTweets] = useState([]);
  const [complimenttweets, setcomplimentTweets] = useState([]);
  const [infoTweets, setInfoTweets] = useState([]);
  const [countData, setCountData] = useState([0, 0, 0, 0]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchHistoricTweets();
  }, []);

  const fetchHistoricTweets = async () => {
    try {
      console.log('Historic data fetching ..');
      const res = await getHistoricTweets(7);
      setAllTweets(res.data);
      const now = res.data;
      const IncidentList = now.filter((i) => i.type === 'Incident');
      const ComlplimentList = now.filter((i) => i.type === 'Compliment');
      const complainList = now.filter((i) => i.type === 'Complain');
      const InfoList = now.filter((i) => i.type === 'Info');
      setIncidentTweets((pi) => (pi = IncidentList));
      setcomplainTweets((p) => (p = complainList));
      setcomplimentTweets((p) => (p = ComlplimentList));
      setInfoTweets((p) => (p = InfoList));
      let p = 0;
      let n = 0;
      let neu = 0;
      for (let i = 0; i < now.length; i++) {
        if (now[i].sentiment === 'Positive') {
          p++;
        } else if (now[i].sentiment === 'Negative') {
          n++;
        } else {
          neu++;
        }
      }
      setCountData((pi) => (pi = [p + n + neu, p, n, neu]));
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    props.countDataTell(countData);
    props.alltweets(AllTweets);
  }, [countData, AllTweets]);

  return (
    <Container fluid className="bg-light cont-coloumn-wise">
      <div className="new-div">
        <h5 className="heading-coloumns">Info</h5>
        <div className="flex-item-board-historic">
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : null}
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
        </div>
      </div>
      <div className="new-div">
        <h5 className="heading-coloumns">Incident</h5>
        <div className="flex-item-board-historic">
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : null}
          {incidentTweets.map((i, index) => (
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
        </div>
      </div>
      <div className="new-div">
        <h5 className="heading-coloumns">Compliment</h5>{' '}
        <div className="flex-item-board-historic">
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : null}
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
        </div>
      </div>
      <div className="new-div">
        <h5 className="heading-coloumns">Complain</h5>
        <div className="flex-item-board-historic">
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : null}
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
        </div>
      </div>
    </Container>
  );
}

export default HistoricSection;
