import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import BootStrapCard from '../../components/BootStrapCard/BootStrapCard';
import SentimentPieChart from '../../components/Charts/SentimentPieChart/SentimentPieChart';
import TopBar from '../../components/TopBar/TopBar';
import './NewDashboard.css';
import ColoumnWiseTweetBoard from '../../components/ColoumnWiseTweetBoard/ColoumnWiseTweetBoard';
import HistoricSection from '../../components/HistoricSection/HistoricSection';
import MultiBarCharts from '../../components/Charts/MutiBarCharts/MultiBarCharts';
import moment from 'moment';

function NewDashboard() {
  const [sectionIndex, setsectionIndex] = useState(0);
  const [cardcountdata, setcardcountdata] = useState([0, 0, 0, 0]);
  const [seconds, setseconds] = useState(0);
  const [allTweets, setAlltweets] = useState([]);
  const [barchartData, setbarchartdata] = useState([[], [], [], []]);
  const [isrefreshclicked, setrefresh] = useState(false);

  const activeTopBarSection = (index) => {
    setsectionIndex(index);
  };

  const getCountData = (inp) => {
    setcardcountdata(inp);
  };

  const RefreshHandler = () => {
    setrefresh(!isrefreshclicked);
  };

  const getAllTweets = (list) => {
    setAlltweets(list);
    let group = allTweets.reduce((r, a) => {
      const date = moment(a.Date).format('DD-MMM');
      r[date] = [...(r[date] || []), a];
      return r;
    }, {});
    const keys = Object.keys(group);
    let pos = new Array(keys.length).fill(0);
    let neg = new Array(keys.length).fill(0);
    let neu = new Array(keys.length).fill(0);

    for (let i = 0; i < keys.length; i++) {
      let current = group[keys[i]];
      for (let j = 0; j < current.length; j++) {
        if (current[j].sentiment === 'Positive') {
          pos[i]++;
        } else if (current[j].sentiment === 'Negative') {
          neg[i]++;
        } else {
          neu[i]++;
        }
      }
    }
    setbarchartdata([keys, pos, neg, neu]);
  };

  const GetSeconds = (s) => {
    setseconds(s);
  };

  return (
    <div className="new-dash-div">
      <Container
        class="bg-light"
        fluid
        style={{
          width: '100%',
          margin: '0px',
          padding: '0.5rem 2rem',
        }}
      >
        <TopBar
          active={sectionIndex}
          activeCheck={(index) => activeTopBarSection(index)}
        />
        {sectionIndex === 0 ? (
          <div>
            <h6
              style={{
                fontSize: '13px',
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              Dashboard will update in {seconds} seconds
            </h6>
            <Button className="refresh-btn" onClick={RefreshHandler}>
              Refresh
            </Button>
          </div>
        ) : null}
        <div className="chart-card-content">
          <div className="bg-light chart-card-content-sub">
            <h6
              style={{
                width: '100%',
                fontSize: '14px',
                marginLeft: '2rem',
                textAlign: 'center',
                margin: '0px',
                paddingBottom: '1rem',
                textAlign: 'left',
                paddingLeft: '1rem',
              }}
            >
              {sectionIndex === 0
                ? 'No. Of Impressions (Last 24 Hours) '
                : 'No. Of Impressions (Last 7 days)'}
            </h6>
            <BootStrapCard title="Total Tweets" value={cardcountdata[0]} />
            <BootStrapCard title="Positive Tweets" value={cardcountdata[1]} />
            <BootStrapCard title="Negative Tweets" value={cardcountdata[2]} />
          </div>
          {sectionIndex === 0 ? (
            <div className="bg-light chart-div">
              <SentimentPieChart
                data={[cardcountdata[1], cardcountdata[2], cardcountdata[3]]}
              />
            </div>
          ) : (
            <div className="bg-light chart-div">
              <MultiBarCharts data={barchartData} />
            </div>
          )}
        </div>
      </Container>
      {sectionIndex === 0 ? (
        <Container
          class="bg-light"
          fluid
          style={{
            width: '100%',
            margin: '0px',
            padding: '0.5rem 2rem',
            marginTop: '0.8rem',
          }}
        >
          <ColoumnWiseTweetBoard
            isrefreshclicked={isrefreshclicked}
            TellMeSeconds={(s) => GetSeconds(s)}
            countDataTell={(p) => getCountData(p)}
          />
        </Container>
      ) : (
        <Container
          class="bg-light"
          fluid
          style={{
            width: '100%',
            margin: '0px',
            padding: '0.5rem 2rem',
            marginTop: '1.2rem',
          }}
        >
          <HistoricSection
            alltweets={(l) => getAllTweets(l)}
            countDataTell={(p) => getCountData(p)}
          />
        </Container>
      )}
    </div>
  );
}

export default NewDashboard;
