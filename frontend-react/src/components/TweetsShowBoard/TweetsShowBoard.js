import React, { useState } from 'react';
import TweetCard from './TweetCard/TweetCard';
import './TweetsShowBoard.css';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

function TweetsShowBoard(props) {
  return (
    <div className="board">
      {props.TweetList.length === 0 ? (
        <CircularProgress />
      ) : (
        <>
          {props.realtime ? (
            <h5 className="tweet-board-update-time">
              Updated {props.seconds} seconds ago
            </h5>
          ) : null}
          <div className="sub-board">
            {props.TweetList.filter((item) =>
              props.filters.includes(item.type)
            ).map((i, index) => (
              <TweetCard
                key={index}
                img={i.img}
                handle={i.handle}
                text={i.text}
                type={i.type}
                time={moment(i.Date).fromNow()}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TweetsShowBoard;
