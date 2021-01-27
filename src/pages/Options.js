import '../style/App.css';
import '../style/button.css';
import Container from '../components/Container';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function Options() {
  return (
    <div className="App">
      <Heading title={"Options"}/>

      <Container content={"Options will be given Here."}/>
      
    </div>
  );
}

export default Options;
