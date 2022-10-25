import React, { Component } from 'react';
import StaticFooter from './../../layout/footer';
import postUser from './../../../../images/posted-user.png';
import postImage1 from './../../../../images/blog-images/image3.png';
import postImage2 from './../../../../images/blog-images/image4.png';
import postImage3 from './../../../../images/blog-images/image5.png';


class singlePost extends Component{
	render(){
		document.body.classList.add('single-post');
		return(
			<div className="all-posts-holder">
				<div className="all-posts-header">
					<div className="holder">
						<h1>Single Article</h1>
					</div>
				</div>
				<div className="all-posts-body">
					<div className="holder">
						<article className="article">
							<div className="post-image-holder">
								<a href="">
									<img src={postImage1} alt="Post 1" />
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
						<article className="article">
							<div className="post-image-holder">
								<a href="">
									<img src={postImage2} alt="Post 2" />
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
						<article className="article">
							<div className="post-image-holder">
								<a href="">
									<img src={postImage3} alt="Post 3" />
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
					</div>
				</div>
				<StaticFooter />
			</div>
		);
	}
}

export default singlePost;