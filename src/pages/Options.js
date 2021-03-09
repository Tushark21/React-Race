import '../style/App.css';
import '../style/button.css';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import PrimaryLayout from '../layout/PrimaryLayout';
import Button from '../components/Button';
import React from 'react';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carIndex: 1
    };
  }

  changeIndex(updateVar) {
    let newIndex=this.state.carIndex;
    newIndex+= updateVar;
    newIndex = newIndex > 5 ? 5 : newIndex;
    newIndex = newIndex < 1 ? 1 : newIndex;
    this.setState({
      carIndex: newIndex
    });
    //console.log(updateVar);
  }
  render() {


    return (
      <PrimaryLayout>
        <Heading className={'heading_class'} title={"Options"} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className='text_class' style={{ backgroundColor: '#00000025', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            <div margin='10px' >
              <div>Sounds</div>
              <Button text='ON'></Button>
            </div>
            <div style={{ width: '100%', marginTop: '10px' }} >
              <div>Select Car</div>

              <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <div style={{ width: '16rem', borderRadius: "5px", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <img alt='cars' src={require('../assets/car' + this.state.carIndex + '.png').default}></img>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px', marginTop: '20px', width: '100%' }}>
                    <button onClick={() => { this.changeIndex(-1); }} style={{ borderRadius: '5px', backgroundColor: '#00000025', border: '0px', width: '40%' }} text='<'>{'<'}</button>
                    <button onClick={() => { this.changeIndex(1); }} style={{ borderRadius: '5px', backgroundColor: '#00000025', border: '0px', width: '40%' }} text='<'>{'>'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PrimaryLayout>
    );
  }
}

export default Options;
