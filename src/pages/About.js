import '../style/App.css';
import '../style/button.css';
import Container from '../components/Container';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import PrimaryLayout from '../layout/PrimaryLayout';

function About() {
    return (
        <PrimaryLayout>
            <Heading title={"About"}/>
            <Container content={"This is About Page"}/>
        </PrimaryLayout>
    );
}

export default About;