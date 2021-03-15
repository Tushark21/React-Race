import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      togg: false,
      classTop: 'sandwich_button_bar top',
      classMid: 'sandwich_button_bar middle',
      classBottom: 'sandwich_button_bar bottom'
    };
  }

  toggle = () => {
    console.log(this.state.togg);
    if (!this.state.togg) {
      this.setState({
        togg: true,
        classTop: 'sandwich_button_bar top move_left',
        classMid: 'sandwich_button_bar middle mid_rotate',
        classBottom: 'sandwich_button_bar bottom move_right'
      });
    }
    else {
      this.setState({
        togg: false,
        classTop: 'sandwich_button_bar top',
        classMid: 'sandwich_button_bar middle',
        classBottom: 'sandwich_button_bar bottom'
      });
    }

  }

  render() {
    return (
      <div className={'header_container'}>

        <img alt={'app-logo'} className={'icon_img'} src={require('../assets/app-logo.png').default} ></img>

        <div className={"sandwich_button"} onClick={this.toggle}>
          <div >
            <span id="topLine" className={this.state.classTop}></span>
            <span id="midLine" className={this.state.classMid}></span>
            <span id="bottomLine" className={this.state.classBottom}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
