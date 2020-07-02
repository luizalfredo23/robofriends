import React, {Component} from 'react';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
    
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(reponse => reponse.json())
        .then(users => this.setState({robots: users})); 
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render(){
        console.log('render');
        const {robots, searchfield} = this.state;

        const filteredRobots = robots.filter(robots =>{
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if(robots.length === 0){
            return <h1>Loading...</h1>
        }else{

            return (
                <div className = 'tc'>
                    <h1>Robo friends</h1>
                    <h2>Each card a robo friend for you</h2>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                   
                </div>
            );

        }
    }
}

export default App;