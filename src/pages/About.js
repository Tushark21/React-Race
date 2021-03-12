import Container from '../components/Container';
import Heading from '../components/Heading';
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