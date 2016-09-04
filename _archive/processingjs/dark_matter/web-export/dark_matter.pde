// number of stars
int N = 50;
diameter = 5;
canvas = 600;

// create stars
Star[] stars = new Star[N];


class Star {
  float r,theta;
  
  Ball() {
    r = random(size);
    theta = random(6.28);
  }
  
  void display() {
    ellipse(r*sin(theta), r*cos(theta), diameter, diameter);
  }

  void move() {
    if (

