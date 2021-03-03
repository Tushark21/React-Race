import '../style/App.css';
import '../style/button.css';
import '../style/game-panel.css';
import Button from '../components/Button';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Name from '../components/Name';

function Menu() {

  const history = useHistory();

  return (

    <div className={'App'}>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12">
            <div className='text_class main_container'>
              <Name fontSizes={['120px', '340px']} />

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Button text={"Start"} history={history} loc={"gamescreen"} />

                <Button text={"Options"} history={history} loc={"options"} />

                <Button text={"About"} history={history} loc={"about"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
