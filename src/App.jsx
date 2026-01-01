// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {

//   return (
//     <div>
//       <form>
//         <label>enter name<input type="text"/></label>
//           <button type="button">submit</button>
//         </form>
//     </div>
//   )
// }

// export default App
// In your form component
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('Saving... ✨');
    
    // Send to database!
    const { data, error } = await supabase
      .from('users')  // Your table name
      .insert([{ name: name }]);
    
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('✅ Saved to database!');
      setName(''); // Clear the input
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Save Your Name! 📝</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name here"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button 
          type="submit"
          style={{ padding: '10px 20px', marginLeft: '10px' }}
        >
          Save to Database 🚀
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
export default App