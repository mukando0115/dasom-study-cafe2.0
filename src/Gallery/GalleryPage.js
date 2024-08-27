import { CCarousel, CCarouselItem, CImage } from '@coreui/bootstrap-react'
import img1 from './1인실(Common)_1.png';
import img2 from './1인실(Common)_2.png';
import img3 from './1인실(Common)_3.png';
import img4 from './1인실(Common)_4.png';

function GalleryPage() {
    return (
        <main className="gallery-page">
            <p className="sub-title">Gallery</p>
            <h1 className="main-title">갤러리</h1>

            <h1 style={{textAlign: 'left'}}>1인실</h1>
            <h1 style={{textAlign: 'left'}}>Common Sit</h1>
                <CCarousel controls transition="crossfade">
                    <CCarouselItem>
                        <CImage className="d-block w-100" src={img1} alt="slide 1" />
                    </CCarouselItem>
                    <CCarouselItem>
                        <CImage className="d-block w-100" src={img2} alt="slide 2" />
                    </CCarouselItem>
                    <CCarouselItem>
                        <CImage className="d-block w-100" src={img3} alt="slide 3" />
                    </CCarouselItem>
                    <CCarouselItem>
                        <CImage className="d-block w-100" src={img4} alt="slide 4" />
                    </CCarouselItem>
                </CCarousel>            
        </main>
    )
}

export default GalleryPage;