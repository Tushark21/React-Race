import '../style/App.css';
import '../style/button.css';
import '../style/game-panel.css';
import Button from '../components/Button';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

function Menu() {

  const history = useHistory();

  return (
    <div className='text_class main_container'>
      <div style={{display: 'flex', alignItems: 'flex-start' }}>
        <div style={{display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '320px', display: 'flex', flexDirection: 'column',flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              R
          </p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column',flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '120px', display: 'flex', flexDirection: 'column',flexWrap: 'wrap', justifyContent: 'flex-end' }}>eact</p>
            <p style={{ fontSize: '120px', display: 'flex', flexDirection: 'column',flexWrap: 'wrap', justifyContent: 'flex-end' }}>ace</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Button text={"Start"} history={history} loc={"gamescreen"} />

          <Button text={"Options"} history={history} loc={"options"} />

          <Button text={"About"} history={history} loc={"about"} />
        </div>
      </div>
    </div>
  );
}

export default Menu;
