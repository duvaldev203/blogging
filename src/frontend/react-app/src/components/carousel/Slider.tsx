import Slider from "react-slick";

const SliderArticles = () => {
    const settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className=' mx-0 flex border'>
            <div className="flex border-2 border-red-600 w-auto p-0 h-96">
            <Slider {...settings}>
        {data.map((item:any) => (
          <div className="card m-0">
            <div className="card-top">
              <img src={item.img}/>
              <h1>{item.name}</h1>
            </div>
            <div className="card-bottom">
              <h3>{item.review}</h3>
              <span className="category">{item.category}</span>
            </div>
          </div>
        ))}
      </Slider>
            </div>

        </div>
    );
}

const data = [
    {
        name: `John Morgan`,
        img: `/images/hero-image-01.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
        name: `John Morgan`,
        img: `/images/hero-image-01.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
        name: `Ellie Anderson`,
        img: `/images/hero-image-01.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
        name: `Nia Adebayo`,
        img: `/images/hero-image-01.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
        name: `Rigo Louie`,
        img: `/images/hero-image-01.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
        name: `Mia Williams`,
        img: `/images/hero-image-01.jpg`,
        review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },

];

export default SliderArticles;
