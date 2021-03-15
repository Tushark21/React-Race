import Heading from '../components/Heading';
import PrimaryLayout from '../layout/PrimaryLayout';
import React from 'react';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carIndex: 1,
      soundButtonClass: 'button_class',
      buttonText: 'ON'
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
  }

  toggle(){
    let newText=this.state.buttonText;
    newText=newText==='ON'?'OFF':'ON';

    this.setState(
      {
        buttonText: newText
      }
    )
  }

  render() {
    return (
      <PrimaryLayout>
        <Heading title={"Options"} />
        <div className={'options_container'}>
          <div className={'text_class options_card'} >
            <div>
              <div>Sounds</div>
              <button onClick={()=>{this.toggle(); }} className={'button_class'} >{this.state.buttonText}</button>
            </div>
            <div className={'car_select_container'} >
              <div>Select Car</div>

              <div className={'car_view_container'}>
                <div className={'car_view_inside'}>
                  <img alt='cars' src={require('../assets/car' + this.state.carIndex + '.png').default}></img>
                  <div className={'select_button_container'}>
                    <button className={'select_button text_class'} onClick={() => { this.changeIndex(-1); }} >{'<'}</button>
                    <button className={'select_button text_class'} onClick={() => { this.changeIndex(1); }} >{'>'}</button>
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
