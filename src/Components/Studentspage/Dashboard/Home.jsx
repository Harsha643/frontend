import React , { useState, useEffect } from 'react';
import Header from './Header';

const Home = ({ studentdata }) => {

console.log("Student Data in Home:", studentdata);
    // console.log("Home component loaded");
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        // Fetch gallery data from the server
        fetch('http://localhost:4000/admin/gallery')
            .then(response => response.json())
            .then(data => setGallery(data))
            .catch(error => console.error('Error fetching gallery:', error));
    }, []);
    console.log("Gallery data:", gallery);

    console.log("Gallery data:", gallery.image);
    return(
     
        <>

            <div className="home-container">
                
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div key={index} className="gallery-item">
                            <img src={item.image} alt={`Gallery item ${index + 1}`} width={"300px"} />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        
        </>

    )
}
export default Home;