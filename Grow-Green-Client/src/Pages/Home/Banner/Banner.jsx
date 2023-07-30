import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img1 from '../../../assets/home/Banner/img1.avif';
import img2 from '../../../assets/home/Banner/img2.avif';
import img3 from '../../../assets/home/Banner/img3.avif';
import img4 from '../../../assets/home/Banner/img4.avif';
import img5 from '../../../assets/home/Banner/img5.avif';
import img6 from '../../../assets/home/Banner/img6.avif';
import img7 from '../../../assets/home/Banner/img7.avif';
import img8 from '../../../assets/home/Banner/img8.avif';
import img9 from '../../../assets/home/Banner/img9.avif';
import img10 from '../../../assets/home/Banner/img10.avif';
import img11 from '../../../assets/home/Banner/img11.jpg';

const Banner = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

    const carouselStyle = {
        width: '100%',
        height: 'auto',
        maxWidth: '600px',
        margin: '0 auto',
    };

    return (
        <div>

            {/* <div className="w-600 h-300 mx-auto">
                <Carousel showThumbs={false}>
                    {images.map((image, index) => (
                        <div key={index} className="square-container">
                            <div className="square-content">
                                <img src={image} alt={`Slide ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div> */}

            <div
                className="w-600 h-300 mx-auto"
                // style={carouselStyle}
            >
                <Carousel showThumbs={false}>
                    {images.map((image, index) => (
                        <div key={index} className="square-container">
                            <div className="banner-content">
                                <img src={image} alt={`Slide ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

        </div>

    );
};

export default Banner;

