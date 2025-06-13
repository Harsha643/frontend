import React,{ useState, useEffect } from 'react';

const Home=()=>{
    const [gallery, setGallery] = useState([]);
    async function fetching() {
        const response = await fetch("http://localhost:4000/admin/gallery");
        const data = await response.json();
        setGallery(data);
    }
    useEffect(()=>{
        fetching();

    },[])

    return(
        <div className="home-container">
            <h1>Welcome to the Home Page</h1>
            <div className="gallery">
                {gallery.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img src={item.image} alt={`Gallery item ${index + 1}`} width={"300px"} />
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}