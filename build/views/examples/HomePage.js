import React from "react";
// import "../../main.97292821.css";


class HomePage extends React.Component {
    render() {
        return(
            <>
            <header>
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>

      <div className="navbar-collapse">
        <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <ul className="nav navbar-nav navbar-right">
            <li><a href="./index.html#contact-section-container" title="" className="anchor-link">Contact Us</a></li>
            <li>
                <p>
                    <a href="./components.html" className="btn btn-default navbar-btn" >Components</a>
                </p>
            </li>


        </ul>

      </div>
    </div>
  </nav>
</header>



{/* <!-- Add your site or app content here --> */}
<div className="background-image-container white-text-container" style={{"backgroundImage": "url('./assets/images/img-05.jpg')"}}>
    <div className="overlay"></div>
    <div className="container">
        <div className="row">
            <div className="col-xs-12">
                <h1>The Factory</h1>
                <p className="">THE BEST PLACE FOR WORK TOGETHER</p>
                <a href="#contact-section-container" className="btn btn-primary btn-lg anchor-link" title="">Get in touch</a>
            </div>
        </div>
    </div>
</div>

<div className="section-container">
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-12 section-container-spacer">
                <h2 className="text-center">Vivamus laoreet</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-md-4">
                <div className="fa-container">
                    <i className="fa fa-comment-o fa-3x" aria-hidden="true"></i>
                </div>
                <h3 className="text-center">Consectetur</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident.</p>
            </div>

            <div className="col-xs-12 col-md-4">
                <div className="fa-container">
                    <i className="fa fa-heart-o fa-3x" aria-hidden="true"></i>
                </div>
                <h3 className="text-center">Malesuada</h3>
                <p>Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</p>
            </div>
            <div className="col-xs-12 col-md-4">
                <div className="fa-container">
                    <i className="fa fa-bell-o fa-3x" aria-hidden="true"></i>
                </div>
                <h3 className="text-center">Phasellus</h3>
                <p> Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</p>
            </div>
        </div>
    </div>
</div>

<div className="section-container section-half-background-image-container">
    <div className="image-column" style={{"backgroundImage": "url('./assets/images/img-01.jpg')"}}></div>
    <div className="container">
        <div className="row">
            <div className="section-label reveal">
                <p>Coworking</p>
            </div>
            <div className="col-md-6 col-md-offset-6 text-column">
                <h2>Dui augue orci</h2>
                <h3>Lorem ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor. Phasellus ut
                    lacus tellus. In pretium lobortis blandit. Nam eu laoreet velit. Vivamus laoreet, sem nec scelerisque
                    elementum, dui augue aliquet urna, ut bibendum purus erat ut massa. Mauris diam orci, feugiat a turpis
                    et, congue accumsan risus. Nulla malesuada leo sodales, auctor augue quis, condimentum lacus. Phasellus
                    sed sollicitudin quam, a bibendum urna.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor. Phasellus «
                    ut lacus » tellus. In pretium lobortis blandit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor. Phasellus ut
                    lacus tellus. In pretium lobortis blandit.</p>

            </div>
        </div>
    </div>
</div>



<div className="section-container">
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-12 section-container-spacer">
                <h2 className="text-center">Consectetur adipiscing</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-md-4">
                <img src="./assets/images/img-02.jpg" alt="" className="img-responsive"/>
                <h3 className="text-center">Consectetur</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor. Phasellus ut
                    lacus tellus. In pretium lobortis blandit.</p>
            </div>

            <div className="col-xs-12 col-md-4">
                <img src="./assets/images/img-03.jpg" alt="" className="img-responsive"/>
                <h3 className="text-center">Malesuada</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor. Phasellus ut
                    lacus tellus. In pretium lobortis blandit.</p>
            </div>
            <div className="col-xs-12 col-md-4">
                <img src="./assets/images/img-04.jpg" alt="" className="img-responsive"/>
                <h3 className="text-center">Phasellus</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor. Phasellus ut
                    lacus tellus. In pretium lobortis blandit.</p>
            </div>
        </div>
    </div>
</div>

<div className="">
    <div className='container-fluid'>
        <div className="row map-container">
            <div id="map"></div>
            <div className="col-xs-10 col-md-4 contact-block-container reveal">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <h3>Phone</h3>
                        <p>+ 123 45 67 890</p>

                        <h3>E-mail</h3>
                        <p>hello@email.com</p>

                    </div>

                    <div className="col-xs-12 col-sm-6">
                        <h3>Address</h3>
                        <p>42 rue rouelle 75015, Paris</p>

                        <h3>Open hours</h3>
                        <p>Mon - Fri : 9AM - 5PM</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div className="section-container" id="contact-section-container">
    <div className="container contact-form-container">
        <div className="row">
            <div className="col-xs-12 col-md-offset-2 col-md-8">
                <div className="section-container-spacer">
                    <h2 className="text-center">Get in touch</h2>
                </div>
                <form action="">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" name="name" className="form-control" placeholder="Name"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="email" name="email" className="form-control" placeholder="Email"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <textarea className="form-control" rows="3" placeholder="Enter your message"></textarea>
                    </div>

                    <div className="form-group">
                        <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox1" value="option1"/>Email me a copy
                        </label>
                        <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox2" value="option2"/>I am a human
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Send message</button>
                    <a href="" className="btn btn-default">Reset</a>
                </form>
            </div>
        </div>
    </div>
</div>


<script>
{/* document.addEventListener("DOMContentLoaded", function (event) {
    
  googleMapInit(); 
  scrollToAnchor();
  scrollRevelation('reveal');
}); */}
</script>

<footer className="footer-container white-text-container">
    <div className="container">
        <div className="row">
                <div className="col-md-4">
                    <h4>About us</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet consectetur dolor</p>
                </div>

                <div className="col-md-4">
                    <h4>Do you like ? Share this !</h4>
                    <div>
                        <p>
                            <a href="https://www.twitter.com" className="fa-icon" title="">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                            <a href="https://www.facebook.com" className="fa-icon" title="">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.linkedin.com" className="fa-icon" title="">
                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                        </p>
                    </div>
                    <div>
                        <p><small>© Untitled | Website created with <a href="http://www.mashup-template.com/" title="Create website with free html template">Mashup Template</a>/<a href="https://www.unsplash.com/" title="Beautiful Free Images">Unsplash</a></small></p>
                    </div>

                </div>

                <div className="col-md-4">
                        
                    <h4>Subscribe to newsletter</h4>
                    
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control footer-input-text"/>
                            <div className="input-group-btn">
                                <button type="button" className="btn btn-default btn-newsletter ">OK</button>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
        </div>
    </div>
</footer>
            
            
            </>
        )
    }
}

export default HomePage;