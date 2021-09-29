import React, { useState, useEffect } from 'react';
import './Header.css';
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import logo from './smims_logo.png';
import { Gear, PeopleFill } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import Setting from '../Settings/Setting';
import { getKeywords, updateKeywords } from './../../api/api';

const default_string =
  '(Madhya AND Pradesh AND Police) OR (Indore AND police) OR (Bhopal AND Police) OR (Jabalpur AND Police) OR (Burhanpur AND Police) OR (Khandwa AND Police) OR (Ujjain AND Police) OR (Dhar AND Police) OR (Harda AND Police) OR (Gwalior AND Police) OR (Hoshangabad AND Police) OR (Ratlam AND Police) OR (Hoshangabad AND Police) OR (Seoni AND Police)  -filter:retweets AND filter:replies,(@mpdial100) OR (@PoliceIndore) OR (@dgp_mp) OR (@bhopal_police) OR (@igp_bhopal_mp) OR (@MpPoliceOffici1)  -filter:retweets AND filter:replies';

function Header(props) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [keywordstring, setkeywordstring] = useState(default_string);

  useEffect(() => {
    get_Keywords();
  }, []);

  const get_Keywords = async () => {
    try {
      const res = await getKeywords();
      setkeywordstring(res.data.keywords.join(','));
    } catch (err) {
      console.log(err);
    }
  };

  const update_Keywords = async () => {
    try {
      const data = {
        keywords: keywordstring.split(','),
      };
      const res = await updateKeywords(data);
      get_Keywords();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const setkeywords = (p) => {
    setkeywordstring(p);
  };

  const setToDefault = () => {
    setkeywordstring(default_string);
  };

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Setting
            setkeywordstring={(p) => setkeywords(p)}
            string={keywordstring}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={setToDefault}
            disabled={keywordstring === default_string ? true : false}
          >
            Set to Default
          </Button>
          <Button onClick={update_Keywords}>Apply Changes</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <Container
        fluid
        style={{
          width: '100%',
          margin: '0px',
          display: 'flex',
          flexDirection: 'row',
          padding: '0.5rem 2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start ',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <img src={logo} width={80} />
          <div>
            <h4 className="title_h4" style={{ marginLeft: '1rem' }}>
              Social Media Intelligence System (SMIS)
            </h4>
            <h6 className="title_h6" style={{ marginLeft: '1rem' }}>
              {props.login
                ? 'Actionable Intelligence, Meaningful Insights'
                : 'Actionable Intelligence, Meaningful Insights'}
            </h6>
          </div>
        </div>
        {props.login ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '50%',
            }}
          >
            <Gear
              onClick={handleShow}
              className="icon-header"
              size={25}
              style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }}
            />
            <PeopleFill
              className="icon-header"
              size={25}
              style={{ marginLeft: '0.3rem' }}
            />
            Welcome User
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default Header;
