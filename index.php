<!DOCTYPE html>
<html>
<head>
	<?php 
		session_start();
		$isLogged = "false";
		if(array_key_exists("login",$_SESSION)){
			$isLogged = "true";
			
		}
	?>
	<meta charset = "utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link href="libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/public/style.css" rel="stylesheet">
	
	<script src = "libs/jquery-1.11.1.min.js"></script>
	<script src="libs/bootstrap/js/bootstrap.min.js"></script>
	<script src = "libs/modernizr.custom.64329.js"></script>
	<script src = "libs/jclib.js"></script>
	<script src = "libs/functions.js"></script>
	<script src = "libs/sp.js"></script>
	<script>
		$(document).ready(loader);
		function loader(){
			animateCarousel(5000);
			initDB();
			hoverEffect();
			bindNavHover();
			var masterCat = ["MCategoryId","Name"];
			getRequest(null,0,CAT_URL,"#subcat","BEMCategory",masterCat);
			//var params = "req=" + JSON.stringify({ "ProductId": 1 });//JSON.stringify({ "CategoryId": 1, "PageNumber":1, "PageSize":20 });
			//getRequest(params,2,PROD_BY_ID_URL,"#subcat","dcProductresp","ProductId");
			var isLogged=<?php echo $isLogged ?>;
			refreshCart(isLogged);
			console.log("isLogged: "+isLogged);
		}
	</script>
</head>
<body onload="wait()">
<div id="loader" class="horizontal align flex-center">
	<div id="loaderHolder" class="vertical align-self-center">
		<img class="align-self-center" id="loadinglogo" src="css/images/logo.jpg">
		<img class="align-self-center" src="css/images/loadingall.gif">
	</div>
