import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';
import update from 'react-addons-update'

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
            ],
            selectedKey: -1,
            selected: {
                name: "",
                phone: ""
            }
        }        
    }

    _editContact(name, phone){
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            ),
            selected: {
                name: name,
                phone: phone
            }
        });
    }
    
    _onSelect(key){
        if(key==this.state.selectedKey){
            console.log("key select cancelled");
            this.setState({
                selectedKey: -1,
                selected: {
                    name: "",
                    phone: ""
                }
            });
            return;
        }

        this.setState({
            selectedKey: key,
            selected: this.state.contactData[key]
        });
        console.log(key + " is selected");
    }

    _isSelected(key){
        if(this.state.selectedKey == key){
            return true;
        }else{
            return false;
        }
    }

    _insertContact(name, phone){
        let newState = update(this.state, {
            contactData: {
                $push: [{"name": name, "phone": phone}]
            }
        });
        this.setState(newState);
    }

    _removeContact(){
        if(this.state.selectedKey==-1){
            console.log("contact not selected");
            return;
        }

        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    $splice: [[this.state.selectedKey, 1]]
                }
            ),
            selectedKey: -1
        });
    }

    _editContact(name, phone){

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
                                         key={i}
                                         contactKey={i}
                                         isSelected={this._isSelected.bind(this)(i)}
                                         onSelect={this._onSelect.bind(this)}/>
                        );
                    })}
                </ul>
                <ContactCreator onInsert={this._insertContact.bind(this)}/>
                <ContactRemover onRemove={this._removeContact.bind(this)}/>
                <ContactEditor onEdit={this._editContact.bind(this)}
                           isSelected={(this.state.selectedKey !=-1)}
                              contact={this.state.selected}/>
            </div>
        );
    }
}

class ContactCreator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            phone: ""
        }
    }
    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }
    handleClick(){
        this.props.onInsert(this.state.name, this.state.phone);
        this.setState({
            name: "",
            phone: ""
        })
    }
    render() {
        return (
            <div>
                <p>
                    <input type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}/>
                    <input type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange.bind(this)}/>
                    
                    <button onClick={this.handleClick.bind(this)}>Insert</button>
                </p>
            </div>
        );
    }
}

class ContactInfo extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState){
    	return (JSON.stringify(nextProps) != JSON.stringify(this.props));	
    } 
    
    handleClick(){
        this.props.onSelect(this.props.contactKey);
    }

    render() {
        console.log("rendered: " + this.props.name);
        let getStyle = isSelect => {
            if(!isSelect) return;

            let style = {
                fontWeight: 'bold',
                backgroundColor: '#4efcd8'
            };

            return style;
        };

        return(
            <li
                style={getStyle(this.props.isSelected)}
                onClick={this.handleClick.bind(this)}>
                {this.props.name} {this.props.phone}
            </li>
        );
    }
}

class ContactRemover extends React.Component {
    handleClick() {
        this.props.onRemove();
    }

    render() {
        return (
            <button onClick={this.handleClick.bind(this)}>
                Remove selected contact
            </button>
        );
    }
}

class ContactEditor extends React.Component {
    constructor(props) {
        super(props);
        // Configure default state
        this.state = {
            name: "",
            phone: ""
        };
    }

    handleClick(){
        if(!this.props.isSelected){
            console.log("contact not selected");

            return;
        }

        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.contact.name,
            phone: nextProps.contact.phone
        });
    }

    render() {
        return (
            <div>
                <p>
                    <input type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}/>

                    <input type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleClick.bind(this)}>
                    Edit
                    </button>
                </p>
            </div>
        );
    }
}

App.defaultProps = {
    headerTitle: 'Default header',
    contentTitle: 'Default contentTitle',
    contentBody: 'Default contentBody'
};

export default App;
