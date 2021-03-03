import '../style/App.css';
import '../style/button.css';
import Container from '../components/Container';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import PrimaryLayout from '../layout/PrimaryLayout';

function Options() {
  return (
    <PrimaryLayout>
      <Heading className={'heading_class'} title={"Options"}/>

      <Container content={"Options will be given Here."}/>
      
    </PrimaryLayout>
  );
}

export default Options;