</div>
<div class="sparkley"></div>
	<header id="formHeader" class="full-bleed">
		<div class="mid">
			<section class="horizontal flex-end">
				<?php
					if($isLogged=="false"){
						$url = "register.php";
						echo '<button type="button" data-toggle="modal" data-target="#loginModal" class="btn btn-sm btn-default"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</button>
							<button onclick="location.replace(\''.$url.'\')" type="button" class="btn btn-sm btn-danger"><i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Sign Up (Free)</button>
							<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#cartModal" type="button">
							<i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;CART<span id="cartcount" class="badge"></span>
							</button>';
					}else{
						$first_name = $_SESSION['login'];
						$guname = $_SESSION['uname'];
						$url = "logout.php";
						echo '<button class="btn btn-primary btn-sm btn-form-header" data-toggle="modal" data-target="#cartModal" type="button">
						<i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;CART<span id="cartcount" class="badge"></span></button>
						<button onclick="location.replace(\''.$url.'\')" type="button" class="btn btn-sm btn-danger btn-form-header"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</button>
						<div class="horizontal-not-resp margined-sm flex-space-around"><p>Welcome</p>&nbsp;<p class="red-text" id="credsholder" data-uname="'.$guname.'">'.$first_name.'</p></div>';
					}
				?>
				<span id="lang">English&nbsp;&nbsp;|&nbsp;&nbsp;<i class="fa fa-flag"></i>&nbsp;PHP</span>
			</section>
		</div>
	</header>
	<header id="pagelogo" class="full-bleed">
		<div class="mid horizontal">
			<div class="horizontal flex-start flexed">
				<img id="mainlogo" src="css/images/logo.jpg">
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
				<li><a href="index.php">HOME</a></li>
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
	<header id="mainbanner" class="full-bleed">
		<div class="full-bleed" id="bannerholder">
			<div class="mid">
				<div class="banner-full-bleed horizontal-not-resp">
					<div class="carousel-img"><img src="css/images/homebanner/anjo high shine lipstick.jpg"></div>
					<div class="carousel-img"><img src="css/images/homebanner/draw auto eyebrow - Copy.jpg"></div>
					<div class="carousel-img"><img src="css/images/homebanner/silky natural fit bb cream.jpg"></div>
					<div class="carousel-img"><img src="css/images/homebanner/snail uv sun block.jpg"></div>
					<div class="carousel-img"><img src="css/images/homebanner/whitening activated cream.jpg"></div>
					<div class="carousel-img"><img src="css/images/homebanner/anjo high shine lipstick.jpg"></div>
				</div>
			</div>
		</div>
	</header>
	<section id="mainContent" class="full-bleed vertical">
		<article class="mid">
			<div class="vertical white-back web-section shadowed">
				<div class="horizontal flex-center flex-space-around dashed-panel">
					<a href="#" class="b-images white-back vertical">
						<h4 class="b-img-title">NEW</h4>
						<div class="red-frame">
							<img src="css/images/new.png">
						</div>
						<h4 class="toggled margined padded"></h4>
					</a>
					<a href="#" class="b-images white-back vertical">
						<h4 class="b-img-title">FEATURED</h4>
						<div class="red-frame">
							<img src="css/images/featured.png">
						</div>
						<h4 class="toggled margined padded"></h4>
					</a>
					<a href="#" class="b-images white-back vertical">
						<h4 class="b-img-title">BEST</h4>
						<div class="red-frame">
							<img src="css/images/best.png">
						</div>
						<h4 class="toggled margined padded"></h4>
					</a>
				</div>
				<h4 class="ribbon-header red-back white"><div class="padded">STOP AND SHOP</div></h4>
				<div id="b-nav" class="horizontal flex-center dashed-panel">
					<a href="#" class="b-img-title"><h4>MAKEUP</h4></a>
					<a href="#" class="b-img-title"><h4>SKIN CARE</h4></a>
					<a href="#" class="b-img-title"><h4>BATH & BODY</h4></a>
					<a href="#" class="b-img-title"><h4>HAIR CARE</h4></a>
					<a href="#" class="b-img-title"><h4>NAILS</h4></a>
				</div>
			</div>
			<div class="vertical white-back web-section shadowed">
				<h4 class="ribbon-header white pink-back margined"><div class="dashed">BEAUTY WALL</div></h4>
				<div id="b-nav" class="horizontal flex-center margined">
					<a href="#"><img class="social-img" src="css/images/img1.png"></a>
					<a href="#"><img class="social-img" src="css/images/img2.png"></a>
					<a href="#"><img class="social-img" src="css/images/img3.png"></a>
					<a href="#"><img class="social-img" src="css/images/img4.png"></a>
				</div>
				<div id="b-nav" class="horizontal-not-resp flex-center">
					<a href="#" class="social-links" class="vertical"><img src="css/images/youtube.png"><p>watch tutorials</p></a>
					<a href="#" class="social-links" class="vertical"><img src="css/images/facebook.png"><p>like us</p></a>
					<a href="#" class="social-links" class="vertical"><img src="css/images/instagram.png"><p>follow us</p></a>
					<a href="#" class="social-links" class="vertical"><img src="css/images/twitter.png"><p>#listickplease</p></a>
				</div>
			</div>
			<div class="horizontal white-back web-section flex-center shadowed align-content-center">
				<h4 class="ribbon-left ribbon-left-offset ribbon-sm white pink-back padded align-self-center">
					<div class="dashed full-height align-self-center">
						<p>F&nbsp;&nbsp;E&nbsp;&nbsp;A&nbsp;&nbsp;T&nbsp;&nbsp;U&nbsp;&nbsp;R&nbsp;&nbsp;E&nbsp;&nbsp;D</p>
						<p>B&nbsp;&nbsp;R&nbsp;&nbsp;A&nbsp;&nbsp;N&nbsp;&nbsp;D&nbsp;&nbsp;S</p>
					</div>
				</h4>
				<a class="feat-links align-self-center" href="#"><img src="css/images/wellmade.png"></a>
				<a class="feat-links align-self-center" href="#"><img src="css/images/touch.png"></a>
				<a class="feat-links align-self-center" href="#"><img src="css/images/shara.png"></a>
			</div>
		</article>
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
					<input type="text" id="uname" placeholder="Username">
					<input type="password" id="pass" placeholder="Password">
					<button id="btlogin" type="button" onclick="logDefault()" class="btn btn-sm btn-danger"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</button>
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
					<!--<p class="horizontal-not-resp"><button type = "button" id="btnlogtwit" class="btn btn-default btn-social">
						<i class="fa fa-twitter-square soc-ic" onclick="twitterRequest()" id="twitterlogo"></i>&nbsp;Sign in with Twitter</button>
					</p>!-->
					
				</article>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div id="theCart" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header ribbon-header red-back white margined">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel"><i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;Cart</h4>
			</div>
			<div id="cartForm" class="modal-body horizontal">
				<div class="panel panel-default">
					<div class="panel-heading" id="cartcountheader"></div>
					<table id="cartTable" class="table">
					</table>
					<div class="panel-heading horizontal flex-end" id="totalpurch"></div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" id="btncheckout" class="btn btn-info btn-primary btn-lg"><i class="fa fa-credit-card"></i>&nbsp;&nbsp;PROCEED TO CHECKOUT</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>