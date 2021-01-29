import '../style/App.css';
import '../style/button.css';
import Container from '../components/Container';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function Options() {
  return (
    <div>
      <Heading className={'heading_class'} title={"Options"}/>

      <Container content={"Options will be given Here."}/>
      
    </div>
  );
}

export default Options;
