import React, { Component } from 'react';
import StaticFooter from './../../layout/footer';
import Newsletter from './../../layout/newsletter';

import postUser from './../../../../images/posted-user.png';
import postImage1 from './../../../../images/blog-images/image3.png';
import postImage2 from './../../../../images/blog-images/image4.png';
import postImage3 from './../../../../images/blog-images/image5.png';
import postImage4 from './../../../../images/blog-images/image6.png';
import postImage5 from './../../../../images/blog-images/image7.png';
import postImage6 from './../../../../images/blog-images/image8.png';
import postImage7 from './../../../../images/blog-images/image9.png';
import postImage8 from './../../../../images/blog-images/image10.png';
import postImage9 from './../../../../images/blog-images/image11.png';

class allPosts extends Component{
	render(){
		document.body.classList.add('blog');
		return(
			<div className="all-posts-holder">
				<div className="all-posts-header">
					<div className="holder">
						<h1>Popular Articles</h1>
					</div>
				</div>
				<div className="all-posts-body">
					<div className="holder">
						<article className="article">
							<div className="post-image-holder">
								<a href="">
									<img src={postImage1} alt="Post 1 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text orange-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage2} alt="Post 2 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text green-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage3} alt="Post 3 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text maroon-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage4} alt="Post 1 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text orange-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage5} alt="Post 2 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text dark-blue-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage6} alt="Post 3 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text green-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage7} alt="Post 1 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage8} alt="Post 2 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text orange-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
									<img src={postImage9} alt="Post 3 | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</a>
							</div>
							<div className="post-content">
								<a href="" className="post-type-text dark-blue-text">Data Science</a>
								<h3><a href="">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a></h3>
								<div className="posted-by-block">
									<div className="posted-image-holder">
										<a href="">
											<img src={postUser} alt="Posted | Wurker.ai - Connecting Top AI talent with Cool Companies" />
										</a>
									</div>
									<a href="" className="posted-author">Mian Asher</a>
									<span className="posted-date">on July 6, 2018</span>
								</div>
							</div>
						</article>
					</div>
				</div>
				<Newsletter />
				<StaticFooter />
			</div>
		);
	}
}

export default allPosts;