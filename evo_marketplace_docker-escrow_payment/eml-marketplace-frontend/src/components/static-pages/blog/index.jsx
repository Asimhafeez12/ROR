import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import StaticFooter from './../layout/footer';
import Newsletter from './../layout/newsletter';

import postUser from './../../../images/posted-user.png';
import postTopImage from './../../../images/blog-images/image1.png';
import postImage1 from './../../../images/blog-images/image3.png';
import postImage2 from './../../../images/blog-images/image4.png';
import postImage3 from './../../../images/blog-images/image5.png';
import postImage4 from './../../../images/blog-images/image6.png';
import postImage5 from './../../../images/blog-images/image7.png';
import postImage6 from './../../../images/blog-images/image8.png';
import postImage7 from './../../../images/blog-images/image9.png';
import postImage8 from './../../../images/blog-images/image10.png';
import postImage9 from './../../../images/blog-images/image11.png';

class Blog extends Component{
	render(){
		document.body.classList.add('blog');
		return(
			<div className="blog-holder">
				<div className="blog-header">
					<div className="blog-header-table">
						<div className="blog-header-cell">
							<div className="holder">
								<div className="blog-header-left">
									<h1>The Evo Report</h1>
									<p>Latest news & articles on AI</p>
								</div>
								<div className="blog-header-right">
									<div className="newsletter-content">
										<h3>Subscribe to</h3>
										<h4>Weekly Newsletter</h4>
									</div>
									<Form className="header-newsletter-form" onSubmit={this.handleSubmit}>
										<Input className="email-field" size="large" type="email" placeholder="Enter Email address" />
										<Button className="email-button" size="large" htmlType="submit">Subscribe</Button>
									</Form>	
								</div>
							</div>					
						</div>
					</div>
				</div>
				<div className="blog-body">
					<section className="blog-section1">
						<div className="holder">
							<nav className="post-link">
								<ul>
									<li className="active"><a href="">All</a></li>
									<li><a href="">Data Science</a></li>
									<li><a href="">Web and Data Analysis</a></li>
									<li><a href="">Al & Ml</a></li>
									<li><a href="">Chatbots</a></li>
									<li><a href="">Robotics</a></li>
								</ul>
							</nav>
							<article className="top-article">
								<div className="post-image-holder">
									<a href="">
										<img src={postTopImage} alt="Top Post" />
									</a>
								</div>
								<div className="post-content">
									<a href="" className="post-type-text orange-text">Data Science</a>
									<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									<div className="posted-by-block">
										<div className="posted-image-holder">
											<a href="">
												<img src={postUser} alt="Posted User" />
											</a>
										</div>
										<a href="" className="posted-author">Mian Asher</a>
										<span className="posted-date">on July 6, 2018</span>
									</div>
								</div>
							</article>
						</div>
					</section>

					<section className="blog-section2">
						<div className="holder">
							<article className="article">
								<div className="post-image-holder">
									<a href="">
										<img src={postImage1} alt="Post 1" />
									</a>
								</div>
								<div className="post-content">
									<a href="" className="post-type-text">Data Science</a>
									<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
									<div className="posted-by-block">
										<div className="posted-image-holder">
											<a href="">
												<img src={postUser} alt="Posted User" />
											</a>
										</div>
										<a href="" className="posted-author">Mian Asher</a>
										<span className="posted-date">on July 6, 2018</span>
									</div>
								</div>
							</article>
							<article className="article">
								<div className="post-image-holder">
									<a href="">
										<img src={postImage2} alt="Post 2" />
									</a>
								</div>
								<div className="post-content">
									<a href="" className="post-type-text">Data Science</a>
									<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
									<div className="posted-by-block">
										<div className="posted-image-holder">
											<a href="">
												<img src={postUser} alt="Posted User" />
											</a>
										</div>
										<a href="" className="posted-author">Mian Asher</a>
										<span className="posted-date">on July 6, 2018</span>
									</div>
								</div>
							</article>
							<article className="article">
								<div className="post-image-holder">
									<a href="">
										<img src={postImage3} alt="Post 3" />
									</a>
								</div>
								<div className="post-content">
									<a href="" className="post-type-text">Data Science</a>
									<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
									<div className="posted-by-block">
										<div className="posted-image-holder">
											<a href="">
												<img src={postUser} alt="Posted User" />
											</a>
										</div>
										<a href="" className="posted-author">Mian Asher</a>
										<span className="posted-date">on July 6, 2018</span>
									</div>
								</div>
							</article>
						</div>
					</section>

					<section className="blog-section3">
						<div className="holder">
							<div className="blog-columns">
								<div className="article-heading">
									<h2>Popular Articles</h2>
									<a className="see-all-link" href="./blog/all-posts">See All</a>
								</div>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage4} alt="Post 4" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text green-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage5} alt="Post 5" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text maroon-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage6} alt="Post 6" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text dark-blue-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage7} alt="Post 7" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text darkest-blue-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
							</div>

							<div className="blog-columns">
								<div className="article-heading">
									<h2>Latest Articles</h2>
									<a className="see-all-link" href="./blog/all-posts">See All</a>
								</div>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage8} alt="Post 8" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text orange-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage9} alt="Post 9" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text green-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage6} alt="Post 6" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text maroon-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
								<article className="top-article">
									<div className="post-image-holder">
										<a href="">
											<img src={postImage7} alt="Post 7" />
										</a>
									</div>
									<div className="post-content">
										<a href="" className="post-type-text darkest-blue-text">Data Science</a>
										<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
										<div className="posted-by-block">
											<div className="posted-image-holder">
												<a href="">
													<img src={postUser} alt="Posted User" />
												</a>
											</div>
											<a href="" className="posted-author">Mian Asher</a>
											<span className="posted-date">on July 6, 2018</span>
										</div>
									</div>
								</article>
							</div>
						</div>
					</section>
				</div>
				<Newsletter />
				<StaticFooter />
			</div>
		);
	}
}

export default Blog;