import React from 'react';
import './about.scss';
import movies from '../../shared/images/movies.png';

 
function About() {
    return (
        <div className='about'>
            <h2>About Us</h2>

            
            <p>Visit our store</p>
            <div><img src={movies} alt="movies on a shelf"></img></div>
            
            
        </div>
        
    );
}
 
export default About;