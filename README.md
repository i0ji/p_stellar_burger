<h1>First sprint</h1>
<h3>16.01-28.01</h3>
19.01.24
b:main/0.0.1
yarn/vite/react-ts/sass/git empty proj init

20.01.24
b:step-1/0.0.1
alias/components added

21.01.24
base markup/button effects/

28.01.24
All main functions are set:
API request, modals, tab scroll to ingredient groups

29.01.24
Pull request accepted by reviewer;
Following the checklist and technical specifications of the first sprint:
* Main layout and markup done;
* Two modlas are ready; One with static data and another with data got from API;
* API request separated in separate .ts file and have a failure check on loading;
* Multiple SCSS, logic and markup settings were refactored while adding new features;


<br>
<h1>Second sprint.</h1>
<h3>29.01-11.02</h3>
<b>b:</b> sprint2/step-1<br> 
<b>v:</b> 0.1.6

<h3>31.01-11.02</h3>
<b>b:</b> sprint2/step-1<br>
<b>v:</b> 0.1.6.1<br>
Starting Context task.

<h3>03.01</h3>
<b>b:</b> sprint2/step-1<br>
<b>v:</b> 0.1.6.3<br>

Multiple code edits:
* Style edits:
* * Removed some incorrect markup;
* * Alignment of design elements;
* * Header tag changed to semantically - correct "header"; 
* added custom hook to manage orderModal state and orderID request;
* Added "utils" and "services" folders for storing requests and context, respectively;
* Could not upgrade request function which depends on the method passed to it -> will be next step;
* Added checkResponse function to simplify the code;
* Changed id binding from array position to native _id property of the mapped object