<h1>Survey App</h1>
<a href="https://survey-app-taran29.netlify.app">Deployed website link</a>
<p>This is the front-end part of my Survey App project, written using ReactJS. It's my first major MERN stack application. It uses my existing User Auth App and builds a survey functionality on top of it. Know more about my user auth app here: <a href="https://github.com/Taran29/UserAuthApp">User Auth</a> </p>

<a href="https://github.com/Taran29/SurveyAppServer">Backend repository for this project</a>

<p>This app has the following features: 
  <ol>
    <li>Users can create an account, which is protected using a fully customisable security question and answer system. </li>
    <li>Users can access and fill public surveys created by anyone.</li>
    <li>Users can filter available surveys by various categories.</li>
    <li>Users can create their own surveys, choosing from the available categories, and even toggle between public and private surveys.
      <ul>
        <li>Public surveys can be filled by anyone across the world.</li>
        <li>Private surveys can only be filled by users who have the link.</li>
      </ul>
    </li>
    <li>Users can look at the responses to surveys they have filled.</li>
    <li>Users can look at the stats of the surveys they have created.</li>
    <li>Users can change their name and password.</li>
  </ol>
</p>
<br> <br>
        
<p>This app has the following main components: 
  <ol>
    <li> The Navbar
      <ul>
        <li>A Home button to redirect back to the Home page from anywhere.</li>
        <li>The links on the right change depending on if the user is logged in or not.</li>
        <li>The Navbar switches to a Hamburger menu below a screen width of 650px.</li>
      </ul>
    </li> <br>
    <li>The Home Screen
      <ul>
        <li>Shows a list of available public surveys that are not created or filled by the current user.</li>
        <li>Has a html select tag to help filter available surveys.</li>
        <li>Has page controls at the bottom, limiting each page to 10 surveys.</li>
        <li>Has a create survey button at the bottom right.</li>
      </ul>
    </li> <br> 
    <li>Login/Register/Forgot Password flow
      <ul>
        <li>Lets you register as a new user by asking your name, email, and a password, and then asking for a security question and answer.</li>
        <li>Lets you log in using your email and password.</li>
        <li>Lets you change your password if you have forgotten it, upon verification of the security question.</li>
      </ul>
    </li><br>
    <li>The Create Survey Screen
      <ul>
        <li>Takes in a title and lets you choose a category, and the visibility (public/private) of the survey you are creating.</li>
        <li>Has a flow to add questions, add options, and be able to edit or remove the questions and options anytime.</li>
        <li>Once a survey has been created, it shows you some basic information about it and gives you a share-able link to the survey.</li>
      </ul>
    </li><br>  
    <li>The Fill Survey Screen
      <ul>
        <li>Shows options in a radio group so you can select your answers.</li>
        <li>Has a submit and a reset button at the bottom.</li>
      </ul>
    </li> <br> 
    <li>The Profile Screen
      <ul>
        <li>Lets you see your created surveys and filled surveys.</li>
        <li>Lets you change your name and password, upon verification of your security question.</li>
      </ul>
    </li> <br> 
    <li>The Stats Screen
      <ul>
        <li>Once you navigate to the created surveys screen, you can see a paginated list of created surveys, and you can click on a stats button beside each of them.</li>
        <li>The stats screen shows you how many times your survey has been filled, and lays out the selected percentage of each option in the form of an animated piechart.</li>
      </ul>
    </li>  <br> 
    <li>The Filled Surveys Screen
      <ul>
        <li>Shows you a list of filled surveys.</li>
        <li>By clicking on the view button next to each survey, you can see what options you picked for that corresponding survey.</li>
      </ul>
    </li><br>
  </ol>
</p>
