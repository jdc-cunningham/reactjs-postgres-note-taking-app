##### 11/24/2019
It is 5PM... ate earlier, cooked... feel like crap, seems like a losing battle.
I want today to feel like I accomplished something(I did learn some of the JWT implementation)
I'm currently trying to fix this dumb state issue where the view note overrides/interferes with the new note's state eg. you type in the view note's textarea and it updates the new note textarea's field.
I just feel it my weak brain, work damn it.
Yeah and I get the whole "known state" thing but man it's hard to develop like that for me... like you always know the value of an input it's not just "free floating" out there because you load it in state.
I don't know...(eye glaze giving up belong in the dirt) the problem is simple just copy/paste my own code/not binding write methods and inputs(need distinct)

I think I will implement the password hashing here... which I feel on the fence about... eg. I can't use this locally anymore I mean it is possible to setup encryption within a local network somehow(like SSL) but it's easier FOR ME to do it on a remote server eg. vps.

I also want the JWT/refresh token going on. I just have to read about that regarding proper implementation eg. httpOnly cookie.

What is value, how do I feel like I achieved something/made progress.
I know go cure cancer or something, you're a privileged person, etc... I am that is true.

commit... silence until you get it done, bcrypt, jwt and refresh token then I can die in peace

I can see it though an end goal for me... I don't know how quickly I can get there. It's not full fire eg. half a mil with 4% interest on average... just living by my lonesome $20k a year and I produce content... videos. I think I found happiness when I was younger(building model airplanes and producing) this was back then like 2009 or that area even earlier... I actually made like $7 from my YouTube videos... I mean damn... we can rebuild him(me).

But yeah, if my life keeps progressing in a positive direction I will move out somewhere with land and continue with making content(videos) regarding hardware(robots/fixed wing drones/etc). Also hopefully figure out how to be an entrepreneur eg. actually make a business that makes money. Nothing big... but hopefully at least real.

Hahaha... push one key and a giant wall of red shows up... damn it

WHY IS IT UNDEFINED?!!! PORQUE?!!!

Oh damn I think this is that mount lifecycle order thing... "doesn't exist" like delegation/binding ahhhh, since it's rendered after you search for something/click on it/makes it.

Oh... I see I'm using both controlled and uncontrolled...

time to request the help of the internet... "I can't read, help me" seriously though I don't think I know what to search on Google... been looking through SO posts.

Yeap that was it... 1 hour later, didn't bind to this great, I solved my own question after trying to reproduce it in a sandbox but was simpler so I caught the issue.



##### 11/16/2019
I have two whole days... of course I don't want to spend that much time on this particular project.
I gotta get something that works... I bought more ram now will have 32GB yeah boiii
Also still need a chrome extension to group tabs per window/allow you to store by group for later inspection with a note
These extensions exist but I want my own/disclose the code that runs it fully so nothing sketch
Pointless paranoia I get it

One ugly but functional/simple state UI is a dropdown to change between view/new/delete.
The issue is the state management. In particular I'm aiming for a "onKeyUp" sort of deal for saving.
But the title itself... when is that editable? Should the title be in an input so it's editable all the time. That seems like it would look bad.

For the sake of getting it done, I could make a really dumb interface. Eg. two of them. One for viewing, one to create a new one.

I'm currently dealing with this issue of ref is undefined... I don't know why I've used it so many times but maybe it's how I'm using it.

The other issue is not having a save button. It would be more obvious in function how to use it. I've built this same thing already like 2-3 years ago called ProjectLayout and it works... the interface is different/built for mobile but still... going in circles. That one required auth though.

Yeah I'm just going to build this in a really dumb way for the sake of getting it done. I can combine the interface/clean it up later.

I am pretty bad at React currently, I mean like state management alone "right ways to do it" where lifecycles get triggered.
I'm bad because I don't get to use it in a day job at this time.

Damn it cors issue...

My 32GB of RAM arrived yes, they're in my hands sliding towards my groin
I'm trying to get myself to finish this super simple app to write down all my stuff/progress/active tabs.
Although... the Windows update happened anyway/restarted my comptuter and all of my stuff closed. Chrome tabs restarted though.
I don't know maybe it's good to just start with a blank slate. I have so much random "middle of thought" things going.
I'm just going to do it, I will finish the CRUD capability of this in a few minutes though.

I want to get this done so I can continue on my robotics project.

One thing I have to address also is the communication between the sidepanel and content panel. I will probably use props for this to bridge the two. Redux is something I have to learn at some point but last time I looked at it, it was this "big thing" that you gotta pick up. Which at the end of the day it's up to you, do it or don't.

I'm seeing some inheritance action going on here, I could make the same UI with one method and just assign it a different role. Of course my lizard brain is like "nah b, get it done fast"

I'm getting that coffee headache, third cup, fasting need more water

AHHH it's hard, what is the point of anything. I keep thinking about that, I partially think "if it makes money it has meaning" but I also blow money/money just gets spent. The other day I get a random tax bill and I pay that, and it's like "alright, couple hundred dollars just gone" then I complain about 10 dollars or so I lost somewhere. It's whack.

FIRE is the path... but I've got a ways to go.

I realize I'm going backwards... I was at a point of using functional components and hooks such as useState/useEffect. I've been doing other stuff all this time(eg. new job getting better with git, custom framework, unit testing/graybox testing with jasmine/mocha/selenium) and on my own learning new stuf eg. node/postgres and the robotics stuff/3D Printing and generally just trying to not become homeless although I do make decent money just keep burning it(got a flat tire recently dropped some hondos to fix that).



##### 11/12/2019
So it did completely slip my mind to make a way on the front end to insert notes.
Also other features like loading last opened.
Yeah this UI is kind of trash.

Making a dynamic render is kind of hard in terms of organization, the different states the UI can be in.
That feeling of pointlessness/running out of time creeps in the back of my mind.