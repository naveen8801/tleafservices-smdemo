import React from 'react';
import './TweetCard.css';
import { Card } from 'react-bootstrap';
import { Twitter } from 'react-bootstrap-icons';

function TweetCard(props) {
  const TypeColor = (type) => {
    if (type === 'Incident') {
      return '#FF616D';
    } else if (type === 'Info') {
      return '#9FE6A0';
    } else {
      return '#E1E5EA';
    }
  };
  return (
    <a
      className="tweet_link"
      href={`https://twitter.com/${props.handle}/status/${props.id}`}
      target="_blank"
    >
      <div className="tweet-card">
        <Card className="tweet-card_in" stye={{ width: '100%' }}>
          <div className="indicator-div">
            <Twitter size={18} color="#1DA1F2" />
            {props.alert === "True" ? <div className="alert-indicator-div"></div> : null}
          </div>
          <div className="tweetcard-sub-div">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img alt="tweet" src={props.img} className="avatar" />
              <h3 className="tweet-card-handle">{props.handle}</h3>
            </div>
            <h4 className="tweet-time">{props.time}</h4>
          </div>
          <p className="tweetcard-text">{props.text}</p>
        </Card>
      </div>
    </a>
  );
}

export default TweetCard;
