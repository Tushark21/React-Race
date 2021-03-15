import Button from '../components/Button';
import { useHistory } from 'react-router-dom';

function Menu() {

  const history = useHistory();

  return (
    <div className={'menu'}>
      <div className={'text_class menu_container'}>
        <div>
          <img className={'screen_responsive'} alt='app-logo' src={require('../assets/app-logo.png').default}></img>
        </div>

        <div className={'screen_responsive button_container'}>
          <Button text={"Start"} history={history} loc={"gamescreen"} />

          <Button text={"Options"} history={history} loc={"options"} />

          <Button text={"About"} history={history} loc={"about"} />
        </div>
      </div>
    </div>
  );
}

export default Menu;
