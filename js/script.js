// Set the date we're counting down to
var countDownDate = new Date("August 20, 2021 15:37:25").getTime();

// Update the count down every 1 second
var countdownfunction = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
  
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(countdownfunction);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);



// Preloader
$ (window) .on ('load', function () {
    $ ('#preloader') .delay (1000) .fadeOut ('slow');
    $ ('body') .delay (200) .css ({'overflow' : 'visible'});
})


// Particles
// ----------------------------------------
        // Particle
        // ----------------------------------------

        function Particle( x, y, radius ) {
          this.init( x, y, radius );
      }

      Particle.prototype = {

          init: function( x, y, radius ) {

              this.alive = true;

              this.radius = radius || 10;
              this.wander = 0.15;
              this.theta = random( TWO_PI );
              this.drag = 0.92;
              this.color = '#fff';

              this.x = x || 0.0;
              this.y = y || 0.0;

              this.vx = 0.0;
              this.vy = 0.0;
          },

          move: function() {

              this.x += this.vx;
              this.y += this.vy;

              this.vx *= this.drag;
              this.vy *= this.drag;

              this.theta += random( -0.5, 0.5 ) * this.wander;
              this.vx += sin( this.theta ) * 0.1;
              this.vy += cos( this.theta ) * 0.1;

              this.radius *= 0.96;
              this.alive = this.radius > 0.5;
          },

          draw: function( ctx ) {

              ctx.beginPath();
              ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
              ctx.fillStyle = this.color;
              ctx.fill();
          }
      };

      // ----------------------------------------
      // Example
      // ----------------------------------------

      var MAX_PARTICLES = 280;
      var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

      var particles = [];
      var pool = [];

      var demo = Sketch.create({
          container: document.getElementById( 'container' ),
          retina: 'auto'
      });

      demo.setup = function() {

          // Set off some initial particles.
          var i, x, y;

          for ( i = 0; i < 20; i++ ) {
              x = ( demo.width * 0.5 ) + random( -100, 100 );
              y = ( demo.height * 0.5 ) + random( -100, 100 );
              demo.spawn( x, y );
          }
      };

      demo.spawn = function( x, y ) {
          
          var particle, theta, force;

          if ( particles.length >= MAX_PARTICLES )
              pool.push( particles.shift() );

          particle = pool.length ? pool.pop() : new Particle();
          particle.init( x, y, random( 5, 40 ) );

          particle.wander = random( 0.5, 2.0 );
          particle.color = random( COLOURS );
          particle.drag = random( 0.9, 0.99 );

          theta = random( TWO_PI );
          force = random( 2, 8 );

          particle.vx = sin( theta ) * force;
          particle.vy = cos( theta ) * force;

          particles.push( particle );
      };

      demo.update = function() {

          var i, particle;

          for ( i = particles.length - 1; i >= 0; i-- ) {

              particle = particles[i];

              if ( particle.alive ) particle.move();
              else pool.push( particles.splice( i, 1 )[0] );
          }
      };

      demo.draw = function() {

          demo.globalCompositeOperation  = 'lighter';

          for ( var i = particles.length - 1; i >= 0; i-- ) {
              particles[i].draw( demo );
          }
      };

      demo.mousemove = function() {

          var particle, theta, force, touch, max, i, j, n;

          for ( i = 0, n = demo.touches.length; i < n; i++ ) {

              touch = demo.touches[i], max = random( 1, 4 );
              for ( j = 0; j < max; j++ ) {
                demo.spawn( touch.x, touch.y );
              }

          }
      };


 