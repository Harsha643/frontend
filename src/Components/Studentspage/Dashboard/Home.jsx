import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../DashboardStyles/Home.css'

const Home = () => {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        async function fetching() {
            try {
                const response = await fetch("http://localhost:4000/admin/gallery");
                const data = await response.json();
                setGallery(data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        }
        fetching();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };

    return (
        <div className="home-container">
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Gallery</h1>
            <div className="gallery-carousel">
                <Slider {...settings}>
                    {gallery.map((item, index) => (
                        <div key={index} className="gallery-item">
                            <img
                                src={item.image}
                                alt={`Gallery item ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
                            />
                            <p style={{ textAlign: 'center' }}>{item.description}</p>
                        </div>
                    ))}
                </Slider>
                <p>add another items</p>
            </div>
        </div>
    );
};

export default Home;
