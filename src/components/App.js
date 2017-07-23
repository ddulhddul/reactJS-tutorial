import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: Math.round(Math.random()*100)
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(randomValue){
        this.setState({
            value: randomValue
        });
    }

    render(){

        return (                
            <div>
                <Contact/>
                <Header title={this.props.headerTitle}/>
                <Content title={this.props.contentTitle}
                        body={this.props.contentBody}/>
                <RandomNumber number={this.state.value}
                            onUpdate={this.updateValue}/>
            </div>
        );
    }
}

class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contactData: [
                {name:'Abet', phone:'010-0000-0000'},
                {name:'Basdva', phone:'010-0000-0002'},
                {name:'Easdve', phone:'010-0000-0003'}
            ]
        }        
    }

    render(){
        return (
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i)=>{
                        return (
                            <ContactInfo name={contact.name}
                                        phone={contact.phone}
                                          key={i}/>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

class ContactInfo extends React.Component {
    render(){
        return (
            <li>{this.props.name} {this.props.phone}</li>
        )
    }
}

App.defaultProps = {
    headerTitle: 'Default header',
    contentTitle: 'Default contentTitle',
    contentBody: 'Default contentBody'
};

export default App;
