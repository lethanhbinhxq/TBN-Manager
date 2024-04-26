import React,{useState} from 'react';
import axios from 'axios';

const InputPage = () => {
  const[info, setInfo]=useState([]);
  
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'purple' }}>Information about your project</h1>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1, marginRight: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ marginBottom: '10px', fontSize: '20px' }}>Project's name</span>
            <input 
              type="text" 
              placeholder="Enter the project's name..." 
              style={{
                border: '2px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                width: '100%' 
              }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ marginBottom: '10px', fontSize: '20px' }}>Project description</span>
            <span style={{ marginBottom: '10px', fontSize: '15px', fontStyle: 'italic', color: 'red' }}>Note: please write the description only within a paragraph, no newline.</span> {/* Italicized text */}

            <input 
              type="text" 
              placeholder="Enter the project description..." 
              style={{
                border: '2px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                width: '100%' 
              }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ marginBottom: '10px', fontSize: '20px' }}>Start date</span>
            <input 
              type="text" 
              placeholder="Enter the day the project start..." 
              style={{
                border: '2px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                width: '100%' 
              }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ marginBottom: '10px', fontSize: '20px' }}>End date</span>
            <input 
              type="number" 
              placeholder="Enter the full duration of the project.." 
              style={{
                border: '2px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                width: '100%' 
              }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ marginBottom: '10px', fontSize: '20px' }}>Skills or technology requirements</span>
            <span style={{ marginBottom: '10px', fontSize: '15px', fontStyle: 'italic', color: 'red' }}>Note: Please enter one of these options: low, medium, high.</span> {/* Italicized text */}
            <input 
              type="text" 
              placeholder="Enter low or medium or high..." 
              style={{
                border: '2px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                width: '100%' 
              }} ></input>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ marginBottom: '10px', fontSize: '20px' }}>Customer Involvement</span>
            <span style={{ marginBottom: '10px', fontSize: '15px', fontStyle: 'italic', color: 'red' }}>Note: Does it need  interaction of customers or end-users in the development process? Please enter Yes or No only.</span> {/* Italicized text */}
            <input 
              type="text" 
              placeholder="Enter Yes or No..." 
              style={{
                border: '2px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                width: '100%' 
              }} ></input>
          </div>
        </div>
        
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button style={{ backgroundColor: 'purple', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '10px', fontSize: '25px' }}>Submit</button>
      </div>
    </div>
  );
};

export default InputPage;
