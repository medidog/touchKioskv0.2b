		var ctx;
		var cwidth ;
		var cheight ;
		var ballrad = 50;
		var ballx = 80; 
		var bally = 80; 
		var maskrad;
		var ballvx = 2;
		var ballvy = 4;
		var v;
		function restart() {
			v.currentTime=0;
			v.play();
		}
		function init(){
			canvas1 = document.getElementById('canvas');
			ctx = canvas1.getContext('2d');
			canvas1.width = window.innerWidth;
			cwidth = canvas1.width;
			canvas1.height = window.innerHeight;
			cheight = canvas1.height;
			window.onscroll = function () {
				window.scrollTo(0,0);
			};
			v = document.getElementById("vid");
			v.addEventListener("ended",restart,false);
			v.width = Math.min(v.videoWidth/1.5,.5*cwidth);
			v.height = Math.min(v.videoHeight/1.5,.5*cheight);
			videow = v.width;
			videoh = v.height;
			ballrad = Math.min(50,.5*videow,.5*videoh);
			maskrad = 4*Math.min(videow,videoh);
			ctx.lineWidth = ballrad;
			ctx.strokeStyle ="rgb(0,0,0)";

			v.style.left = String(ballx)+"px";
			v.style.top = String(bally)+"px";
			v.play();
			v.style.display = "block"; 
			setInterval(drawscene,50);
		}
		function drawscene(){
			ctx.clearRect(0,0,cwidth,cheight);
			moveandcheck();
			v.style.left = String(ballx)+"px"; 
			v.style.top = String(bally)+"px"; 
			ctx.beginPath();
			ctx.moveTo(ballx,bally);
			ctx.lineTo(ballx+videow,bally);
			ctx.lineTo(ballx+videow,bally+.5*videoh);
			ctx.lineTo(ballx+.5*videow+maskrad, bally+.5*videoh);
			ctx.arc(ballx+.5*videow,bally+.5*videoh,maskrad,0,
			Math.PI,true);
			ctx.lineTo(ballx,bally+.5*videoh);
			ctx.lineTo(ballx,bally);
			ctx.fill();
			ctx.moveTo(ballx,bally+.5*videoh);
			ctx.lineTo(ballx,bally+videoh);
			ctx.lineTo(ballx+videow,bally+videoh);
			ctx.lineTo(ballx+videow,bally+.5*videoh);
			ctx.lineTo(ballx+.5*videow+maskrad,bally+.5*videoh);
			ctx.arc(ballx+.5*videow,bally+.5*videoh,maskrad,0,
			Math.PI,false);
			ctx.lineTo(ballx,bally+.5*videoh);
			ctx.fill();
			ctx.strokeRect(0,0,cwidth,cheight); // box
		}
		function moveandcheck() {
			var nballx = ballx + ballvx; 
			var nbally = bally +ballvy; 
			if ((nballx+videow) > cwidth) { 
				ballvx =-ballvx; 
				nballx = cwidth-videow; 
			}
			if (nballx < 0) {
				nballx = 0;
				ballvx = -ballvx;
			}
			if ((nbally+videoh) > cheight) { 
				nbally = cheight-videoh; 
				ballvy =-ballvy; 
			}
			if (nbally < 0) {
				nbally = 0;
				ballvy = -ballvy;
			}
			ballx = nballx; 
			bally = nbally; 
		}
		function reverse() {
			ballvx = -ballvx;
			ballvy = -ballvy;
		}