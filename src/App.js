import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'c8229913746b483999a220a080dfd59b'
});

const particlesOptions = {
		particles: {
		  number: {
		    value: 50,
		    density:{
		      enable: true,
		      value_area: 800,
  		    }
  		  }
  		}
		};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
    };
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(height, width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response =>
        // do something with response
        this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    this.setState({route: route});
  }
  
  render() {
    return (
      <div className="App">
      
        <Particles className='particles'
          params={particlesOptions}
        />
      
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route ==='signin' 
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <div> 
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
            </div>
        }
      </div>
    );
  }
}

export default App;
 