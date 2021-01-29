import '../style/App.css';
import '../style/button.css';
import Container from '../components/Container';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function About() {
    return (
        <div>
            <Heading title={"About"}/>

            <Container content={"This is About Page"}/>

        </div>
    );
}

export default About;