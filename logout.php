<!DOCTYPE html>
<html>
<head>
	<?php 
		session_start();
		header("Location: http://cherrykosmetics.com");
		session_destroy();
	?>
	<link href="libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/public/style.css" rel="stylesheet">
	
	<script src = "libs/jquery-1.11.1.min.js"></script>
	<script src="libs/bootstrap/js/bootstrap.min.js"></script>
	<script src = "libs/modernizr.custom.64329.js"></script>
	<script>
	</script>
</head>
<body>
	<header id="formHeader" class="full-bleed">
		<div class="mid">
			
		</div>
	</header>
	<header id="pagelogo" class="full-bleed">
		<div class="mid horizontal">
			<div class="horizontal flex-start flexed">
				<img src="css/images/mlogo.png">
			</div>
			<div class="horizontal flex-end flexed">
				<section class="horizontal"	id="searchform">
					<input type="text" class="inp-group-input" placeholder="Enter Search Here">
					<button type="button" class="btn btn-sm btn-default inp-group-btn"><i class="fa fa-search"></i></button>
				</section>
			</div>
		</div>
	</header>
	<div id="dividerline" class="full-bleed"></div>
	<div id="divider" class="full-bleed"></div>
	<header id="navheader" class="full-bleed">
		<nav class="mid">
			<ul class="horizontal flex-center">
				<li><a href="index.html">HOME</a></li>
				<li><a href="#">BEST SELLER</a></li>
				<li>
					<a href="#" id="navProd">PRODUCTS</a>
					<nav id="navsubcat"class="horizontal">
						<ul id="subcat" class="vertical">
							
						</ul>
						<ul id="subsubcat" class="vertical">
							
						</ul>
					</nav>
				</li>
				<li><a href="#">BEAUTY WALL</a></li>
				<li><a href="#">SALE!</a></li>
				<li><a href="#">CHERRY COSMETICS</a></li>
			</ul>
		</nav>
	</header>
	<section id="mainContent" class="full-bleed vertical">
		
	</section>
	<footer class="full-bleed horizontal flex-start">
		<div class="mid horizontal-not-resp">
			<section class="vertical">
				<h5 class="pink-text">CUSTOMER CARE</h5>
				<p class="pink-text">CONTACT US</p>
				<p class="indent pink-text">TEL NO.: 888-888-888</p>
				<p class="indent pink-text">OPERATING HOURS</p>
				<p class="indent pink-text">3:00 AM TO 6:00 PM</p>
				<p class="indent pink-text">MONDAY TO FRIDAY</p>
			</section>
			<section class="vertical">
				<h5 class="pink-text">PAYMENT OPTIONS</h5>
				<div class="horizontal">
					<a href="#"><img src="css/images/mastercard.png"></a>
					<a href="#"><img src="css/images/visa.png"></a>
				</div>
			</section>
			<section class="vertical">
				<h5 class="pink-text">INFORMATION</h5>
				<a href="#" class="indent pink-text">ABOUT US</a>
				<a href="#" class="indent pink-text">FAQ</a>
				<a href="#" class="indent pink-text">DELIVERY</a>
				<a href="#" class="indent pink-text">PRIVACY POLICY</a>
				<a href="#" class="indent pink-text">TERMS & CONDITIONS</a>
			</section>
		</div>
	</footer>
<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header ribbon-header red-back white margined">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</h4>
			</div>
			<div id="loginForm" class="modal-body horizontal">
				<article class="vertical flexed">
					<input type="text" placeholder="Username">
					<input type="password" placeholder="Password">
					<button id="btlogin" type="button" onclick="" class="btn btn-sm btn-danger"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</button>
					<div id="logerror" class="alert alert-danger" role="alert">
						<div class="horizontal-not-resp flex-center">
						<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
						<span class="sr-only">Error:</span>
						<p id="errlog">Invalid username or password</p>
						</div>
					</div>
				</article>
				<article class="vertical flexed">
					<p class="horizontal-not-resp"><button type = "button" onclick="fbConnect()" id="btnlogfb" class="btn btn-default btn-social">
						<i class="fa fa-facebook-square soc-ic" id="fblogo"></i>&nbsp;Sign in with Facebook</button>
					</p>
					<p class="horizontal-not-resp"><button type = "button" id="btnlogtwit" class="btn btn-default btn-social">
						<i class="fa fa-twitter-square soc-ic" onclick="twitterRequest()" id="twitterlogo"></i>&nbsp;Sign in with Twitter</button>
					</p>
					
				</article>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>