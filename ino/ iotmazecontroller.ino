// This #include statement was automatically added by the Particle IDE.
#include "lib1.h"

// This #include statement was automatically added by the Particle IDE.
#include "InternetButton/InternetButton.h"
#include "math.h"

InternetButton b = InternetButton();

//prototypes of functions
int myTurn(String command);
void success(String command);
void fail(String command);
int fromDavid(String command);


void setup() {
    //starting interenet button
    b.begin(1);

    //registering functions
   //Spark.function("button",)

    //Time to play
   Particle.function("fromDavid", fromDavid);
   Particle.function("myTurn",myTurn);
    
}


int fromDavid(String command){
    //if(command){
    char inputStr[64];
    command.toCharArray(inputStr,64);
    int distance = atoi(inputStr);
    takeAction(distance);
    return distance;

} 

void takeAction(int distance){
    if (distance ==0){
        gameOver();
    }
    else if (distance > 0){
        success(distance);
    }
    else{
    fail();
    }
}

//int Game over
void gameOver()
{
    b.rainbow(5);
    delay(5000);
    b.allLedsOff();
}

int myTurn(String command){
    for (int i=0; i<5; i++) 
    {
        b.allLedsOn(15,15,15);//white
        delay(500);
        b.allLedsOff();
        delay(500);
    }
    
    b.allLedsOff();
    return 0;
}

void success(int distance){
    for(int i=0; i<distance; i++)
    {
        b.allLedsOn(0,255, 0); //green
        delay(500);
        b.allLedsOff();
        delay(500);
    }
    b.allLedsOff();
}

void fail(){
    for(int i=0; i<10; i++)
    {
    b.allLedsOn(15,0,0); //red
    delay(100);
    b.allLedsOff();
    delay(100);
    }
    b.allLedsOff();
}




void loop() {
    
    //gameOver();
    //fromDavid("");
    


    if (b.buttonOn(1)) {
        b.ledOn(12, 51, 51, 0); // Red
        // Publish the event "button1" for other services like IFTTT to use
        Particle.publish("move", "0", 60, PRIVATE);
        delay(5000);
        b.allLedsOff();
    }

    if (b.buttonOn(2)) {
        b.ledOn(3, 207, 83, 0); // Orange
        // Publish the event "button2" for other services like IFTTT to use
        Particle.publish("move","1", 60, PRIVATE);
        delay(5000);
        b.allLedsOff();
    }


    if (b.buttonOn(3)) {
        b.ledOn(6, 0, 0, 255); // Blue
        // Publish the event "move" for other services like IFTTT to use
        Particle.publish("move","2", 60, PRIVATE);
        delay(5000);
        b.allLedsOff();
    }

    if (b.buttonOn(4)) {
        b.ledOn(9, 255, 0, 255); // Magenta
        // Publish the event "button4" for other services like IFTTT to use
        Particle.publish("move","3", 60, PRIVATE);
        delay(5000);
        b.allLedsOff();
        
        
        
    
    }
}
