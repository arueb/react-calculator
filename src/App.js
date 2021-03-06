import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
// import * as math from 'https://cdn.skypack.dev/mathjs@8.0.1';
import {evaluate} from 'mathjs';
// components
const Button = ({value, label, id, handleClick}) => (
    <button id={id} value={value} className="btn" onClick={handleClick}>{label}</button>
)

const FormulaDisplay = ({value}) => (
    <div id="formula">{value}</div>
)

const Logo = () => (
  
  <div id="logo"></div>
)

const OutputDisplay = ({value}) => (
  <div id="display">{value}</div>
)

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      formula: '',
      output: '0'
    }
    
    this.handleInput = this.handleInput.bind(this);
  }
  
  handleInput(e){
    const input = e.target.value;
    const {formula, output} = this.state;
    const formulaIsResolved = formula.includes("=");
    const endsInOperator = input => /(\-|\+|\*|\/){1}$/.test(input);
    const endsInDoubleOperator = input => /(\-|\+|\*|\/){2}$/.test(input);
    const isResolved = input => input.includes("=");
    const endsInMinus = input => /(\-){1}$/.test(input);
   
    const addMultiplyDivide = (formula, input, output) => {
         if (isResolved(formula)) {
          this.setState({output: input, formula: output+input})
        } else if (endsInDoubleOperator(formula) && endsInMinus(formula)) {
          this.setState({output: input, formula: formula.slice(0,-2) + input, });
        } else if (endsInOperator(formula)){
          this.setState({output: input, formula: formula.slice(0,-1) + input});
        } else {
          this.setState({output: input, formula: formula + input});
        }      
    }
    
    const subtract = (formula, input, output) => {
        if (isResolved(formula)) {
          this.setState({output: input, formula: output+input})
        } else if (!endsInDoubleOperator(formula)){
          this.setState({output: input, formula: formula + input});
        } 
    }
    
    switch(input){
      case "=":
        if (output==='0' && formula === '') break;
        const result = evaluate(formula.replace("--","+"));
        this.setState({output: result, formula: formula + input + result});
        break;
        
      case "clear":
        this.setState({formula: '', output: '0'});
        break;  
        
      case ".":
        if (output === '0'){
          this.setState({output: '0' + input, formula: '0' + input});
        } else if (!output.includes('.')) { // does not already have a decimal
          this.setState({formula: formula + input, output: output + input});
        }      
        break;
        
      case "-":
        subtract(formula, input, output); 
        break;  
        
      case "+": 
      case "*": 
      case "/":
        addMultiplyDivide(formula, input, output);  
        break;     
        
      case '0':
        if (isResolved(formula)){
          this.setState({output:input, formula: input});
        } else if (output != '0'){
          this.setState({output: output + input, formula: formula + input});
        }          
        break;
        
      default: // 1-9
        if (isResolved(formula)){
          this.setState({output:input, formula: input});
        } else if (output == '0' || endsInOperator(output)){
          this.setState({output: input, formula: formula + input});
        } else {
          this.setState({output: output + input, formula: formula + input});
        }         
    }
  }
  
  render(){
    return (
      <div class="outer-wrapper">
        <div class="container">
          <Logo />
          <FormulaDisplay value={this.state.formula}/>
          <OutputDisplay value={this.state.output}/>
          <Button value="clear" label="AC" id="clear" handleClick={this.handleInput}/>   
          <Button value="/" label="÷" id="divide" handleClick={this.handleInput}/>
          <Button value="*" label="x" id="multiply" handleClick={this.handleInput}/>     
          <Button value={7} label={7} id="seven"  handleClick={this.handleInput}/>
          <Button value={8} label={8} id="eight" handleClick={this.handleInput}/>
          <Button value={9} label={9} id="nine" handleClick={this.handleInput}/>   
          <Button value="-" label="-" id="subtract" handleClick={this.handleInput}/>      
 <Button value={4} label={4} id="four" handleClick={this.handleInput}/>
          <Button value={5} label={5} id="five" handleClick={this.handleInput}/>
          <Button value={6} label={6} id="six" handleClick={this.handleInput}/>
          <Button value="+" label="+" id="add" handleClick={this.handleInput}/>          
          <Button value={1} label={1} id="one" handleClick={this.handleInput}/>
          <Button value={2} label={2} id="two" handleClick={this.handleInput}/>
          <Button value={3} label={3} id="three" handleClick={this.handleInput}/>
          <Button value="=" label="=" id="equals" handleClick={this.handleInput}/>
          <Button value={0} label={0} id="zero" handleClick={this.handleInput}/>          
          <Button value="." label="." id="decimal" handleClick={this.handleInput}/>
        </div>
        <p>Created by Alex Rueb</p>
      </div>
      
    );
  }
}

export default App;
