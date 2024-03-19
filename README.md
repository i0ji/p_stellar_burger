<h1>First sprint</h1>
<h3>16.01-28.01</h3>
<b>b</b>:main <b>v:</b>0.0.1<br>
yarn/vite/react-ts/sass/git empty proj init;

20.01.24:
<b>b:</b>step-1/0.0.1:
alias/components added;<br>
21.01.24:
base markup/button effects;<br>
28.01.24:
All main functions are set:
API request, modals, tab scroll to ingredient groups;<br>
29.01.24:
Pull request accepted by reviewer;
Following the checklist and technical specifications of the first sprint:<br>

* The main layout and markup is done;
* Two modals are ready; One with static data and another with data got from API;
* API request separated in separate .ts file and have a failure check on loading;
* Multiple SCSS, logic and markup settings were refactored while adding new features;<br>

<h1>Second sprint</h1>
<h3>29.01-11.02</h3>
<b>b:</b>sprint2/step-1
<b>v:</b> 0.1.6.*<br>

Style and code edits:

* Removed some incorrect markup;
* Alignment of design elements;
* Header tag changed to semantically – correct "header";
* added custom hook to manage orderModal state and orderID request;
* Added "utils" and "services" folders for storing requests and context, respectively;
* Added checkResponse function to simplify the code;
* Changed ID binding from array position to native _id property of the mapped object;

04.02.24: **b**:sprint2/step-2/**v**:0.1.6: Reviewer accepted changes; started Redux/DND tasks;<br>
06.02.24: **b**:sprint2/step-2/**v**:0.1.6: Small CSS edits, preparing the proj to Redux, yarn and package.json
updated;<br>
07.02.24 **b**:sprint2/step-2/**v**: 0.1.6.4: DND lib added, some OrderDetails type issues fixed;<br>
08.02.24 **b**:sprint2/step-2/**v**: 0.1.6.4: Fetch function wrote and set via RTK; Base slice and store logic set;<br>
09.02.24 **b**:sprint2/step-2/**v**: 0.1.6.4: Rollback and refactoring; First global state(ingredientsList) set;<br>
10.02.24 **b**:sprint2/step-2/**v**: 0.1.6.5: Second state, totalAmount func, adding/removing elements logic set;<br>
11.02.24 **b**:sprint2/step-2/**v**: 0.1.6.6: Reorder logic, some markup changes to display content correctly; <b>MERGE
REQUEST sent</b>;<br>
12.02.24 **b**:sprint2/step-2/**v**: 0.1.6.6: Working on the list of improvements; bun counter; URL routs;<br>
13.02.24 **b**:sprint2/step-2/**v**: 0.1.6.7: UI changes; scroll implementation via IOA; order number logic; <b>MERGE
REQUEST sent</b>;<br>
14.02.24 **b**:sprint2/step-2/**v**: 0.1.6.7.1: Added checkResponse method to my orderNumber request;
_______ **b**:sprint2/step-2/**v**: 0.1.7.1: Fixing type issues; edits based on reviewers' comments; added preloader and
a error message common components wrapped by modalOverlay and set it logic;<br>
15.02.24: **b**:sprint2/step-2/**v**:0.1.7.2: general settings and code maintenance;
16.02.24: **b**:sprint2/step-2/**v**:0.1.7.2: initial top/bottom bun refactored;

<h1>Third sprint</h1>
<h3>16.02-06.03</h3>
<b>b:</b>sprint3/step-1 <b>v: </b> 0.1.7.*
<br>

Global project features:

* React-router added;
* Multiply small edits of style, small features, objects displaying; 
* Refactored Ingredients-modal separate window with its own routing;
* Added auth and user check states;
* Added certain slice for auth and actions with user data;
* Register/logout/login/refresh/reset and forgot password functions added;

19.02.24: **b**:sprint3/step-1/**v**:0.1.8.0: React-router added, routing logic started, minor style changes;<br>
20.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.1: refactor router folders, style edits;<br>
21.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.2: styling NavLinks and modal routing;<br>
22.02.24: **b**:sprint2/step-2/**v**:0.1.8.2: setting ingredients modal, style changes, styling NavLinks;<br>
23.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.3: refactoring modal and ingredients pages;<br>
24.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.3: attempts of animating enter and exit components;<br>
25.02.24: **b**:sprint2/step-2/**v**:0.1.8.1: reset/register/get tokens utils, loading page refactor;<br>
26.02.24: **b**:sprint2/step-2/**v**:0.1.8.2: get two tokens;auth logic;custom hook for forms, start ProtectedRoute;<br>
27.02.24: **b**:sprint2/step-2/**v**:0.1.8.3: feature: auth, protected, statement, login and logout logic, useForm;<br>
28.02.24: **b**:sprint2/step-2/**v**:0.1.8.4: feature: setAuthCheck rework; routing rework, types declaration, handleRegister; ProtectedRoute logic;<br>
01.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: Register checked;<br>
02.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: feature:added wight route from login to '/' after enter, feature:added password hide/show logic, in progress: auth/login/logout/reset logic<br>
03.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: Register checked;<br>
04.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: global: yarn updated, fix: logic and display of the component of Profile;<br>
fix: "save/cancel" buttons
style: appearance of icons on editing
chore: some minor edits in api.ts

<h1>Fourth sprint</h1>
<h3>07.03-14.03</h3>
<b>b:</b>sprint4/step-1 <b>v: </b> 0.1.9.*
<br>

Global project features:

* Mass typing of components, utils, functions;
* Remove order request from useModal hook;

07.03.24: **b**:sprint4/step-1/**v**:0.1.9.3: multiply typing nad fixing type issues; replace interfaces, types and vars to separate folder; some API logic refactor<br>
08.03.24: **b**:sprint4/step-1/**v**:0.1.9.3.1: profile page animation edition; typing<br>
11.03.24: **b**:sprint4/step-1/**v**:0.1.9.3.1: prevent order logic; refactor prevent order logic; typing DND; typing currentSlice;<br>
12.03.24: **b**:sprint4/step-1/**v**:0.1.9.3.2: api.ts and App.tsx type <br>
13.03.24: **b**:sprint4/step-1/**v**:0.1.9.3: README small edit; typing; replace order logic from hook to constructor component;<br>

<h1>Fifth sprint</h1>
<h3>17.03-31.03</h3>
<b>b:</b>sprint5/step-1 <b>v: </b> 0.1.9.*
<br>
