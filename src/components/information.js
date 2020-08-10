import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button, Image } from 'react-bootstrap';
import { Parallax, Background } from 'react-parallax';
class Information extends Component {
    render() {

        return (
            <React.Fragment>
                <div className="information">
                    <h2 className="new-title">Discover dating with this Dating App</h2>

                    <div className="carousel-container">
                        <Carousel >
                            <div>
                                <img src="https://images.news18.com/ibnlive/uploads/2019/10/young-couple.jpg" />
                                <p className="legend">Love has no borders</p>
                            </div>
                            <div>
                                <img src="https://www.dbs.com.sg/iwov-resources/media/images/articles/nav/Getting-down-to-insurance-as-married-couple-1404x630.jpg" />
                                <p className="legend">All you need is love</p>
                            </div>
                            <div>
                                <img src="https://www.mantelligence.com/wp-content/uploads/2017/11/would-you-rather-questions-for-couple-featured.jpg" />
                                <p className="legend">Love is the drug</p>
                            </div>

                            <div>
                                <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/06/02/16/facemask-kiss-shutterstock.jpg?w968" />
                                <p className="legend">True love is worth the wait</p>
                            </div>
                            <div>
                                <img src="https://www.catholicsingles.com/wp-content/uploads/2019/07/blog-header.png" />
                                <p className="legend">Love is about trust</p>
                            </div>
                        </Carousel>
                    </div>

                    <h2 className="text-center">Some tips maybe you want to know</h2>
                    <div className="row my-4 tips">
                        <div className="col-lg-3 col-md-12 paper">
                            <img src="https://dq1eylutsoz4u.cloudfront.net/2016/09/12143219/dating-vs-relationship-advice.jpg" className="img-fluid z-depth-2 rounded" alt="First sample image" />
                            <h5 className="bolder">What It Means To Be ‘Aromantic,’ According To Experts</h5>
                            <p>Aromantic is a term that’s typically used to describe someone who experiences little to no romantic attraction, according to volunteer-run initiative Aromantic-Spectrum Union for Recognition, Education, and Advocacy (AUREA), where Claire is now a team member. So, when a movie features someone with a crush or a book describes a character’s infatuation? “That’s not something I experience,” Claire explains.</p>
                            <Button variant="outline-info"><a href="https://www.womenshealthmag.com/relationships/a26116061/aromantic-definition-sexuality-meaning/">Read more</a></Button>
                        </div>

                        <div class="col-lg-3 col-md-6 paper">
                            <img src="https://www.cheatsheet.com/wp-content/uploads/2015/11/Couple-dating-and-flirting-in-a-restaurant.jpg" class="img-fluid z-depth-3 rounded" alt="First sample image" />
                            <h5 className="bolder">26 Couple Games For A Fun, Romantic Date Night</h5>
                            <p>
                                JSYK, not all couple games need to lead to sex, and there are plenty of romantic (and free!) games that can help bring you and your partner closer together or at least make for an interesting date night.
                        </p>
                            <Button variant="outline-info"><a href="womenshealthmag.com/sex-and-love/a32338336/romantic-couple-games/">Read more</a></Button>
                        </div>

                        <div class="col-lg-3 col-md-6 paper">
                            <img src="https://media.istockphoto.com/photos/romantic-couple-in-the-park-love-dating-romance-picture-id938709298?k=6&m=938709298&s=170667a&w=0&h=U2I9r_Na-vFltdrpbAaF5aS_nTyclYinWToecJW1Jc0=" class="img-fluid z-depth-4 rounded" alt="First sample image" />
                            <h5 className="bolder">What Does It Mean If My Boyfriend Likes Other Women’s Pictures On Instagram?</h5>
                            <p>
                                There’s no doubt that social media has changed the way we date. While it’s easier than ever to stay in touch with a new love interest, there’s a downside: It’s also easier for your love interest to stay in touch with everyone else. Fun! If your new bae is super active online, you might have wondered, is it bad if my boyfriend likes other women’s pictures on Instagram or Facebook?
                        </p>
                            <Button variant="outline-info"><a href="https://www.womenshealthmag.com/relationships/a19981586/what-your-partner-s-social-media-behaviors-say-about-your-relationship/">Read more</a></Button>
                        </div>
                    </div>
                </div>
                <Parallax

                    bgImage='https://www.familiesforlife.sg/discover-an-article/PublishingImages/HappyCouple_WalkingonBeach.jpg'
                    bgImageAlt="the cat"
                    strength={200}
                >
                    <div className="slogan">
                        <h2>FIND YOUR LOVE</h2>
                    </div>
                    
                    {/* <div style={{ height: '200px' }} /> */}
                </Parallax>
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage='https://www.photojaanic.sg/blog/wp-content/uploads/sites/3/2017/02/romance-1822585_1920_Small-1080x721.jpg'
                    bgImageAlt="the dog"
                    strength={200}
                >
                    <div className="slogan">
                        <h2>Find your someone</h2>
                    </div>
                    {/* <div style={{ height: '200px' }} /> */}
                </Parallax>
                <Parallax strength={300}>
                    <div className="the-end">
                        <h2>Enjoy your time with this app</h2>
                    </div>
                    <Background className="custom-bg">
                        <img src="https://www.family.org.sg/images/FOTFS_SiteTemplate/Blog/Marriage/blog_couple_retreat_an_essential.jpg" alt="fill murray" />
                    </Background>
                </Parallax>





            </React.Fragment>

        )
    }
}

export default Information;