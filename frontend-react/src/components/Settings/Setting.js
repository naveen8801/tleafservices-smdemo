import React, { useState, useEffect } from 'react';
import './settings.css';
import { Tab, Tabs, Form, FloatingLabel } from 'react-bootstrap';
import { getKeywords, updateKeywords } from './../../api/api';

const default_keywords =
  '(Madhya AND Pradesh AND Police) OR (Indore AND police) OR (Bhopal AND Police) OR (Jabalpur AND Police) OR (Burhanpur AND Police) OR (Khandwa AND Police) OR (Ujjain AND Police) OR (Dhar AND Police) OR (Harda AND Police) OR (Gwalior AND Police) OR (Hoshangabad AND Police) OR (Ratlam AND Police) OR (Hoshangabad AND Police) OR (Seoni AND Police)  -filter:retweets AND filter:replies,(@mpdial100) OR (@PoliceIndore) OR (@dgp_mp) OR (@bhopal_police) OR (@igp_bhopal_mp) OR (@MpPoliceOffici1)  -filter:retweets AND filter:replies';

function Setting(props) {
  const [key, setKey] = useState('Twitter');

  return (
    <div className="settings-div">
      <h6 className="sub">
        Choose the social media and internet sites to scan
      </h6>
      <div className="tabs-div">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Twitter" title="Twitter"></Tab>
          <Tab eventKey="Facebook" title="Facebook"></Tab>
          <Tab eventKey="Websites" title="Websites"></Tab>
        </Tabs>
      </div>
      <div className="text-area-div">
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Specify the handles or keywords to track"
        >
          <Form.Control
            as="textarea"
            placeholder="Specify the handles or keywords to track"
            style={{ height: '250px' }}
            value={props.string}
            onChange={(e) => props.setkeywordstring(e.target.value)}
          />
        </FloatingLabel>
      </div>
    </div>
  );
}

export default Setting;
